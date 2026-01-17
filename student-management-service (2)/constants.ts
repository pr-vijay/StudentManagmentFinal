import { Student, Teacher, Course, Notice, UserRole } from './types';

export const APP_NAME = "Kendriya Vidyalaya Dewas";
export const SCHOOL_NAME = "Kendriya Vidyalaya Dewas";
export const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Aarav Patel', class: 'X-A', rollNo: '101', status: 'Present', guardian: 'Suresh Patel', fees: 'Paid' },
  { id: '2', name: 'Aditi Sharma', class: 'X-A', rollNo: '102', status: 'Present', guardian: 'Rohit Sharma', fees: 'Paid' },
  { id: '3', name: 'Rohan Gupta', class: 'X-B', rollNo: '205', status: 'Absent', guardian: 'Manish Gupta', fees: 'Pending' },
  { id: '4', name: 'Sneha Singh', class: 'IX-A', rollNo: '310', status: 'Present', guardian: 'Vikram Singh', fees: 'Paid' },
  { id: '5', name: 'Vikram Malhotra', class: 'XII-C', rollNo: '005', status: 'Present', guardian: 'Rajeev Malhotra', fees: 'Paid' },
  { id: '6', name: 'Ishaan Verma', class: 'X-A', rollNo: '103', status: 'Present', guardian: 'Sanjay Verma', fees: 'Pending' },
  { id: '7', name: 'Ananya Iyer', class: 'XI-B', rollNo: '412', status: 'Absent', guardian: 'Venkat Iyer', fees: 'Paid' },
  { id: '8', name: 'Meera Reddy', class: 'VIII-A', rollNo: '501', status: 'Present', guardian: 'Prasad Reddy', fees: 'Paid' },
  { id: '9', name: 'Kabir Das', class: 'XII-A', rollNo: '008', status: 'Present', guardian: 'Amit Das', fees: 'Paid' },
  { id: '10', name: 'Sanya Kapoor', class: 'IX-B', rollNo: '315', status: 'Present', guardian: 'Rishi Kapoor', fees: 'Pending' },
  { id: '11', name: 'Arjun Mehta', class: 'X-A', rollNo: '104', status: 'Present', guardian: 'Anil Mehta', fees: 'Paid' },
  { id: '12', name: 'Zara Khan', class: 'X-B', rollNo: '206', status: 'Present', guardian: 'Amir Khan', fees: 'Paid' },
  { id: '13', name: 'Vihaan Joshi', class: 'IX-A', rollNo: '311', status: 'Present', guardian: 'Deepak Joshi', fees: 'Paid' },
  { id: '14', name: 'Myra Saxena', class: 'XII-C', rollNo: '006', status: 'Absent', guardian: 'Alok Saxena', fees: 'Pending' },
  { id: '15', name: 'Reyansh Kumar', class: 'XI-A', rollNo: '401', status: 'Present', guardian: 'Manoj Kumar', fees: 'Paid' },
  { id: '16', name: 'Diya Nair', class: 'VIII-B', rollNo: '520', status: 'Present', guardian: 'Rajan Nair', fees: 'Paid' },
  { id: '17', name: 'Sai Krishna', class: 'X-A', rollNo: '105', status: 'Present', guardian: 'Gopal Krishna', fees: 'Paid' },
  { id: '18', name: 'Aadhya Bhat', class: 'IX-B', rollNo: '316', status: 'Absent', guardian: 'Suresh Bhat', fees: 'Pending' },
  { id: '19', name: 'Prisha Agrawal', class: 'XII-A', rollNo: '009', status: 'Present', guardian: 'Navin Agrawal', fees: 'Paid' },
  { id: '20', name: 'Vivaan Shah', class: 'XI-C', rollNo: '430', status: 'Present', guardian: 'Karan Shah', fees: 'Paid' },
  { id: '21', name: 'Ansh Choudhury', class: 'X-B', rollNo: '207', status: 'Present', guardian: 'Rahul Choudhury', fees: 'Pending' },
  { id: '22', name: 'Pari Jain', class: 'IX-A', rollNo: '312', status: 'Present', guardian: 'Mukesh Jain', fees: 'Paid' },
  { id: '23', name: 'Krishna Yadav', class: 'VIII-A', rollNo: '502', status: 'Present', guardian: 'Lalit Yadav', fees: 'Paid' },
  { id: '24', name: 'Riya Solanki', class: 'XII-B', rollNo: '025', status: 'Present', guardian: 'Dinesh Solanki', fees: 'Paid' },
  { id: '25', name: 'Ishita Roy', class: 'XI-B', rollNo: '413', status: 'Absent', guardian: 'Subhash Roy', fees: 'Pending' },
  { id: '26', name: 'Aditya Mishra', class: 'X-A', rollNo: '106', status: 'Present', guardian: 'Prakash Mishra', fees: 'Paid' },
  { id: '27', name: 'Kavya Hegde', class: 'IX-B', rollNo: '317', status: 'Present', guardian: 'Narayan Hegde', fees: 'Paid' },
  { id: '28', name: 'Dhruv Pandey', class: 'XII-C', rollNo: '007', status: 'Present', guardian: 'Vikas Pandey', fees: 'Paid' },
  { id: '29', name: 'Anvi Deshmukh', class: 'XI-A', rollNo: '402', status: 'Present', guardian: 'Sharad Deshmukh', fees: 'Pending' },
  { id: '30', name: 'Aaryan Thakur', class: 'VIII-B', rollNo: '521', status: 'Absent', guardian: 'Ranveer Thakur', fees: 'Paid' },
  { id: '31', name: 'Atharv Nanda', class: 'X-B', rollNo: '208', status: 'Present', guardian: 'Kamal Nanda', fees: 'Paid' },
  { id: '32', name: 'Saanvi Rao', class: 'IX-A', rollNo: '313', status: 'Present', guardian: 'Mahesh Rao', fees: 'Paid' },
  { id: '33', name: 'Kabir Seth', class: 'XII-A', rollNo: '010', status: 'Present', guardian: 'Arun Seth', fees: 'Paid' },
  { id: '34', name: 'Kiara Chauhan', class: 'XI-C', rollNo: '431', status: 'Present', guardian: 'Yash Chauhan', fees: 'Pending' },
  { id: '35', name: 'Ayaan Trivedi', class: 'X-A', rollNo: '107', status: 'Present', guardian: 'Nilesh Trivedi', fees: 'Paid' },
  { id: '36', name: 'Shanaya Gill', class: 'IX-B', rollNo: '318', status: 'Absent', guardian: 'Jasbir Gill', fees: 'Paid' },
  { id: '37', name: 'Shaurya Pillai', class: 'VIII-A', rollNo: '503', status: 'Present', guardian: 'Madhav Pillai', fees: 'Paid' },
  { id: '38', name: 'Naira Kaur', class: 'XII-B', rollNo: '026', status: 'Present', guardian: 'Harpreet Kaur', fees: 'Pending' },
  { id: '39', name: 'Aarush Sinha', class: 'XI-B', rollNo: '414', status: 'Present', guardian: 'Rakesh Sinha', fees: 'Paid' },
  { id: '40', name: 'Pihu Malik', class: 'X-B', rollNo: '209', status: 'Present', guardian: 'Sandeep Malik', fees: 'Paid' },
  { id: '41', name: 'Rudransh Tiwari', class: 'IX-A', rollNo: '314', status: 'Present', guardian: 'Brijesh Tiwari', fees: 'Paid' },
  { id: '42', name: 'Anika Biswas', class: 'XII-C', rollNo: '008', status: 'Present', guardian: 'Tapan Biswas', fees: 'Paid' },
  { id: '43', name: 'Om Jaiswal', class: 'XI-A', rollNo: '403', status: 'Absent', guardian: 'Pankaj Jaiswal', fees: 'Pending' },
  { id: '44', name: 'Navya Menon', class: 'VIII-B', rollNo: '522', status: 'Present', guardian: 'Unnikrishnan Menon', fees: 'Paid' },
  { id: '45', name: 'Darsh Goel', class: 'X-A', rollNo: '108', status: 'Present', guardian: 'Ashish Goel', fees: 'Paid' },
  { id: '46', name: 'Ridhima Chopra', class: 'IX-B', rollNo: '319', status: 'Present', guardian: 'Varun Chopra', fees: 'Paid' },
  { id: '47', name: 'Shivansh Garg', class: 'XII-A', rollNo: '011', status: 'Present', guardian: 'Nitin Garg', fees: 'Pending' },
  { id: '48', name: 'Aarna Soni', class: 'XI-C', rollNo: '432', status: 'Present', guardian: 'Hemant Soni', fees: 'Paid' },
  { id: '49', name: 'Tanish Anand', class: 'X-B', rollNo: '210', status: 'Present', guardian: 'Vivek Anand', fees: 'Paid' },
  { id: '50', name: 'Shruti Dubey', class: 'IX-A', rollNo: '315', status: 'Absent', guardian: 'Ravi Dubey', fees: 'Paid' }
];

