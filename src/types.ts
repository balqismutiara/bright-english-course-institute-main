export type UserRole = 'admin' | 'student' | 'teacher';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
}

export interface Registration {
  id?: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  age: number;
  address: string;
  parentName: string;
  parentPhone: string;
  username?: string;
  password?: string;
  level: string;
  schedule: string;
  timeSlot: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface StudentReport {
  id?: string;
  studentId: string;
  studentName: string;
  reading: number;
  writing: number;
  speaking: number;
  listening: number;
  attendance: number;
  feedback: string;
  updatedAt: string;
}

export interface Course {
  id?: string;
  title: string;
  description: string;
  price: string;
  level: string;
}

export interface Teacher {
  name: string;
  role: string;
  exp: string;
  img: string;
  bio: string;
}
