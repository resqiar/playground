package channels

import (
	"log"
)

func TestChannel() {
	// bi-directional channel (READ & WRITE)
	var dataStream chan int // basically empty interface is any
	dataStream = make(chan int)

	// uni-directional channel (READ ONLY)
	// var dataStream <-chan interface{} // basically empty interface is any
	// dataStream = make(<-chan interface{})

	// uni-directional channel (WRITE ONLY)
	// var dataStream chan<- interface{} // basically empty interface is any
	// woStream := make(chan<- int)

	go func() {
		defer close(dataStream)

		for i := 0; i < 1024; i++ {
			dataStream <- i * 2
		}
	}()

	for result := range dataStream {
		log.Println(result)
	}
}
