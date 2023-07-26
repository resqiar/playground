package sort

import "log"

func BubbleSort() {
	var data [10]int = [10]int{10, 20, 1, 3, 5, 8, 6, 0, 2, 4}

	for i := 0; i < len(data); i++ {
		for j := 0; j < len(data)-1-i; j++ {
			if data[j] > data[j+1] {
				var tmp = data[j]
				data[j] = data[j+1]
				data[j+1] = tmp
			}
		}
	}

	log.Println(data)
}
