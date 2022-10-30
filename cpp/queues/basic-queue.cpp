#include <cstdlib>
#include <iostream>
#include <thread>
#include <unistd.h>
using namespace std;

struct Node {
  int value;
  struct Node *next;
  struct Node *prev;
  int priority = 1;
};

class Queue {
  struct Node *head;
  struct Node *tail;
  int length = 0;

public:
  void enqueue(int value) {
    // Create a new node based on input value
    Node *newNode = new Node();
    newNode->value = value;

    // If the current LinkedList head is null (List is null)
    if (head == nullptr) {
      // Set head and tail to the new created node
      head = newNode;
      tail = newNode;
      // Increment length of the list
      length++;
    }

    // If the current head is not null (List has a value)
    else {
      // Create a temporary variable to hold current tail
      Node *temp = tail;
      // set current tail next el to the new node
      tail->next = newNode;
      // set tail to new node
      tail = newNode;
      // set updated tail prev el to previous tail
      tail->prev = temp;
      // Increment length
      length++;
    };
  }

  int dequeue() {
    // If the list is null
    if (head == nullptr)
      return -1;

    Node *temp = head;

    if (length == 1) {
      head = NULL;
      tail = NULL;
      length--;
      return temp->value;
    }

    temp->next->prev = NULL;
    head = temp->next;
    length--;
    return temp->value;
  }

  bool isEmpty() { return length == 0; }

  void traverse() {
    // If the list is null
    if (head == nullptr)
      return;

    // set temp variable to the current head,
    // this head will be updated to the next node inside the loop.
    Node *temp = head;

    cout << "========== TRAVERSE ==========" << endl;

    // While there is still temp (not null)
    while (temp) {
      cout << temp->value << endl;

      // Update the temp to the next pointer value
      temp = temp->next;
    }

    cout << "======================" << endl;
  }

  int lng() { return length; }
};

int MAX_Q = 100;

void eq(Queue *q) {
  while (MAX_Q > 0) {
    int rng = 1 + rand() % 100;
    q->enqueue(rng);
    cout << " (+) " << rng << endl;
    MAX_Q--;
    this_thread::sleep_for(0.5s);
  }
}

void dq(Queue *q) {
  // this dequeuing will run forever
  while (true) {
    if (q->isEmpty()) {
      continue;
    }

    cout << " (-) " << q->dequeue() << endl;
    this_thread::sleep_for(1.5s);
  }
}

int main() {
  Queue q = Queue();

  thread enqueuing(eq, &q);
  thread dequeuing(dq, &q);

  enqueuing.join();
  dequeuing.join();

  q.traverse();

  return 0;
};
