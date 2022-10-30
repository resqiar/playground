#include <cctype>
#include <iostream>
#include <string>
using namespace std;

const int STACK_MAXIMUM_CAPACITY = 100;

struct Stack {
  char optr[STACK_MAXIMUM_CAPACITY];
  int tos = -1;
};

int priority(char optr) {
  if (optr == '+' || optr == '-')
    return 1;
  if (optr == '*' || optr == '/')
    return 2;
  if (optr == '^')
    return 3;

  return 0;
}

// Method to check if the stack is at the maximum capacity.
// Since the stack is using array, which is fixed size, we need
// to do this to prevent stack overflow (well actually index out of bound)
bool isStackFull(Stack *stack) { return stack->tos >= STACK_MAXIMUM_CAPACITY; }
bool isEmpty(Stack *stack) { return stack->tos == -1; }

char getTopStack(Stack *stack) { return stack->optr[stack->tos]; }

void push(Stack *stack, char value) {
  // Throw error if the stack is full
  if (isStackFull(stack))
    throw "STACK IS FULL!!!";

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

bool isOperand(char value) {
  // if operand add to the postfix expression
  if (value >= 'a' && value <= 'z' || value >= 'A' && value <= 'Z' ||
      isdigit(value))
    return true;
  return false;
}

string convert(string infix) {
  int i = 0;
  string postfix = "";

  Stack *s = new Stack();

  while (infix[i]) {
    if (infix[i] == ' ') {
      i++;
      continue;
    }

    // If the current infix char is operand
    if (isOperand(infix[i])) {
      postfix += infix[i];
      i++;
    }

    // If the current infix char is '.',
    // then we need to treat this value the same as operand
    else if (infix[i] == '.') {
      postfix += infix[i];
      i++;
      continue;
    }

    // if the current infix char is open bracket "("
    else if (infix[i] == '(') {
      push(s, infix[i]);
      i++;
    }

    // If the current infix char is closing bracked ")"
    else if (infix[i] == ')') {
      // Pop all value inside the stack until we encounter the "("
      while (s->optr[s->tos] != '(') {
        postfix += pop(s);
      }

      // Dismiss or delete the "("
      pop(s);
      // Increment the i
      i++;
    }

    // AT THIS POINT, the current char is the normal operator ex * / + etc
    else {
      // Check the priority of the current operator with the last operator in
      // the stack, this loop will check if the current priority is less or the
      // same priority as the last operator in the stack.
      while (!isEmpty(s) && priority(infix[i]) <= priority(getTopStack(s))) {
        postfix += pop(s);
      }

      // push the current operator IF the priority is higher
      push(s, infix[i]);
      i++;
    }
  }

  // POP ALL THE VALUE INSIDE THE STACK TO THE OUTPUT
  while (!isEmpty(s)) {
    postfix += pop(s);
  }

  return postfix;
}

int main() {
  string infix;

  cout << "ENTER THE INFIX :" << endl;
  getline(cin, infix);

  string postfix = convert(infix);

  cout << "POSTFIX RESULT :" << endl;
  cout << postfix << endl;

  return 0;
}
