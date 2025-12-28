export type StudentStats = {
  studentId: string;
  routes: number;
  courses: number;
  progress: number;
};

export const studentStatsMock: StudentStats[] = [
  {
    studentId: '1',
    routes: 4,
    courses: 15,
    progress: 40,
  },
  {
    studentId: '2',
    routes: 3,
    courses: 10,
    progress: 65,
  },
  {
    studentId: '3',
    routes: 5,
    courses: 18,
    progress: 80,
  },
  {
    studentId: '4',
    routes: 2,
    courses: 6,
    progress: 25,
  },
];