export const MOCK_TEACHERS: Teacher[] = [
  { id: '1', name: 'Mrs. Sunita Rao', subject: 'Mathematics', email: 'sunita.rao@kv.edu.in', phone: '+91 98765 43210', joinDate: '2015-06-15' },
  { id: '2', name: 'Mr. Rajesh Kumar', subject: 'Physics', email: 'rajesh.kumar@kv.edu.in', phone: '+91 98765 43211', joinDate: '2018-04-01' },
  { id: '3', name: 'Ms. Priya Desai', subject: 'English', email: 'priya.desai@kv.edu.in', phone: '+91 98765 43212', joinDate: '2020-01-10' },
  { id: '4', name: 'Dr. Amit Singh', subject: 'Chemistry', email: 'amit.singh@kv.edu.in', phone: '+91 98765 43213', joinDate: '2012-07-20' },
  { id: '5', name: 'Mrs. Kavita Verma', subject: 'Hindi', email: 'kavita.verma@kv.edu.in', phone: '+91 98765 43214', joinDate: '2019-11-05' },
];

export const MOCK_COURSES: Course[] = [
  { id: '1', title: 'Advanced Mathematics', class: 'Class X', teacher: 'Mrs. Sunita Rao', timing: '08:00 AM - 09:00 AM', days: 'Mon, Wed, Fri' },
  { id: '2', title: 'Physics Lab', class: 'Class XII', teacher: 'Mr. Rajesh Kumar', timing: '10:00 AM - 11:30 AM', days: 'Tue, Thu' },
  { id: '3', title: 'English Literature', class: 'Class IX', teacher: 'Ms. Priya Desai', timing: '09:00 AM - 10:00 AM', days: 'Mon, Tue, Wed, Thu, Fri' },
  { id: '4', title: 'Organic Chemistry', class: 'Class XI', teacher: 'Dr. Amit Singh', timing: '12:00 PM - 01:00 PM', days: 'Mon, Wed, Fri' },
  { id: '5', title: 'Hindi Vyakaran', class: 'Class VIII', teacher: 'Mrs. Kavita Verma', timing: '02:00 PM - 03:00 PM', days: 'Mon, Tue, Thu' },
  { id: '6', title: 'Computer Science', class: 'Class XI', teacher: 'Mr. Arun Patel', timing: '11:00 AM - 12:00 PM', days: 'Wed, Fri' },
];

