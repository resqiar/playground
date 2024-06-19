package file

import (
	"fmt"
	"io"
	"log"
	"os"
	"time"
)

const (
	OLD_PATH = "old-file.txt"
	NEW_PATH = "new-file.txt"
)

func SimulateBadUpdate() {
	populateDefaultData(OLD_PATH, NEW_PATH)

	// step 1: open the file
	file, err := os.OpenFile(OLD_PATH, os.O_CREATE|os.O_RDWR|os.O_APPEND, 0644)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	// step 2: write the whole update directly to the old file
	for i := range 10 {
		log.Println("Updating...", i+1)

		_, err := file.WriteString(fmt.Sprintf("Updating... (%d) \n", i+1))
		if err != nil {
			log.Fatal(err)
		}

		if i == 7 {
			// simulate longer delay
			time.Sleep(2 * time.Second)

			// step 3: crash the system
			log.Fatal("Error: error writing to a file, unknown problem caused a crash")
		} else {
			time.Sleep(500 * time.Millisecond)
		}
	}
}

func SimulateBetterUpdate() {
	populateDefaultData(OLD_PATH, NEW_PATH)

	// open the old file
	oldFile, err := os.Open(OLD_PATH)
	if err != nil {
		log.Fatal(err)
	}
	defer oldFile.Close()

	// create & open new file
	newFile, err := os.OpenFile(NEW_PATH, os.O_CREATE|os.O_RDWR|os.O_APPEND, 0644)
	if err != nil {
		log.Fatal(err)
	}
	defer newFile.Close()

	// step 1: append old content to a new file
	oldContent, err := io.ReadAll(oldFile)
	if err != nil {
		log.Fatal(err)
	}
	if _, err := newFile.Write(oldContent); err != nil {
		log.Fatal(err)
	}

	// step 2: write the whole new update to a new dataset file
	for i := range 10 {
		log.Println("Updating...", i+1)

		_, err := newFile.Write([]byte(fmt.Sprintf("Updating... (%d) \n", i+1)))
		if err != nil {
			log.Fatal(err)
		}

		if i == 7 {
			// simulate longer delay
			time.Sleep(2 * time.Second)

			// then crash the system
			log.Fatal("Error: error writing to a file, unknown problem caused a crash")
		} else {
			time.Sleep(500 * time.Millisecond)
		}
	}

	// step 3: flush / sync the file
	if err := newFile.Sync(); err != nil {
		log.Fatal(err)
	}

	// step 4: if there is no error, overwrite the old file with renaming new to old file
	if err := os.Rename(NEW_PATH, OLD_PATH); err != nil {
		log.Fatal(err)
	}
}

func populateDefaultData(path string, newPath string) {
	// remove old file
	if _, err := os.Stat(path); err == nil {
		err := os.Remove(path)
		if err != nil {
			log.Println(err)
		}
	}

	// remove old file
	if _, err := os.Stat(newPath); err == nil {
		err := os.Remove(newPath)
		if err != nil {
			log.Println(err)
		}
	}

	file, err := os.Create(path)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	defaultData := []byte("This is the old part before updating 1 to 10. \n\n")
	_, err = file.Write(defaultData)
	if err != nil {
		log.Fatal(err)
	}
}
