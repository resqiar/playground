#include <iostream>
using namespace std;

const int STACK_MAXIMUM_CAPACITY = 100;

struct Stack {
  char optr[STACK_MAXIMUM_CAPACITY];
  int tos = -1;
};

// Method to check if the stack is at the maximum capacity.
// Since the stack is using array, which is fixed size, we need
// to do this to prevent stack overflow (well actually index out of bound)
bool isStackFull(Stack *stack) { return stack->tos >= STACK_MAXIMUM_CAPACITY; }
bool isEmpty(Stack *stack) { return stack->tos == -1; }

void push(Stack *stack, char value) {
  stack->tos++;
  stack->optr[stack->tos] = value;
}

char pop(Stack *stack) {
  // Save the top value first
  char temp = stack->optr[stack->tos];
  // Decrement the TOS
  stack->tos--;
  // return back the pop'ed value
  return temp;
}

// Print or dump all the values (operator) inside
// the stack. This might only needed in debug purposes.
void dump(Stack *stack) {
  for (int i = 0; i <= stack->tos; i++) {
    cout << stack->optr[i] << endl;
  }
}

int main() { return 0; }
