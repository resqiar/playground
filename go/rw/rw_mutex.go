package rw

import (
	"log"
	"sync"
)

func RWMDemo() {
	var wg sync.WaitGroup
	var memLock sync.RWMutex

	var result int
	const ITER = 10

	for i := 0; i < ITER; i++ {
		wg.Add(1)
		go func() {
			memLock.Lock()
			defer memLock.Unlock()
			defer wg.Done()

			log.Println("Incrementing:", result, "with 2")
			result += 2
		}()
	}

	for i := 0; i < ITER; i++ {
		wg.Add(1)
		go func() {
			memLock.RLock()
			defer memLock.RUnlock()
			defer wg.Done()

			log.Println("[READ A]", result)
		}()
	}

	for i := 0; i < ITER; i++ {
		wg.Add(1)
		go func() {
			memLock.RLock()
			defer memLock.RUnlock()
			defer wg.Done()

			log.Println("[READ B]", result)
		}()
	}

	wg.Wait()
}
