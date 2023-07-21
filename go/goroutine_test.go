package main

import (
	"log"
	"testing"
)

func hello() {
	log.Println("Hello World!")
}

func TestHelloConcurrency(t *testing.T) {
	go helloConcurrency()
	log.Println("What is Hello World?")
}
