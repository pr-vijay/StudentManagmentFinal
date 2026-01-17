import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  UserCircle, 
  LogOut, 
  Menu, 
  X,
  Search,
  Calendar,
  Clock,
  Mail,
  Phone,
  IndianRupee,
  Plus,
  Save,
  Pencil,
  Trash2
} from 'lucide-react';
import { User, UserRole, ViewState, Student } from '../types';
import { MOCK_STATS, MOCK_STUDENTS, MOCK_TEACHERS, MOCK_COURSES, MOCK_NOTICES, SCHOOL_NAME, APP_NAME } from '../constants';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState<ViewState>('DASHBOARD');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // Student Management State
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  
  const initialStudentData: Partial<Student> = {
    name: '',
    class: '',
    rollNo: '',
    guardian: '',
    status: 'Present',
    fees: 'Pending',
    dob: '',
    gender: 'Male',
    phone: '',
    email: '',
    address: ''
  };

  const [studentFormData, setStudentFormData] = useState<Partial<Student>>(initialStudentData);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleOpenAddModal = () => {
    setEditingStudentId(null);
    setStudentFormData(initialStudentData);
    setIsStudentModalOpen(true);
  };

  const handleOpenEditModal = (student: Student) => {
    setEditingStudentId(student.id);
    setStudentFormData({
      name: student.name,
      class: student.class,
      rollNo: student.rollNo,
      guardian: student.guardian,
      status: student.status,
      fees: student.fees,
      dob: student.dob || '',
      gender: student.gender || 'Male',
      phone: student.phone || '',
      email: student.email || '',
      address: student.address || ''
    });
    setIsStudentModalOpen(true);
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentFormData.name || !studentFormData.rollNo) return;

    if (editingStudentId) {
      // Update existing student
      setStudents(students.map(s => 
        s.id === editingStudentId 
          ? { ...s, ...studentFormData } as Student 
          : s
      ));
    } else {
      // Add new student
      const newStudent: Student = {
        id: (students.length + 1).toString(),
        name: studentFormData.name!,
        class: studentFormData.class || 'X-A',
        rollNo: studentFormData.rollNo!,
        guardian: studentFormData.guardian || 'N/A',
        status: (studentFormData.status as 'Present' | 'Absent') || 'Present',
        fees: (studentFormData.fees as 'Paid' | 'Pending') || 'Pending',
        dob: studentFormData.dob,
        gender: studentFormData.gender as 'Male' | 'Female' | 'Other',
        phone: studentFormData.phone,
        email: studentFormData.email,
        address: studentFormData.address
      };
      setStudents([...students, newStudent]);
    }

    setIsStudentModalOpen(false);
    setStudentFormData(initialStudentData);
    setEditingStudentId(null);
  };

  const stats = MOCK_STATS[user.role] || MOCK_STATS[UserRole.ADMIN];

  const renderContent = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
              <p className="text-gray-500">Welcome back, {user.name.split(' ')[0]}. Here is your daily summary.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className={`p-6 rounded-xl shadow-sm border border-gray-100 ${stat.color} transition-transform hover:scale-105 duration-200`}>
                  <div className="flex flex-col h-full justify-between">
                    <p className="font-medium text-lg opacity-80">{stat.title}</p>
                    <p className="text-4xl font-bold mt-4">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Notices Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  Notice Board
                </h3>
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View All Notices</button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {MOCK_NOTICES.map((notice) => (
                  <div key={notice.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-emerald-200 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                       <span className={`px-2 py-1 text-xs font-semibold rounded ${
                         notice.type === 'Holiday' ? 'bg-red-100 text-red-700' :
                         notice.type === 'Event' ? 'bg-purple-100 text-purple-700' :
                         notice.type === 'Academic' ? 'bg-blue-100 text-blue-700' :
                         'bg-gray-200 text-gray-700'
                       }`}>
                         {notice.type}
                       </span>
                       <span className="text-xs text-gray-500 font-medium">{notice.date}</span>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">{notice.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{notice.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'STUDENTS':
        // Filter logic: If student, only show classmates. Else show all.
        const visibleStudents = user.role === UserRole.STUDENT 
            ? students.filter(s => s.class === user.class)
            : students;

        return (
          <div className="space-y-6">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Student Directory</h2>
                <p className="text-gray-500">
                  {user.role === UserRole.STUDENT 
                    ? `Classmates of ${user.class}` 
                    : "Manage student records and performance."}
                </p>
              </div>
              
              {/* Only Admin can add students */}
              {user.role === UserRole.ADMIN && (
                <button 
                  onClick={handleOpenAddModal}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm shadow-emerald-200"
                >
                  <Plus size={18} />
                  Add New Student
                </button>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Roll No</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Class</th>
                      {/* Hide sensitive columns for students */}
                      {user.role !== UserRole.STUDENT && (
                        <>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Guardian</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fees</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        </>
                      )}
                      {user.role === UserRole.ADMIN && (
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {visibleStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs mr-3 border-2 border-white shadow-sm">
                              {student.name.charAt(0)}
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                {student.email && <div className="text-xs text-gray-400">{student.email}</div>}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{student.rollNo}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-semibold">
                                {student.class}
                            </span>
                        </td>
                        
                        {/* Hide sensitive columns for students */}
                        {user.role !== UserRole.STUDENT && (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div>{student.guardian}</div>
                                {student.phone && <div className="text-xs text-gray-400">{student.phone}</div>}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                               <span className={`flex w-fit items-center text-xs font-medium px-2.5 py-1 rounded-full ${student.fees === 'Paid' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                                  {student.fees === 'Paid' ? 'Paid' : <span className="flex items-center gap-1">Pending <IndianRupee size={10}/></span>}
                               </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${student.status === 'Present' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${student.status === 'Present' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                {student.status}
                              </span>
                            </td>
                          </>
                        )}

                        {user.role === UserRole.ADMIN && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => handleOpenEditModal(student)}
                                className="text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center gap-1"
                                title="Edit Student"
                              >
                                <Pencil size={16} /> Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteStudent(student.id)}
                                className="text-red-500 hover:text-red-700 transition-colors font-medium flex items-center gap-1"
                                title="Delete Student"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'TEACHERS':
        // Logic: Admin/Teacher sees all. Student sees only teachers for their class courses.
        let visibleTeachers = MOCK_TEACHERS;
        
        if (user.role === UserRole.STUDENT && user.class) {
            // Find courses for this student's class
             const classLevel = user.class.split('-')[0];
             const relevantTeacherNames = MOCK_COURSES
                .filter(c => c.class.includes(classLevel)) 
                .map(c => c.teacher);
            visibleTeachers = MOCK_TEACHERS.filter(t => relevantTeacherNames.includes(t.name));
        }

        return (
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Faculty Members</h2>
                    <p className="text-gray-500">
                        {user.role === UserRole.STUDENT 
                          ? "Your Subject Teachers" 
                          : "View and manage teaching staff details."}
                    </p>
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleTeachers.map((teacher) => (
                        <div key={teacher.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                                    {teacher.name.split(' ')[1]?.charAt(0) || teacher.name.charAt(0)}
                                </div>
                                <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                    {teacher.subject}
                                </span>
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg">{teacher.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">Joined {teacher.joinDate}</p>
                            
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Mail size={16} className="text-gray-400" />
                                    <span className="truncate">{teacher.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Phone size={16} className="text-gray-400" />
                                    <span>{teacher.phone}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {visibleTeachers.length === 0 && (
                        <div className="col-span-full text-center py-8 text-gray-500">
                            No teachers found for your specific class.
                        </div>
                    )}
                </div>
            </div>
        );
      case 'COURSES':
        // Logic: Admin sees all. Teacher sees only theirs.
        let visibleCourses = MOCK_COURSES;
        
        if (user.role === UserRole.TEACHER) {
            visibleCourses = MOCK_COURSES.filter(c => c.teacher === user.name);
        } else if (user.role === UserRole.STUDENT && user.class) {
             const classLevel = user.class.split('-')[0];
             visibleCourses = MOCK_COURSES.filter(c => c.class.includes(classLevel));
        }

        return (
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Academic Schedule</h2>
                    <p className="text-gray-500">
                        {user.role === UserRole.TEACHER 
                         ? "Your Schedule for the week" 
                         : "Current classes and course details."}
                    </p>
                </div>
                </div>

                <div className="space-y-4">
                    {visibleCourses.map((course) => (
                        <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-l-4 hover:border-l-emerald-500 transition-all">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-gray-800 text-lg">{course.title}</h3>
                                    <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100 font-medium">
                                        {course.class}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <UserCircle size={14} />
                                    {course.teacher}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                                    <Clock size={16} className="text-emerald-600" />
                                    <span>{course.timing}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                                    <Calendar size={16} className="text-blue-600" />
                                    <span>{course.days}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {visibleCourses.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No classes scheduled.
                        </div>
                    )}
                </div>
            </div>
        );
      case 'PROFILE':
        return (
          <div className="flex flex-col items-center justify-center h-96">
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-gray-500">
                  {user.name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-emerald-600 font-medium mb-6">{user.role}</p>
                
                <div className="space-y-4 text-left">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Username</span>
                    <span className="font-medium">{user.username}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                  {user.class && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Class</span>
                        <span className="font-medium">{user.class}</span>
                      </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">School Code</span>
                    <span className="font-medium">KV-DEWAS-001</span>
                  </div>
                </div>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  const NavItem = ({ view, icon: Icon, label }: { view: ViewState; icon: any; label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setSidebarOpen(false); // Close sidebar on mobile on click
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
        currentView === view
          ? 'bg-[#15803d] text-white shadow-md' // Active state: Strong green
          : 'text-gray-300 hover:bg-[#064e3b] hover:text-white' // Inactive: Transparent with hover
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex font-sans">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Add/Edit Student Modal */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                 <h3 className="text-xl font-bold text-gray-800">
                   {editingStudentId ? 'Edit Student Details' : 'New Student Registration'}
                 </h3>
                 <p className="text-xs text-gray-500 mt-1">
                   {editingStudentId ? 'Update the student information below.' : 'Fill in the details to create a new student record.'}
                 </p>
              </div>
              <button 
                onClick={() => setIsStudentModalOpen(false)}
                className="p-2 bg-white rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors shadow-sm border border-gray-200"
              >
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSaveStudent} className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
              
              {/* Section 1: Academic Info */}
              <div className="mb-8">
                 <div className="flex items-center gap-2 mb-4">
                    <span className="p-1.5 bg-indigo-100 text-indigo-600 rounded-md"><BookOpen size={16}/></span>
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Academic Information</h4>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Assigned Class <span className="text-red-500">*</span></label>
                      <select 
                        value={studentFormData.class}
                        required
                        onChange={(e) => setStudentFormData({...studentFormData, class: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none text-sm bg-white transition-all"
                      >
                        <option value="">Select Class</option>
                        <option value="X-A">Class X-A</option>
                        <option value="X-B">Class X-B</option>
                        <option value="IX-A">Class IX-A</option>
                        <option value="IX-B">Class IX-B</option>
                        <option value="XII-A">Class XII-A</option>
                        <option value="XII-B">Class XII-B</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Roll Number <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        required
                        value={studentFormData.rollNo}
                        onChange={(e) => setStudentFormData({...studentFormData, rollNo: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none text-sm transition-all"
                        placeholder="e.g. 101"
                      />
                    </div>
                 </div>
              </div>

              {/* Section 2: Personal Details */}
              <div className="mb-8">
                 <div className="flex items-center gap-2 mb-4">
                    <span className="p-1.5 bg-emerald-100 text-emerald-600 rounded-md"><UserCircle size={16}/></span>
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Personal Details</h4>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div className="col-span-full md:col-span-1 space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Full Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        required
                        value={studentFormData.name}
                        onChange={(e) => setStudentFormData({...studentFormData, name: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none text-sm transition-all"
                        placeholder="Enter full legal name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Gender</label>
                       <select 
                        value={studentFormData.gender}
                        onChange={(e) => setStudentFormData({...studentFormData, gender: e.target.value as 'Male' | 'Female' | 'Other'})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none text-sm bg-white transition-all"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Date of Birth</label>
                      <input 
                        type="date" 
                        value={studentFormData.dob}
                        onChange={(e) => setStudentFormData({...studentFormData, dob: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none text-sm text-gray-600 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Contact Number</label>
                      <input 
                        type="tel" 
                        value={studentFormData.phone}
                        onChange={(e) => setStudentFormData({...studentFormData, phone: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none text-sm transition-all"
                        placeholder="+91 98765 00000"
                      />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 gap-5">
                     <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Email Address</label>
                      <input 
                        type="email" 
                        value={studentFormData.email}
                        onChange={(e) => setStudentFormData({...studentFormData, email: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none text-sm transition-all"
                        placeholder="student@example.com"
                      />
                    </div>
                 </div>
              </div>

               {/* Section 3: Guardian Info */}
               <div className="mb-2">
                 <div className="flex items-center gap-2 mb-4">
                    <span className="p-1.5 bg-amber-100 text-amber-600 rounded-md"><Users size={16}/></span>
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Guardian & Fees</h4>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                     <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Guardian Name</label>
                        <input 
                            type="text" 
                            value={studentFormData.guardian}
                            onChange={(e) => setStudentFormData({...studentFormData, guardian: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none text-sm transition-all"
                            placeholder="Parent/Guardian"
                        />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Fees Status</label>
                        <select 
                            value={studentFormData.fees}
                            onChange={(e) => setStudentFormData({...studentFormData, fees: e.target.value as 'Paid' | 'Pending'})}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none text-sm bg-white transition-all"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                        </select>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 gap-5">
                     <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Residential Address</label>
                        <textarea 
                            rows={3}
                            value={studentFormData.address}
                            onChange={(e) => setStudentFormData({...studentFormData, address: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none text-sm transition-all resize-none"
                            placeholder="Enter full address"
                        />
                     </div>
                 </div>
               </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex gap-3 justify-end">
                <button 
                  type="button"
                  onClick={() => setIsStudentModalOpen(false)}
                  className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-[#0f4c3a] text-white rounded-lg font-medium hover:bg-[#0b3d2e] transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2"
                >
                  <Save size={18} />
                  {editingStudentId ? 'Update Student' : 'Create Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-[#0f4c3a] text-white z-30 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } flex flex-col`}
      >
        <div className="p-6 border-b border-[#1e5f4b]">
          <h1 className="text-xl font-bold leading-tight">{APP_NAME}</h1>
          <p className="text-xs text-gray-300 mt-1 opacity-80">{SCHOOL_NAME}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem view="DASHBOARD" icon={LayoutDashboard} label="Dashboard" />
          <NavItem view="STUDENTS" icon={Users} label="Students" />
          <NavItem view="TEACHERS" icon={GraduationCap} label="Faculty" />
          <NavItem view="COURSES" icon={BookOpen} label="Classes" />
          <NavItem view="PROFILE" icon={UserCircle} label="My Profile" />
        </nav>

        <div className="p-4 border-t border-[#1e5f4b]">
           <div className="flex items-center gap-3 mb-4 px-4">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">{user.role}</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-[#0f4c3a] lg:bg-white text-white lg:text-gray-800 shadow-sm flex items-center justify-between px-4 lg:px-8 z-10 shrink-0">
          <div className="flex items-center gap-4">
             <button onClick={toggleSidebar} className="lg:hidden p-1 hover:bg-white/10 rounded">
                <Menu size={24} />
             </button>
             <h2 className="text-lg font-semibold lg:hidden">Dashboard</h2>
             {/* Desktop Search */}
             <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
                <Search size={18} className="text-gray-400 mr-2" />
                <input type="text" placeholder="Search students, notices..." className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400" />
             </div>
          </div>

          <div className="flex items-center gap-4">
             {/* Bell Icon Removed as per request */}
             
             <div className="hidden lg:flex flex-col items-end mr-2">
                <span className="text-sm font-bold text-gray-800">{user.username}</span>
                <span className="text-xs text-gray-500">{user.email}</span>
             </div>
             
             <button 
                onClick={onLogout}
                className="bg-[#0f4c3a] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#093528] transition-colors"
             >
                Logout
             </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">
           <div className="max-w-7xl mx-auto">
              {renderContent()}
           </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;