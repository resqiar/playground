#include <iostream>
using namespace std;

struct Student {
  int id;
  string fullname;
  string dob;
  char grade;
  char gender;
  double gpa;
};

struct Node {
  Student value;
  struct Node *next;
  struct Node *prev;
};

class DoublyLinkedList {
public:
  Node *head;
  Node *tail;
  int length = 0;

  void push(Student student) {
    // Create a new node based on input value
    Node *newNode = new Node();
    newNode->value = student;

    // If the current LinkedList head is null (List is null)
    if (head == nullptr) {
      // Set head and tail to the new created node
      head = newNode;
      tail = newNode;
      // Increment length of the list
      length++;
    }

    // If the current head is not null (List has a value)
    else {
      // Create a temporary variable to hold current tail
      Node *temp = tail;
      // set current tail next el to the new node
      tail->next = newNode;
      // set tail to new node
      tail = newNode;
      // set updated tail prev el to previous tail
      tail->prev = temp;
      // Increment length
      length++;
    };
  };

  void pop() {
    // If the list is null
    if (head == nullptr)
      return;

    // If the length of the list only has 1 Node
    if (length == 1) {
      head = NULL;
      tail = NULL;
      length--;
    }

    // If it contains more than 1 Node
    else {
      // create a temp to hold previous node of the current tail
      Node *temp = tail->prev;
      // set temp next pointer to null
      temp->next = NULL;
      // set the tail to temp
      tail = temp;
      // decrement the length
      length--;
    }
  }

  void traverse() {
    // If the list is null
    if (head == nullptr)
      return;

    // set temp variable to the current head,
    // this head will be updated to the next node inside the loop.
    Node *temp = head;

    cout << "========== TRAVERSE ==========" << endl;

    // While there is still temp (not null)
    while (temp) {
      cout << temp->value.id << ". ";
      cout << temp->value.fullname << " "
           << "| grade " << temp->value.grade << " | DOB " << temp->value.dob
           << " | Gender " << temp->value.gender << " | GPA " << temp->value.gpa
           << endl;

      // Update the temp to the next pointer value
      temp = temp->next;
    }

    cout << "======================" << endl;
  }

  void reverse() {
    if (head == nullptr)
      return;

    // set temp variable to the current tail,
    // this tail will be updated (traversed) backward to the prev node inside
    // the loop.
    Node *temp = tail;

    cout << "========== REVERSE ==========" << endl;

    // While there is still temp (not null)
    while (temp) {
      cout << temp->value.id << ". ";

      cout << temp->value.fullname << " "
           << "| grade " << temp->value.grade << " | DOB " << temp->value.dob
           << " | Gender " << temp->value.gender << " | GPA " << temp->value.gpa
           << endl;

      // Update the temp to the next pointer value
      temp = temp->prev;
    }

    cout << "======================" << endl;

    cout << endl;
  }
};

int main() {
  DoublyLinkedList *dll = new DoublyLinkedList();

  // FIRST STUDENT
  Student *studentA = new Student();
  studentA->id = 1;
  studentA->fullname = "Hilmy";
  studentA->grade = 'S';
  studentA->dob = "1998-07-01";
  studentA->gender = 'F';
  studentA->gpa = 4.2;

  // SECOND STUDENT
  Student *studentB = new Student();
  studentB->id = 2;
  studentB->fullname = "Nathan";
  studentB->grade = 'S';
  studentB->dob = "2005-05-05";
  studentB->gender = 'M';
  studentB->gpa = 9.2;

  // THIRD STUDENT
  Student *studentC = new Student();
  studentC->id = 3;
  studentC->fullname = "Resqi";
  studentC->dob = "2001-29-04";
  studentC->grade = 'A';
  studentC->gender = 'M';
  studentC->gpa = 4.5;

  dll->push(*studentA);
  dll->push(*studentB);
  dll->push(*studentC);

  cout << "LENGTH OF DLL " << dll->length << endl;
  // dll->pop();
  cout << "LENGTH OF DLL " << dll->length << endl;

  // Traverse and Reverse
  dll->traverse();
  dll->reverse();
  return 0;
}
