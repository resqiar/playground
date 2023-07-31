package rw

import (
	"io/ioutil"
	"log"
	"net"
	"sync"
	"testing"
	"time"
)

func connect() interface{} {
	time.Sleep(1 * time.Second)
	return struct{}{}
}

func warmPool() *sync.Pool {
	p := &sync.Pool{
		New: connect,
	}

	for i := 0; i < 10; i++ {
		p.Put(p.New())
	}

	return p
}

func startNetworkDaemon() *sync.WaitGroup {
	var wg sync.WaitGroup
	wg.Add(1)

	go func() {
		connPool := warmPool()

		server, err := net.Listen("tcp", "localhost:8080")
		if err != nil {
			log.Fatal(err)
		}
		defer server.Close()

		wg.Done()

		for {
			conn, err := server.Accept()
			if err != nil {
				log.Println(err)
				continue
			}

			resource := connPool.Get()
			log.Println(conn)
			connPool.Put(resource)

			conn.Close()
		}
	}()

	return &wg
}

func init() {
	daemonStarted := startNetworkDaemon()
	daemonStarted.Wait()
}

func BenchmarkNetworkRequest(b *testing.B) {
	for i := 0; i < b.N; i++ {
		conn, err := net.Dial("tcp", "localhost:8080")
		if err != nil {
			log.Fatal(err)
		}
		if _, err := ioutil.ReadAll(conn); err != nil {
			b.Fatalf("cannot read: %v", err)
		}
		conn.Close()
	}
}
