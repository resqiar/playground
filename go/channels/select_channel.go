package channels

import (
	"log"
	"time"
)

func SelectChan() {
	sTime := time.Now()
	chan1 := make(chan string, 0)
	chan2 := make(chan string, 0)

	go func() {
		defer close(chan1)
		time.Sleep(8 * time.Second)
		chan1 <- "FROM CHAN1"
	}()

	go func() {
		defer close(chan2)
		time.Sleep(2 * time.Second)
		chan2 <- "FROM CHAN2"
	}()

	select {
	case <-chan1:
		eTime := time.Now()
		log.Println("CHAN1", eTime.Sub(sTime))
		log.Println("Someone send a thing to chan1")
	case <-chan2:
		eTime := time.Now()
		log.Println("CHAN2", eTime.Sub(sTime))
		log.Println("Someone send a thing to chan2")
	case <-time.After(1 * time.Second):
		log.Println("SELECT TIMED OUT; MORE THAN 1 Sec")
	}
}
