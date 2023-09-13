package dsa

import "log"

type Node struct {
	value int
	next  *Node
	prev  *Node
}

type DLL struct {
	head   *Node
	tail   *Node
	length int
}

func New(head *Node) *DLL {
	var l int
	if head != nil {
		l += 1
	}

	return &DLL{
		head:   head,
		tail:   head,
		length: l,
	}
}

func (this *DLL) push(value int) {
	if this.head == nil {
		// create a new node
		newNode := &Node{
			value: value,
		}

		this.head = newNode
		this.tail = newNode
		this.length += 1
		return
	}

	newNode := &Node{value: value, prev: this.tail}
	this.tail.next = newNode
	this.tail = newNode // override tail
	this.length += 1
}

func (this *DLL) pop() int {
	if this.length == 0 {
		return -1
	}
	if this.length == 1 {
		value := this.head.value
		this.head = nil
		this.tail = nil
		this.length -= 1
		return value
	}

	current := this.tail
	current.prev.next = nil
	this.tail = current.prev // override tail
	this.length -= 1
	return current.value
}

func (this *DLL) dump() {
	current := this.head
	for current != nil {
		log.Println(current.value)
		current = current.next
	}
}

func Setup() {
	dll := New(nil)
	log.Println(dll)

	dll.push(1)
	dll.push(2)
	dll.push(3)

	dll.dump()

	log.Println(dll.pop())
	log.Println(dll.pop())
	log.Println(dll.pop())
	log.Println(dll.pop())
}
