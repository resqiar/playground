package main

import (
	"log"
	"math"
)

func Binary_search(haystack []int, needle int) bool {
	start_point := 0
	end_point := len(haystack)

	for start_point < end_point {
		mid_point := int(math.Floor(float64(start_point+end_point) / 2))

		log.Println(mid_point)

		if mid_point == needle {
			return true
		}

		if mid_point < needle {
			start_point = mid_point + 1
		}

		if mid_point > needle {
			end_point = mid_point - 1
		}
	}

	return false
}
