#include "esp_camera.h"
#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h> // peer library for ESPAsyncWebServer
#include <ESPAsyncWebServer.h> // library for websocket

//Camera related constants
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

// LED PIN
#define LED_PIN 4

const char* ssid     = "REMOTE CAM";
const char* password = "remotecam12345678";

// initialize a server on port 80
AsyncWebServer server(80);
// initialize websocket server at "/camera"
// to access websocket connection, the client need to access
// ws://<IP>/camera
AsyncWebSocket ws("/camera");

// client ID
// the purpose is to keep track of user connection
uint32_t clientID = 0;

void onCameraWebSocketEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len) {
    switch (type) {
        // case when user joined/connected to the websocket connection
        case WS_EVT_CONNECT:
            clientID = client->id(); // set the client ID
            break;

        // case when user disconnected from the websocket connection
        case WS_EVT_DISCONNECT:
            clientID = 0; // reset client ID
            break;
    }
}

void setupCamera() {
  // setting up camera pin according to the manufactures
  camera_config_t config;
  
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000; // 20K KHz
  config.pixel_format = PIXFORMAT_JPEG;
  
  config.frame_size = FRAMESIZE_VGA; // 640 x 480
  config.jpeg_quality = 7; // picture quality
  config.fb_count = 1;
  
  // Initialize the camera
  esp_err_t err = esp_camera_init(&config);
  
  // if camera failed to init
  if (err != ESP_OK) return;

  // Initialize PSRAM if found
  // If Pseudo Static Random Access Memory is found in the current board,
  // allocate to PSRAM when the memory allocations is greater than 20KB
  // -- PSRAM will increase performance --  
  if (psramFound()) {
    heap_caps_malloc_extmem_enable(20000); // Allocate memory to PSRAM above this size
  }
}


void sendCameraPicture() {
  // if client is disconnected (leave connection), dont proceed further
  if (clientID == 0) return;

  //capture a frame buffer (fb) from camera
  camera_fb_t * fb = esp_camera_fb_get();
  
  // if no frame buffer -> return
  if (!fb) return;

  // send the binary of frame buffer back to the client
  // parameter: (clientID, pointer to the buffer, length of the buffer)
  ws.binary(clientID, fb->buf, fb->len);

  // release memory after fb sent to the client
  esp_camera_fb_return(fb);
    
  // Wait for message to be delivered.
  // this is important to not deliver the data too quickly,
  // so we need to wait until client queue is not full
  while (true) {
    AsyncWebSocketClient * clientPointer = ws.client(clientID);
    
    if (!clientPointer || !(clientPointer->queueIsFull())){
      break;
    }
    
    delay(1);
  }
}

void toggleFlashlight(bool state) {
  if(state){
    digitalWrite(LED_PIN, HIGH); 
  } else {
    digitalWrite(LED_PIN, LOW); 
  }  
}

void handleTriggerLED(AsyncWebServerRequest *request) {
  String state = request->arg("state");

  if (state == "on") {
    toggleFlashlight(true);  
  } else if (state == "off") {
    toggleFlashlight(false);  
  }

  request->send(200);
}

void setup() {
  Serial.begin(115200);
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
    
  // WiFi.softAP(ssid, password);
  // IPAddress IP = WiFi.softAPIP();

  server.on("/led", handleTriggerLED);
      
  ws.onEvent(onCameraWebSocketEvent);

  // setup the websocket connection at /camera
  // see config above^
  server.addHandler(&ws);

  server.begin();
  Serial.println("HTTP server started");

  // setup camera
  setupCamera();

  // setup led built in
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  // clean up disconnected client
  ws.cleanupClients(); 
  
  sendCameraPicture(); 
}
