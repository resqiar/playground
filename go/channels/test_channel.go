package channels

import (
	"log"
	"sync"
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

	// a technique called ranging,
	// range in for loop can accept channel.
	// automatically break when channel is closed.
	for result := range dataStream {
		log.Println(result)
	}

	beginStream := make(chan int)
	var wg sync.WaitGroup
	for i := 0; i < 10; i++ {
		wg.Add(1)

		go func(i int) {
			defer wg.Done()
			val := <-beginStream
			log.Println(i, val)
		}(i)
	}

	log.Println("BEFORE CLOSING CHANNEL")

	// when you close the stream, a channel can read
	// the channel indefinitely without no-one sending anything.
	close(beginStream)
	wg.Wait()

	// buffered channel.
	// when channel created with specified capacity,
	// it is called a buffered channel. The channel then can perform-
	// N (capacity) times of write even though no one is pulling/reading the data.
	bufferedStream := make(chan int, 5)

	for i := 0; i < 6; i++ {
		wg.Add(1)

		go func(i int) {
			defer wg.Done()
			bufferedStream <- i
		}(i)
	}

	log.Println("PULL & READ ONCE:", <-bufferedStream)
	wg.Wait()

	const STREAM_CON int = 5
	intStream := make(chan int, STREAM_CON-1)
	go func() {
		defer close(intStream)
		defer log.Println("Producer Done")

		for i := 0; i < STREAM_CON; i++ {
			log.Println("Sending:", i)
			intStream <- i
		}
	}()

	for result := range intStream {
		log.Println("Received:", result)
	}

	chanOwner := func() <-chan int {
		intStream := make(chan int, 5)

		go func() {
			wg.Add(1)
			defer wg.Done()
			defer close(intStream)

			for i := 0; i < 5; i++ {
				intStream <- i
			}
		}()

		return intStream
	}

	resStream := chanOwner()
	for i := 0; i < 5; i++ {
		log.Println(<-resStream)
	}

	wg.Wait()
}
