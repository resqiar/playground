class Node:
    def __init__(self, value, next=None, prev=None):
        self.value = value;
        self.next = next;
        self.prev = prev;

class DLL:
    def __init__(self, head=None, tail=None, len=0):
        self.head = head;
        self.tail = tail;
        self.len = len;

    def push(self, value: int):
        new_node = Node(value=value)

        # conditions where the list is empty
        if self.len == 0:
            self.head = new_node
            self.tail = new_node
            self.len += 1
            return

        # conditions where the list contains at least 1
        temp = self.tail
        new_node.prev = temp
        temp.next = new_node
        self.tail = new_node
        self.len += 1

    def pop(self):
        if self.len == 0:
            return
        
        if self.len == 1:
            self.head = None
            self.tail = None
            self.len = 0
            return

        temp = self.tail.prev
        temp.next = None
        self.tail = temp
        self.len -= 1


    def dump(self):
        temp = self.head

        while temp:
            print(temp.value)
            temp = temp.next

dll = DLL()

for i in range(10):
    dll.push(i + 1)

for i in range(10):
    dll.pop()

dll.dump()
