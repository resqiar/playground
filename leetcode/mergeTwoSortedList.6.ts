class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  let dummyHead: ListNode = new ListNode();

  let current = dummyHead;

  // if list1 & list 2 is not null,
  // this cond means if both of them exist then iterate,
  // if not or one of them are not exist, break
  while (list1 && list2) {
    // if list1 < list2
    // then bind list1 value to the dummyHead
    if (list1.val < list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }

    current = current.next;
  }

  // bind the rest to the dummy head
  current.next = list1 ? list1 : list2;

  return dummyHead.next;
}

const firstList = new ListNode(1);
const secondList = new ListNode(2);

const merged = mergeTwoLists(firstList, secondList);

let temp = merged;
while (temp) {
  console.log(temp.val);
  temp = temp.next;
}
