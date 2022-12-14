class LLNode {
  constructor(public value: any, public next?: LLNode | null) {}
}

class SinglyLinkedList {
  head: LLNode | null | undefined;
  tail: LLNode | null | undefined;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value: any): SinglyLinkedList {
    // Create a new Node
    const newLLNode = new LLNode(value);

    // If the head or tail not exist,
    // that means the LinkedList is empty,
    // we can directly update the head and the tail
    // to the new Node.
    if (!this.head || !this.tail) {
      this.head = newLLNode;
      this.tail = newLLNode;

      // Add length by 1
      this.length += 1;

      return this;
    }

    // If the tail exist, first point the current tail
    // next to the new Node.
    this.tail.next = newLLNode;
    // Update the current tail Node to the new one.
    this.tail = newLLNode;
    // Update the length of the LinkedList
    this.length += 1;

    return this;
  }

  pop() {
    // If there is no head (na value in list)
    // return undefined.
    if (!this.head) return undefined;

    // Temporary value to search the last item
    let temp: LLNode | null = this.head;

    // Pre value to hold the last item before last item
    let pre: LLNode = this.head;

    while (temp) {
      // Set next value to the next item
      let next: LLNode | undefined | null = temp.next;

      if (next) {
        // If there is value in after the current temp value.
        // Set pre value to the last temp value, temporary
        // value to the next item, and continue the loop.
        pre = temp;
        temp = next;
        continue;
      }

      // At this point, the loop has reached the last item,
      // which imply there is no item after current temp.

      // Set the last pre value's next to null
      pre.next = null;
      // Set current tail to pre value
      this.tail = pre;
      // Reduce the length of the current LinkedList by 1
      this.length--;

      // If the length of the list is 0,
      // set the head and tail to null.
      if (this.length === 0) {
        this.head = null;
        this.tail = null;
      }

      // Return the node removed
      return temp;
    }
  }

  shift() {
    // If there is no head, return undefined
    if (!this.head) return;

    // Save current head
    const currentHead = this.head;
    // Save current next
    const afterCurrent = this.head.next;

    // Set the current head to the next value
    this.head = afterCurrent;
    // Decrement the length by 1
    this.length -= 1;

    // If the length of the list is 0,
    // set the head and tail to null.
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    // return the last deleted Node
    return currentHead;
  }

  unshift(value: any) {
    // Create new node
    const newNode = new LLNode(value);

    // If there is no head (empty list)
    // point head and tail to the new node,
    // Increment the length and return immediately
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length += 1;
      return this;
    }

    // Save the current head for later usage
    const lastHead = this.head;

    // Set current head to the new created Node
    this.head = newNode;

    // Set current head "next" pointer
    // to the last head before insertion.
    this.head.next = lastHead;

    // Increment the length by 1
    this.length += 1;

    return this;
  }

  get(index: number) {
    if (index < 0 || index >= this.length) return null;

    let count = 0;
    let current = this.head;

    while (count < index) {
      current = current?.next;
      count++;
    }

    return current;
  }

  set(index: number, value: any) {
    const node = this.get(index);

    if (node) {
      node.value = value;
      return node;
    }

    return null;
  }

  insert(index: number, value: any) {
    // If the index is negative and more than the list's length
    if (index < 0 || index > this.length) return false;

    // If the index is at the beginning of the list, use unshift instead
    if (index === 1) return !!this.unshift(value);

    // If the index is at the last of the list, use push instead
    if (index === this.length) return !!this.push(value);

    // Take the previous node before index
    const pre = this.get(index - 1);
    // Save the next node of pre
    const after = pre?.next;

    // Create a new node to be inserted
    const newNode = new LLNode(value);

    // Point the next node from pre to the new Node
    if (pre?.next) pre.next = newNode;

    // Point the next node from new Node to after
    newNode.next = after;

    // Increment length
    this.length += 1;

    return true;
  }

  remove(index: number) {
    // If the index is negative and more than the list's length
    if (index < 0 || index >= this.length) return false;

    // If the index is at the beginning of the list, use unshift instead
    if (index === 1) return this.shift();

    // If the index is at the last of the list, use push instead
    if (index === this.length) return this.pop();

    // Take the previous node before index
    const pre = this.get(index - 1);
    const current = this.get(index);

    // Save the next node of current
    const after = current?.next;

    // Point the next node from pre to the new Node
    pre!.next = after;

    // Increment length
    this.length -= 1;

    return true;
  }

  reverse() {
    // If the current length is 0
    if (!this.length) return false;
    // If the current length is 1
    if (this.length === 1) return this;

    // Keep the head and tail
    const head = this.head;
    const tail = this.tail;

    // Reverse the head and tail
    this.head = tail;
    this.tail = head;

    // Keep the previous value
    let previous = this.tail;

    // Keep the current value
    let current = head?.next;

    // While there is a current value, do a loop
    while (current) {
      // We need to keep track of next value of current.
      // This will be used to update the current value
      // to the next point, otherwise it will looping forever.
      const next = current.next;

      // Reverse the current next to previous node
      current.next = previous;

      // Update the previous point to current
      previous = current;

      // Update the current to the next point
      current = next;
    }

    // AT THIS POINT WE ALREADY REACH THE LAST
    // POINT OF THE LIST, we can update the tail
    // to be null.
    this.tail!.next = null;
    return this;
  }

  static mapToArray(list: SinglyLinkedList) {
    const values = [];

    // Temporary value to point to the next item
    let pointer: LLNode | undefined | null = list.head;

    // If there is next item in pointer, loop through
    while (pointer) {
      // Push current value to the array
      values.push(pointer.value);
      // Set pointer to the next item
      pointer = pointer.next;
    }

    return values;
  }
}

const sll = new SinglyLinkedList();

// PUSH - METHOD
sll.push("First Node");
sll.push("Second Node");
sll.push("Third Node");
// sll.push([1, 2, 3, 4, 5]);
// console.log(sll);

// POP - METHOD
// sll.push("First Node");
// sll.push("Second Node");
// sll.push("Third Node");
// sll.push("Last Node");
// console.log("Removed value = ", sll.pop());
// sll.push("New Node");
// sll.pop();
// sll.pop();
// sll.pop();
// sll.pop();
// console.log(sll);

// SHIFT
// console.log("============== SHIFT =============");
// sll.shift();
// console.log(sll);

// // UNSHIFT
// console.log("============== UNSHIFT =============");
// const newSll = new SinglyLinkedList();
// newSll.unshift("New Node");
// console.log(newSll);

// sll.unshift("NEW FROM UNSHIFT");

// // MAP TO ARRAY
// console.log("============== MAP TO ARRAY =============");
// console.log(SinglyLinkedList.mapToArray(sll));

// console.log("============== GET =============");
// console.log(sll.get(2));

// console.log("============== SET =============");
// console.log(sll.set(0, "UPDATED FROM SET"));

// console.log("============== INSERT =============");
// console.log(sll.length);
// console.log(sll.insert(1, "IAM NEW!"));

// console.log("============== REMOVE =============");
// console.log(sll.remove(3));

// // MAP TO ARRAY
// console.log("============== MAP TO ARRAY =============");
// console.log(SinglyLinkedList.mapToArray(sll));

console.log(sll.push("I AM THE LAST, BUT REVERSED"));

console.log("============== REVERSE =============");
console.log("BEFORE REVERSE", SinglyLinkedList.mapToArray(sll));
console.log(sll.reverse());
console.log("AFTER REVERSE", SinglyLinkedList.mapToArray(sll));
