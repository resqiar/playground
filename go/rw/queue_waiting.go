package rw

import (
	"fmt"
	"log"
	"sync"
	"time"
)

type LimitedQueue struct {
	data    []int
	maxSize int
	cond    *sync.Cond
}

func NewLimitedQueue(size int) *LimitedQueue {
	return &LimitedQueue{
		data:    make([]int, 0),
		maxSize: size,
		cond:    sync.NewCond(&sync.Mutex{}),
	}
}

func (q *LimitedQueue) Enqueue(value int) {
	time.Sleep(100 * time.Millisecond)

	q.cond.L.Lock()
	defer q.cond.L.Unlock()

	// wait if overflow
	if len(q.data) == q.maxSize {

		// IMPORTANT: WAIT HAS A SIDE EFFECT WHICH UPON CALLING,
		// IT CALLS UNLOCK FOR RESPECTIVE LOCKER. AND UPON EXITING,
		// IT CALLS LOCK.
		q.cond.Wait()
	}

	log.Println("adding", value)
	q.data = append(q.data, value)
}

func (q *LimitedQueue) Dequeue() {
	time.Sleep(500 * time.Millisecond)

	q.cond.L.Lock()
	defer q.cond.L.Unlock()

	if len(q.data) == 0 {
		return
	}

	// IMPORTANT: SIGNAL MUST COME AFTER UNLOCK!!!
	// OTHERWISE, SEE FOR YOURSELF
	defer q.cond.Signal()

	log.Println("removing", q.data[0])
	q.data = q.data[1:]

}

func (q *LimitedQueue) Length() int {
	q.cond.L.Lock()
	defer q.cond.L.Unlock()

	return len(q.data)
}

func QueueWaiting() {
	var wg sync.WaitGroup

	var q = NewLimitedQueue(2)

	for i := 0; i < 10; i++ {
		wg.Add(1)

		go func(value int) {
			defer wg.Done()

			q.Enqueue(value)
		}(i)
	}

	// keep dequeuing until time passes the threshold
	for t := time.Now(); time.Since(t) < 1*time.Second; {
		go func() {
			q.Dequeue()
		}()
	}

	wg.Wait()
	fmt.Println(q.data)
}
