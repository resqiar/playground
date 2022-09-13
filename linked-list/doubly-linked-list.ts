class DLLNode {
  constructor(
    public value: any,
    public next: DLLNode | null,
    public prev: DLLNode | null
  ) {}
}

class DoublyLinkedList {
  head: DLLNode | null;
  tail: DLLNode | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value: any) {
    const newNode = new DLLNode(value, null, null);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length += 1;
      return this;
    }

    // Save the tail to be the previous value
    // of the new node.
    const prev = this.tail;

    // update the current tail's next
    // to the new created node.
    this.tail!.next = newNode;

    // Update the new node previous to the
    // previous tail.
    newNode.prev = prev;

    // Update the current tail to be the new node
    this.tail = newNode;

    // Increment the length of the value to be one
    this.length += 1;

    return this;
  }

  pop() {
    // If there is no tail, meaning there is nothing in the list,
    // immediately return false
    if (!this.tail) return false;

    // Save the previous value of the list's tail
    const prev = this.tail.prev;

    // Update the previous next pointer to null
    prev!.next = null;

    // Update the tail to the previous Node
    this.tail = prev;

    // Decrement the length by 1
    this.length -= 1;

    return true;
  }

  shift() {
    // If there is no head, meaning there is nothing in the list,
    // immediately return false
    if (!this.head) return false;

    // Save the next Node of the list's head
    const next = this.head.next;

    // Update the head with the next Node
    this.head = next;
    // Update previous Node on the head to null
    this.head!.prev = null;

    // Decrement the length by 1
    this.length -= 1;
  }

  unshift(value: any) {
    // If there is no head (list is empty)
    // just use push method
    if (!this.head) return this.push(value);

    // Create a new Node pointing to the current head
    const newNode = new DLLNode(value, this.head, null);

    // Set current head previous Node to the new one
    this.head.prev = newNode;

    // Update current head as new Node
    this.head = newNode;

    // Increment by 1
    this.length += 1;

    return this;
  }

  get(index: number) {
    // If the index is negative or more than list indexes,
    // return null
    if (index < 0 || index >= this.length) return null;
    // If index is at the beginning, immediately return head
    if (index === 0) return this.head;
    // If index is at the last, immediately return tail
    if (index === this.length - 1) return this.tail;

    // Track the current node
    let current: DLLNode | null | undefined = this.head;
    // Make a counter (not necessary if you use for loop)
    let count = 0;

    // Loop through all value in list
    while (count !== index) {
      // Make a temporary storage for the next value
      const temp = current?.next;

      // If next is still available, meaning we are not
      // touching the last Node
      if (temp) {
        current = current?.next;
        count++;
      }
    }

    // Return current value
    return current;
  }

  set(index: number, value: any) {
    // Get index value from get method
    const current = this.get(index);

    // If there is no current, return false
    if (!current) return false;

    // update value and return true
    current.value = value;
    return true;
  }

  insert(index: number, value: any) {
    // If the index is negative or the length is more than length - 1
    if (index < 0 || index > this.length - 1) return false;
    // If the index is at the beginning, use unshift
    if (index === 0) return this.unshift(value);
    // If the index is at the last, use push
    if (index === this.length - 1) return this.push(value);

    // get current index node
    const current = this.get(index);

    if (!current) return false;

    // save prev node from the current node
    const prev = current.prev;

    // create a new node than pointing to current and prev
    const newNode = new DLLNode(value, current, prev);
    // update the current node prev to the new one
    current.prev = newNode;
    // update the prev's next node to the new one
    prev!.next = newNode;

    this.length += 1;

    return true;
  }

  remove(index: number) {
    // If the index is negative or the length is more than length - 1
    if (index < 0 || index > this.length - 1) return false;
    // If the index is at the beginning, use unshift
    if (index === 0) return this.shift();
    // If the index is at the last, use push
    if (index === this.length - 1) return this.pop();

    // get current index node
    const current = this.get(index);

    if (!current) return false;

    // save next and prev node from the current node
    const next = current.next;
    const prev = current.prev;

    if (!next || !prev) return false;

    prev.next = next;
    next.prev = prev;

    this.length -= 1;

    return true;
  }

  reverse() {
    if (!this.head) return false;
    if (this.length === 1) return this;

    // First thing first, keep track of the current head,
    // and tail. This value will be used to switch the head
    // and the tail respectively.
    const head = this.head;
    const tail = this.tail;

    // Switch head as tail
    // Switch tail as head
    this.head = tail;
    this.tail = head;

    // Keep track of current value that will be used in a loop
    // This value is updated to the next pointer inside of the loop.
    let current: DLLNode | null = head;

    while (current) {
      // Keep track of current next and prev.
      // These values will be switch over like the head and the tail.
      const next: DLLNode | null = current.next;
      const prev: DLLNode | null = current.prev;

      // Switch next as prev
      current.next = prev;
      // Switch prev as next
      current.prev = next;

      // Update the current to the next value
      current = next;
    }

    return this;
  }

  static mapToArray(dll: DoublyLinkedList, reverse?: boolean) {
    const result = [];

    if (!reverse) {
      let current = dll.head;

      while (current) {
        result.push(current.value);
        current = current?.next;
      }

      return result;
    } else {
      let current = dll.tail;

      while (current) {
        result.push(current.value);
        current = current?.prev;
      }

      return result;
    }
  }
}

const dll = new DoublyLinkedList();

dll.push("First Node").push("Second Node").push("Third Node").push("Last Node");

console.log(dll.head?.next?.value);
// dll.pop();
// dll.shift();
// dll.unshift("IAM NEW FROM unshift");

// console.log(dll.set(1, "NEW VALUE FROM SET"));
// console.log(dll.insert(3, "VALUE FROM INSERT"));

// console.log("BEFORE REMOVE", DoublyLinkedList.mapToArray(dll));
// console.log(dll.remove(2));
// console.log("AFTER REMOVE", DoublyLinkedList.mapToArray(dll));

// console.log(DoublyLinkedList.mapToArray(dll));
// // Print in reverse
// console.log(DoublyLinkedList.mapToArray(dll, true));

console.log(dll.reverse());
console.log(DoublyLinkedList.mapToArray(dll));
