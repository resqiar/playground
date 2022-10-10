#include <iostream>
using namespace std;

struct Stack {
  char optr[100];
  int tos = -1;
};

void push(Stack *stack, char value) {
  stack->tos++;
  stack->optr[stack->tos] = value;
}

void pop(Stack *stack) { stack->tos--; }

void clearStack(Stack *stack) { stack->tos = -1; }

char pumpTos(Stack *stack) { return stack->optr[stack->tos]; }

int main() {
  Stack *newStack = new Stack();

  push(newStack, '+');
  push(newStack, '/');
  push(newStack, '*');
  pop(newStack);

  char lastEl = pumpTos(newStack);
  std::cout << lastEl << endl;

  return 0;
}
