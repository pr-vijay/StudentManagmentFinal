import React, { useState } from 'react';
import { UserRole } from '../types';
import { APP_NAME, SCHOOL_NAME } from '../constants';
import { CheckCircle2 } from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole, username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.ADMIN);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole, username);
  };

  const RoleButton = ({ role, label }: { role: UserRole; label: string }) => (
    <button
      type="button"
      onClick={() => setSelectedRole(role)}
      className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${
        selectedRole === role
          ? 'bg-[#0f4c3a] text-white shadow-md'
          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#fcfdf8] relative overflow-hidden">
        {/* Background blobs for style */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-100/50 rounded-full blur-3xl -z-10" />

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl flex min-h-[600px] border border-gray-100">
        
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-[#0f4c3a]" />
                <h1 className="text-xl font-bold text-gray-900">{APP_NAME}</h1>
            </div>
            <p className="text-sm text-gray-400">Welcome to {SCHOOL_NAME}</p>
          </div>

          <div className="mb-8">
            <p className="text-gray-600 mb-4 text-sm">Please log in to your <span className="bg-gray-100 text-gray-900 px-2 py-0.5 rounded font-medium">account</span>.</p>
            
            <div className="flex gap-2 mb-6 bg-white p-1">
              <RoleButton role={UserRole.ADMIN} label="ADMIN" />
              <RoleButton role={UserRole.TEACHER} label="TEACHER" />
              <RoleButton role={UserRole.STUDENT} label="STUDENT" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-900 border border-gray-200 focus:ring-2 focus:ring-[#0f4c3a] focus:bg-white outline-none transition-all placeholder-gray-400"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-900 border border-gray-200 focus:ring-2 focus:ring-[#0f4c3a] focus:bg-white outline-none transition-all placeholder-gray-400"
                  placeholder="Enter password"
                />
              </div>

              <div className="flex items-center gap-2 mt-2">
                  <div className="w-3 h-3 border border-gray-300 rounded-sm" />
                  <span className="text-xs text-gray-500">Keep me logged in</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0f4c3a] hover:bg-[#0b3d2e] text-white font-bold py-3 rounded-lg mt-6 shadow-lg shadow-emerald-900/20 transition-all active:scale-[0.98]"
              >
                Login
              </button>
            </form>
            
            <p className="text-xs text-gray-400 mt-4 text-center">
                By logging in you accept our terms and school policies.
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block w-1/2 relative">
          <img 

            src="/assets/Gemini_Generated_Image_qnwfjbqnwfjbqnwf.png" 
            alt="School Campus" 
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          
          <div className="absolute bottom-8 right-8 z-20 flex flex-col items-end">
             <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-gray-100">
                <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#0f4c3a]" />
                    {SCHOOL_NAME}
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;