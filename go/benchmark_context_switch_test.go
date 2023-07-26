package main

import (
	"sync"
	"testing"
)

// run test using: go test -bench=. -cpu=1 go/benchmark_context_switch_test.go
func BenchmarkContextSwitch(b *testing.B) {
	var wg sync.WaitGroup

	begin := make(chan struct{})
	c := make(chan struct{})

	var token struct{}
	tx := func() {
		defer wg.Done()

		// wait until told to begin
		<-begin

		for i := 0; i < b.N; i++ {
			// send a token (empty struct) to rx
			c <- token
		}
	}

	rx := func() {
		defer wg.Done()

		// wait until told to begin
		<-begin

		for i := 0; i < b.N; i++ {
			// receive empty struct but do nothing else
			<-c
		}
	}

	wg.Add(2)
	go tx()
	go rx()
	b.StartTimer() // begin perf timer
	close(begin)   // tell two goroutines to begin
	wg.Wait()
}
