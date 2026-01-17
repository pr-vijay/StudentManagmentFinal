import React from 'react';

export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

export interface User {
  username: string;
  role: UserRole;
  name: string;
  email: string;
  class?: string; // Added to link students to a specific class
}

export interface StatCardData {
  title: string;
  value: string | number;
  icon: React.ElementType;
  colorClass: string;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  rollNo: string;
  status: 'Present' | 'Absent';
  guardian: string;
  fees: 'Paid' | 'Pending';
  // New extended fields
  dob?: string;
  gender?: 'Male' | 'Female' | 'Other';
  phone?: string;
  email?: string;
  address?: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  phone: string;
  joinDate: string;
}

export interface Course {
  id: string;
  title: string;
  class: string;
  teacher: string;
  timing: string;
  days: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  description: string;
  type: 'Academic' | 'Event' | 'Holiday' | 'Admin';
}

export type ViewState = 'DASHBOARD' | 'STUDENTS' | 'TEACHERS' | 'COURSES' | 'PROFILE';