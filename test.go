package main

import (
	"fmt"
	"log"
	"time"
)

func main() {
	target := 1_000_000

	arrExample := populateArr(target)
	mapExample := populateMap(target)

	targetTxt := fmt.Sprintf("items-%d", target)

	mapTime := time.Now()
	hval := getMap(mapExample, targetTxt)
	if hval != target {
		log.Fatal("NOT EQUAL")
	}
	mapElapsed := time.Since(mapTime)

	fmt.Printf("MAP: %s \n", mapElapsed)

	arrTime := time.Now()
	arrval := getArr(arrExample, target)
	if arrval != target {
		log.Fatal("NOT EQUAL")
	}
	arrElapsed := time.Since(arrTime)

	fmt.Printf("ARRAY: %s \n", arrElapsed)
}

func populateArr(count int) []int {
	arr := make([]int, count)

	for i := 0; i < count; i++ {
		arr[i] = i + 1
	}

	return arr
}

func populateMap(count int) map[string]int {
	hmap := make(map[string]int)
	for i := 0; i < count; i++ {
		hmap[fmt.Sprintf("items-%d", i+1)] = i + 1
	}

	return hmap
}

func getMap(hmap map[string]int, key string) int {
	return hmap[key]
}

func getArr(arr []int, target int) int {
	for i := 0; i < len(arr); i++ {
		current := arr[i]

		if current == target {
			return current
		}
	}

	return -1
}
