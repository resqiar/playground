package main

import (
	"bytes"
	"fmt"
	"log"
	"math"
	"playground/rw"
	"runtime"
	"sync"
	"sync/atomic"
	"time"
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
	// sort.BubbleSort()
	rw.QueueWaiting()

	// rw.RWMDemo()

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

	// var data int
	// var mem sync.Mutex

	// DATA RACE CONDITIONS
	// We're not sure who will run first

	// time.Sleep(1 * time.Second)

	// infinite god damn loop
	// well maybe only 100?
	// whatever, it is pointless anyway
	// for i := 0; i < 100; i++ {
	// 	go func() {
	// 		// attempt to access shared resource
	// 		mem.Lock()
	// 		data++ // critical section
	// 		mem.Unlock()
	// 	}()
	// }
	//
	// mem.Lock()
	// if data == 0 { //  critical section
	// 	log.Println("Data = ", data) // critical section
	// } else {
	// 	log.Println("Data = ", data) // critical section
	// }
	// mem.Unlock()

	// demonstrateDeadlock()
	// demonstrateLivelock()
	// demonstrateStarvation()

	// var wg sync.WaitGroup
	//
	// message := "[MAIN] Hello "
	// wg.Add(1)
	// go func() {
	// 	defer wg.Done()
	// 	message += "[GOROUTINE] World"
	// }()
	// wg.Wait()
	//
	// log.Println(message)
	//
	// for _, message := range []string{"hello", "world", "whatever"} {
	// 	wg.Add(1)
	//
	// 	go func(msg string) { // remove the param and modify directly the message and it will break
	// 		defer wg.Done()
	// 		log.Println("[GOROUTINE]", msg)
	// 	}(message)
	// }
	// wg.Wait()

	// benchmarck goroutines
	// benchmarkGoroutine()

	// RW Mutex
}

func benchmarkGoroutine() {
	memStat := func() uint64 {
		runtime.GC()
		var s runtime.MemStats
		runtime.ReadMemStats(&s)
		return s.Sys
	}

	var channel <-chan interface{}
	var wg sync.WaitGroup

	doNothing := func() {
		wg.Done()
		<-channel
	}

	const TOTAL_GOROUTINE = 1e6

	wg.Add(TOTAL_GOROUTINE)
	memBefore := memStat()

	for i := TOTAL_GOROUTINE; i > 0; i-- {
		go doNothing()
	}

	wg.Wait()
	memAfter := memStat()

	log.Println(math.Floor(float64(memAfter-memBefore)/TOTAL_GOROUTINE/1000), "kb")
}

func demonstrateDeadlock() {
	type SharedValue struct {
		mu  sync.Mutex
		val int
	}

	var wg sync.WaitGroup
	printSum := func(a, b *SharedValue) {
		// defer the waitgroup to done (dont wait anymore)
		// when the function is done
		defer wg.Done()

		a.mu.Lock()
		defer a.mu.Unlock() // unlock when function return

		time.Sleep(2 * time.Second)

		b.mu.Lock()
		defer b.mu.Unlock() // unlock when function return

		log.Println(a.val + b.val)
	}

	var a, b SharedValue

	wg.Add(2)
	go printSum(&a, &b)
	go printSum(&b, &a) // circular dependecies
	wg.Wait()           // deadlock occures here
}

func demonstrateLivelock() {
	cadence := sync.NewCond(&sync.Mutex{})

	go func() {
		for range time.Tick(1 * time.Second) {
			// makes other process waits for this operation?
			cadence.Broadcast()
		}
	}()

	takeStep := func() {
		cadence.L.Lock()
		cadence.Wait()
		cadence.L.Unlock()
	}

	tryDirection := func(direction string, dir *int32, out *bytes.Buffer) bool {
		log.Println(direction)

		atomic.AddInt32(dir, 1) // move to right side?
		takeStep()              // simulate a same rate of movement between all parties

		if atomic.LoadInt32(dir) == 1 {
			log.Println(out, ". Success passing")
		}
		takeStep()
		atomic.AddInt32(dir, -1) // move to left side?

		return false
	}

	var left, right int32

	moveLeft := func(out *bytes.Buffer) bool { return tryDirection("left", &left, out) }
	moveRight := func(out *bytes.Buffer) bool { return tryDirection("right", &right, out) }

	walk := func(walking *sync.WaitGroup, name string) {

		var out bytes.Buffer

		defer func() { fmt.Println(out.String()) }()

		defer walking.Done()

		fmt.Fprintf(&out, "%v is trying to scoot:", name)

		for i := 0; i < 5; i++ {
			if moveLeft(&out) || moveRight(&out) {
				return
			}
		}
		fmt.Fprintf(&out, "\n%v tosses her hands up in exasperation!", name)
	}

	var peopleInHallway sync.WaitGroup

	peopleInHallway.Add(2)
	go walk(&peopleInHallway, "Alice")
	go walk(&peopleInHallway, "Barbara")
	peopleInHallway.Wait()
}

func demonstrateStarvation() {
	var wg sync.WaitGroup
	var memLock sync.Mutex
	var maxRun = 1 * time.Second

	greedyWorker := func() {
		defer wg.Done()

		var job int

		for begin := time.Now(); time.Since(begin) <= maxRun; {
			memLock.Lock()
			time.Sleep(3 * time.Nanosecond)
			memLock.Unlock()

			job++
		}

		log.Println("GREEDY WORKER : ", job)
	}

	politeWorker := func() {
		defer wg.Done()

		var job int

		for begin := time.Now(); time.Since(begin) <= maxRun; {
			memLock.Lock()
			time.Sleep(1 * time.Nanosecond)
			memLock.Unlock()

			memLock.Lock()
			time.Sleep(1 * time.Nanosecond)
			memLock.Unlock()

			memLock.Lock()
			time.Sleep(1 * time.Nanosecond)
			memLock.Unlock()

			job++
		}

		log.Println("POLITE WORKER : ", job)
	}

	wg.Add(2)
	go greedyWorker()
	go politeWorker()
	wg.Wait()
}
