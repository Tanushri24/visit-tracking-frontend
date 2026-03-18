import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom'; // Added Link
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, 
  ChevronLeft, Shield, Crown, Users, Briefcase, BarChart3
} from 'lucide-react';

type UserRole = 'super-admin' | 'admin' | 'manager' | 'employee' | 'management';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleFromUrl = searchParams.get('role') as UserRole || 'employee';
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(roleFromUrl);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // Update selected role when URL changes
  useEffect(() => {
    if (roleFromUrl) {
      setSelectedRole(roleFromUrl);
    }
  }, [roleFromUrl]);

  // Role-based configurations - All Purple
  const roleConfig = {
    'super-admin': {
      icon: Crown,
      label: 'Super Admin',
      gradient: 'from-purple-600 to-indigo-600',
      light: 'purple-100',
      text: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      shadow: 'shadow-purple-500/30'
    },
    'admin': {
      icon: Shield,
      label: 'Admin',
      gradient: 'from-purple-600 to-indigo-600',
      light: 'purple-100',
      text: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      shadow: 'shadow-purple-500/30'
    },
    'manager': {
      icon: Users,
      label: 'Manager',
      gradient: 'from-purple-600 to-indigo-600',
      light: 'purple-100',
      text: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      shadow: 'shadow-purple-500/30'
    },
    'employee': {
      icon: Briefcase,
      label: 'Employee',
      gradient: 'from-purple-600 to-indigo-600',
      light: 'purple-100',
      text: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      shadow: 'shadow-purple-500/30'
    },
    'management': {
      icon: BarChart3,
      label: 'Management',
      gradient: 'from-purple-600 to-indigo-600',
      light: 'purple-100',
      text: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      shadow: 'shadow-purple-500/30'
    }
  };

  const currentRole = roleConfig[selectedRole];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store auth data with selected role
      const userNames = {
        'super-admin': 'Super Admin',
        'admin': 'Admin User',
        'manager': 'Manager User',
        'employee': 'John Employee',
        'management': 'Management User'
      };

      localStorage.setItem('auth', JSON.stringify({
        isAuthenticated: true,
        userRole: selectedRole,
        user: { 
          name: userNames[selectedRole], 
          email: formData.email, 
          role: selectedRole 
        }
      }));
      
      // Navigate to respective dashboard
      const dashboardPaths = {
        'super-admin': '/super-admin/dashboard',
        'admin': '/admin/dashboard',
        'manager': '/manager/dashboard',
        'employee': '/employee/dashboard',
        'management': '/management/dashboard'
      };
      
      navigate(dashboardPaths[selectedRole]);
      setIsLoading(false);
    }, 1500);
  };

  // Quick role selector (small dots)
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    // Update URL without reload
    navigate(`/login?role=${role}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Floating Orbs */}
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

      {/* Back Button - Left aligned on desktop, centered on mobile */}
      <div className="w-full max-w-sm mb-4 relative z-10 flex justify-center sm:justify-start">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-purple-100 text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back </span>
        </button>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-sm">
        {/* Decorative elements with role color - All Purple */}
        <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${currentRole.gradient} rounded-2xl rotate-12 opacity-20 blur-xl`}></div>
        <div className={`absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-tr ${currentRole.gradient} rounded-2xl -rotate-12 opacity-20 blur-xl`}></div>
        
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-100 p-6 relative">
          {/* Gradient accent based on role - All Purple */}
          <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${currentRole.gradient} rounded-t-2xl`}></div>
          
          {/* Icon with role color - All Purple */}
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${currentRole.gradient} rounded-xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform`}>
              {currentRole.icon && <currentRole.icon className="w-8 h-8 text-white" />}
            </div>
          </div>

          {/* Title with role - All Purple */}
          <h2 className="text-2xl font-light text-center text-gray-800 mb-1">
            Welcome Back
          </h2>
          <p className="text-center mb-3">
            <span className={`inline-block px-3 py-0.5 bg-gradient-to-r ${currentRole.gradient} text-white text-xs font-medium rounded-full shadow-sm`}>
              {currentRole.label}
            </span>
          </p>

          {/* Quick role selector - All Purple */}
          <div className="flex justify-center gap-1.5 mt-1 mb-4">
            {Object.entries(roleConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => handleRoleSelect(key as UserRole)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  selectedRole === key 
                    ? `bg-gradient-to-r ${config.gradient} w-5` 
                    : 'bg-purple-200 hover:bg-purple-400'
                }`}
                title={config.label}
              />
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 ml-1">Email</label>
              <div className="relative group">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-${currentRole.text} group-focus-within:text-${currentRole.text} transition-colors`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-3 py-2 text-sm ${currentRole.bg} border ${currentRole.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-${currentRole.text} focus:border-transparent transition-all`}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 ml-1">Password</label>
              <div className="relative group">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-${currentRole.text} group-focus-within:text-${currentRole.text} transition-colors`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-9 py-2 text-sm ${currentRole.bg} border ${currentRole.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-${currentRole.text} focus:border-transparent transition-all`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 cursor-pointer group">
                <input 
                  type="checkbox" 
                  name="rememberMe"
                  className={`w-3.5 h-3.5 text-${currentRole.text} bg-${currentRole.light} border-${currentRole.border} rounded focus:ring-${currentRole.text}`}
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span className="text-xs text-gray-600 group-hover:text-purple-600 transition-colors">Remember me</span>
              </label>
              <button className={`text-xs ${currentRole.text} hover:${currentRole.text} transition-colors`}>
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r ${currentRole.gradient} text-white py-2.5 rounded-lg text-sm font-medium hover:shadow-lg ${currentRole.shadow} transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden`}
            >
              <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Register Now Link - UPDATED */}
          <p className="text-center text-xs text-gray-500 mt-4">
            Don't have an account?{' '}
            <Link 
              to="#" 
              className={`font-medium ${currentRole.text} hover:${currentRole.text} transition-colors text-xs hover:underline`}
            >
              Register Now
            </Link>
          </p>
        </div>
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

export default Login;