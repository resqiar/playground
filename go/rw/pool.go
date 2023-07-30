package rw

import (
	"log"
	"sync"
)

func Pool() {
	var created int
	resPool := &sync.Pool{
		New: func() interface{} {
			created += 1
			mem := make([]byte, 1024) // allocates 1kb
			return &mem
		},
	}

	const workers = 1024 * 1024 * 10 // 10 millions...
	var wg sync.WaitGroup

	wg.Add(workers)
	var mem *[]byte
	for i := workers; i > 0; i-- {
		go func(val int) {
			defer wg.Done()

			mem = resPool.Get().(*[]byte)

			// comment this code below to see how 10 mil resources alloc impacting GC so bad!
			defer resPool.Put(mem)
		}(i)
	}

	wg.Wait()

	log.Println(mem)
	log.Println(workers, "Workers were created")
	log.Println(created, "KB resources were created")
}
