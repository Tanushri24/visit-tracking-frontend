import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Crown, Shield, Users, Briefcase, BarChart3,
  Sparkles, Heart, Star, Award, LogIn
} from 'lucide-react';

type UserRole = 'super-admin' | 'admin' | 'manager' | 'employee' | 'management';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [pressedRole, setPressedRole] = useState<UserRole | null>(null);

  const roles = [
    { id: 'super-admin', label: 'Super Admin', icon: Crown, description: 'Full system access' },
    { id: 'admin', label: 'Admin', icon: Shield, description: 'User & master management' },
    { id: 'manager', label: 'Manager', icon: Users, description: 'Team & visit oversight' },
    { id: 'employee', label: 'Employee', icon: Briefcase, description: 'Daily visit execution' },
    { id: 'management', label: 'Management', icon: BarChart3, description: 'Reports & analytics' }
  ];

  const handleRoleClick = (roleId: UserRole) => {
    // Navigate to login with role parameter
    navigate(`/login?role=${roleId}`);
  };

  const handleGetStarted = () => {
    // Default to employee login
    navigate('/login?role=employee');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slower"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float"></div>
        
        {/* Small decorative elements */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.2
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl w-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="relative w-20 h-20">
              {/* Background Shape */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rotate-45 rounded-3xl" />
              
              {/* Main Logo */}
              <div className="absolute inset-2 bg-white rotate-45 rounded-2xl shadow-lg flex items-center justify-center transform hover:rotate-90 transition-all duration-500">
                <div className="-rotate-45">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    VT
                  </span>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-600 mb-2">
            welcome to
          </h1>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            VisitTracker
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Complete visit tracking solution for organizations. Choose your role to get started.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {roles.map((role) => {
            const Icon = role.icon;
            const isPressed = pressedRole === role.id;
            
            return (
              <button
                key={role.id}
                onClick={() => handleRoleClick(role.id as UserRole)}
                onMouseEnter={() => setPressedRole(role.id as UserRole)}
                onMouseLeave={() => setPressedRole(null)}
                className="group focus:outline-none"
              >
                <div className={`
                  p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100
                  transition-all duration-200 hover:border-purple-300
                  ${isPressed 
                    ? 'shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] scale-95' 
                    : 'shadow-lg hover:shadow-xl shadow-purple-100/50'}
                `}>
                  
                  {/* Icon */}
                  <div className={`
                    w-12 h-12 rounded-lg mb-3 flex items-center justify-center mx-auto
                    bg-gradient-to-r from-purple-600 to-indigo-600
                    transition-all duration-200
                    ${isPressed ? 'scale-90' : 'group-hover:scale-105'}
                  `}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Label */}
                  <h3 className="text-sm font-semibold text-gray-800 text-center">
                    {role.label}
                  </h3>
                  <p className="text-[10px] text-gray-400 text-center mt-1">
                    {role.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Get Started Button */}
        <div className="text-center mb-12">
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:scale-105 active:scale-95 group"
          >
            <span>Get Started</span>
            <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs text-gray-400 mt-3">
            Click any role to login as that user type
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8">
          <div className="text-center bg-white/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-purple-100">
            <div className="text-xl font-semibold text-purple-700">1.2k+</div>
            <div className="text-xs text-gray-500">active users</div>
          </div>
          <div className="text-center bg-white/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-purple-100">
            <div className="text-xl font-semibold text-purple-700">99.9%</div>
            <div className="text-xs text-gray-500">uptime</div>
          </div>
          <div className="text-center bg-white/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-purple-100">
            <div className="text-xl font-semibold text-purple-700">24/7</div>
            <div className="text-xs text-gray-500">support</div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          © 2024 VisitTracker. All rights reserved.
        </p>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-30px, 20px) scale(1.1); }
          66% { transform: translate(20px, -30px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Welcome;