#include <iostream>
using namespace std;

const int MAX_QUEUE_SIZE = 10;

class Queue {
  int rear, front = -1;
  int size = MAX_QUEUE_SIZE;
  int arr[MAX_QUEUE_SIZE];

public:
  void enQueue(int value) {
    if ((front == 0 && rear == size - 1) ||
        (rear == (front - 1) % (size - 1))) {
      printf("\nQueue is Full");
      return;
    }

    else if (front == -1) /* Insert First Element */
    {
      front = rear = 0;
      arr[rear] = value;
    }

    else if (rear == size - 1 && front != 0) {
      rear = 0;
      arr[rear] = value;
    }

    else {
      rear++;
      arr[rear] = value;
    }
  }

  // Function to delete element from Circular Queue
  int deQueue() {
    if (front == -1) {
      printf("\nQueue is Empty");
      return -1;
    }

    int data = arr[front];
    arr[front] = -1;
    if (front == rear) {
      front = -1;
      rear = -1;
    } else if (front == size - 1)
      front = 0;
    else
      front++;

    return data;
  }
};

/* Driver of the program */
int main() {
  Queue q;

  // Inserting elements in Circular Queue
  q.enQueue(14);
  q.enQueue(22);
  q.enQueue(13);
  q.enQueue(-6);
  q.enQueue(14);
  q.enQueue(22);
  q.enQueue(13);
  q.enQueue(-6);

  // Deleting elements from Circular Queue
  printf("\nDeleted value = %d", q.deQueue());
  printf("\nDeleted value = %d", q.deQueue());

  q.enQueue(9);
  q.enQueue(20);
  q.enQueue(5);

  q.enQueue(20);
  return 0;
}
