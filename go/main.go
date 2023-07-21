package main

import (
	"log"
	"math"
)

func randomize(index int) int {
	multiplied := index * 2
	divided := float64(multiplied / 2)
	power := float64(multiplied) / float64(divided)
	powered := math.Pow(divided, math.Floor(power))
	finalized := powered * float64(multiplied)

	normalized := int(math.Abs(finalized))

	log.Println("RANDOMIZE:", index, normalized)
	return normalized
}

func main() {
	// for i := 0; i < 1_000_000; i++ {
	// 	go randomize(i)
	// }

	// log.Println("What are you talking about?")

	// channel := make(chan int)
	// defer close(channel)

	// go func() {
	// 	time.Sleep(2 * time.Second)
	// 	channel <- randomize(100)
	// 	log.Println("GOROUTINE: Done!")
	// }()

	// channelData := <-channel
	// log.Println(channelData)

	// // wait
	// time.Sleep(1 * time.Second)

	var data int

	// DATA RACE CONDITIONS
	// We're not sure who will run first
	go func() {
		data++
	}()

	if data == 0 {
		log.Println("Data = ", data)
	}
}
