interface Props {
  name: string;
  id: number;
  gpa: number;
}

class Student {
  name: string | undefined;
  id: number | undefined;
  gpa: number | undefined;

  constructor(props?: Props) {
    this.name = props?.name;
    this.id = props?.id;
    this.gpa = props?.gpa;
  }

  passExam(): boolean {
    if (!this.gpa) return false;
    if (this.gpa < 70) return false;
    return true;
  }

  static whichStudentBest(students: Student[]): Student[] {
    return students.filter((v) => {
      if (!v.gpa) return;
      return v.gpa >= 90;
    });
  }
}

const studentA = new Student({ name: "Anton", id: 12356, gpa: 90 });
const studentB = new Student({ name: "Boeni", id: 12359, gpa: 60 });

const studentC = new Student();
studentC.name = "Mauna Loa";
studentC.id = 25;
studentC.gpa = 99;

console.log(
  studentA.passExam(),
  "AND",
  studentB.passExam(),
  "AND",
  studentC.passExam()
);

console.log(Student.whichStudentBest([studentA, studentB, studentC]));