export const MOCK_NOTICES: Notice[] = [
  { id: '1', title: 'Diwali Holidays', date: '25 Oct 2024', description: 'School will remain closed from Oct 30 to Nov 4 for Diwali celebrations.', type: 'Holiday' },
  { id: '2', title: 'Annual Sports Day', date: '20 Oct 2024', description: 'Registration for track and field events closes on 25th October.', type: 'Event' },
  { id: '3', title: 'Half-Yearly Exams', date: '15 Oct 2024', description: 'Exam schedule for Class VI to XII has been released on the notice board.', type: 'Academic' },
  { id: '4', title: 'Parent Teacher Meeting', date: '10 Oct 2024', description: 'PTM for Class X will be held on Saturday, 12th October from 9 AM to 12 PM.', type: 'Admin' },
];

export const MOCK_STATS = {
  [UserRole.ADMIN]: [
    { title: 'Total Students', value: 1250, color: 'bg-green-100 text-green-800' },
    { title: 'Teaching Staff', value: 54, color: 'bg-emerald-100 text-emerald-800' },
    { title: 'Courses Active', value: 24, color: 'bg-teal-100 text-teal-800' },
  ],
  [UserRole.TEACHER]: [
    { title: 'My Students', value: 45, color: 'bg-green-100 text-green-800' },
    { title: 'Lectures Today', value: 4, color: 'bg-blue-100 text-blue-800' },
    { title: 'Assignments', value: 12, color: 'bg-orange-100 text-orange-800' },
  ],
  [UserRole.STUDENT]: [
    { title: 'Attendance', value: '92%', color: 'bg-green-100 text-green-800' },
    { title: 'Assignments', value: 3, color: 'bg-purple-100 text-purple-800' },
    { title: 'Fees Due', value: '₹0', color: 'bg-yellow-100 text-yellow-800' },
  ]
};