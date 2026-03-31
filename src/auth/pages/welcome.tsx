import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Crown, Shield, Users, Briefcase, BarChart3,
  ArrowRight, Sparkles, Heart, Star, Award
} from 'lucide-react';

type UserRole = 'super-admin' | 'admin' | 'manager' | 'employee' | 'management';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [pressedRole, setPressedRole] = useState<UserRole | null>(null);

  const roles = [
    { id: 'super-admin', label: 'Super Admin', icon: Crown },
    { id: 'admin', label: 'Admin', icon: Shield },
    { id: 'manager', label: 'Manager', icon: Users },
    { id: 'employee', label: 'Employee', icon: Briefcase },
    { id: 'management', label: 'Management', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      
      <div className="max-w-6xl w-full">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="relative w-20 h-20">
              {/* Background Shape */}
              <div className="absolute inset-0 bg-purple-100 rotate-45 rounded-3xl" />
              
              {/* Main Logo */}
              <div className="absolute inset-2 bg-white rotate-45 rounded-2xl shadow-lg flex items-center justify-center transform hover:rotate-90 transition-all duration-500">
                <div className="-rotate-45">
                  <span className="text-2xl font-bold text-purple-700">VT</span>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-600 mb-2">
            welcome to
          </h1>
          <h2 className="text-5xl md:text-6xl font-bold text-purple-700">
            VisitTracker
          </h2>
        </div>

        {/* Neomorphic Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
          {roles.map((role) => {
            const Icon = role.icon;
            const isPressed = pressedRole === role.id;
            
            return (
              <button
                key={role.id}
                onClick={() => navigate(`/login?role=${role.id}`)} // Fixed: added backticks
                onMouseEnter={() => setPressedRole(role.id as UserRole)}
                onMouseLeave={() => setPressedRole(null)}
                className="group"
              >
                <div className={`
                  p-6 bg-gray-100 rounded-2xl
                  transition-all duration-200
                  ${isPressed 
                    ? 'shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.8),inset_5px_5px_10px_rgba(0,0,0,0.1)]' 
                    : 'shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(0,0,0,0.1)] hover:shadow-[-8px_-8px_12px_rgba(255,255,255,0.9),8px_8px_12px_rgba(0,0,0,0.1)]'}
                `}>
                  
                  {/* Icon */}
                  <div className={`
                    w-14 h-14 rounded-xl mb-4 flex items-center justify-center mx-auto
                    bg-purple-600 transition-all duration-200
                    ${isPressed 
                      ? 'shadow-[inset_-3px_-3px_5px_rgba(255,255,255,0.8),inset_3px_3px_5px_rgba(0,0,0,0.05)]' 
                      : 'shadow-[-3px_-3px_5px_rgba(255,255,255,0.8),3px_3px_5px_rgba(0,0,0,0.05)]'}
                  `}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Label */}
                  <h3 className="text-sm font-medium text-purple-600 text-center">
                    {role.label}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-semibold text-purple-700">1.2k</div>
            <div className="text-xs text-gray-500">active users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-purple-700">99.9%</div>
            <div className="text-xs text-gray-500">uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-purple-700">24/7</div>
            <div className="text-xs text-gray-500">support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;