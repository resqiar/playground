#include <iostream>

struct Node {
  int data;
  int height;
  Node *left;
  Node *right;
};

class HBT {
public:
  Node *tree;
};

Node *insert(HBT *tree, int data) {
  Node *newNode = new Node();
  if (tree->tree == nullptr) {
    newNode->data = data;
    newNode->left = NULL;
    newNode->right = NULL;
    newNode->height = 0;
    tree->tree = newNode;
  }
  return newNode;
}

int main(int argc, char *argv[]) {
  HBT *root = new HBT();

  insert(root, 10);
  // insert(root, 5);

  std::cout << root->tree->data << std::endl;

  return 0;
}
