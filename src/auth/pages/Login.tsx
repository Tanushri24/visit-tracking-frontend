import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  LogIn,
} from 'lucide-react';
import authService from '../services/auth.service';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const normalizeUserRole = (role: string) => {
    const normalizedRole = role.toLowerCase().replace(/[\s_]+/g, '-');

    const roleAliases: Record<string, string> = {
      'super-admin': 'super-admin',
      superadmin: 'super-admin',
      admin: 'admin',
      manager: 'manager',
      'team-lead': 'manager',
      teamlead: 'manager',
      employee: 'employee',
      management: 'management',
      'master-management': 'management',
      mastermanagement: 'management',
      hr: 'admin',
    };

    return roleAliases[normalizedRole] || normalizedRole;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setErrorMessage('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting login with:', { email: formData.email });
      
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      console.log('Login response:', response);
      
      const token = response.token;

      if (!token) {
        setErrorMessage('You are not registered. Please contact admin.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('auth', token);
      localStorage.setItem('authToken', token);
      
      let userRole = '';
      try {
        const base64Payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(base64Payload));
        console.log('Decoded JWT payload:', decodedPayload);
        
        userRole = 
          decodedPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
          decodedPayload.role ||
          decodedPayload.Role ||
          decodedPayload.userRole ||
          decodedPayload.UserRole ||
          '';
        
        if (!userRole) {
          console.warn('Role not found in token');
          setErrorMessage('You are not registered. Please contact admin.');
          setIsLoading(false);
          return;
        }
        
        userRole = normalizeUserRole(userRole);
        console.log('Final user role:', userRole);
        
      } catch (decodeError) {
        console.error('Failed to decode JWT token:', decodeError);
        setErrorMessage('You are not registered. Please contact admin.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('role', userRole);
      
      if (formData.rememberMe) {
        localStorage.setItem('userEmail', formData.email);
      }

      const roleRoutes: Record<string, string> = {
        'super-admin': '/super-admin/dashboard',
        'superadmin': '/super-admin/dashboard',
        'admin': '/admin/dashboard',
        'manager': '/manager/dashboard',
        'employee': '/employee/dashboard',
        'management': '/management/dashboard',
      };

      let redirectPath = roleRoutes[userRole];
      
      if (!redirectPath) {
        console.warn('No route found for role:', userRole);
        setErrorMessage('You are not registered. Please contact admin.');
        setIsLoading(false);
        return;
      }
      
      console.log('Redirecting to:', redirectPath);
      navigate(redirectPath, { replace: true });
      
    } catch (error: any) {
      console.error('Login error details:', error);
      
      if (error.response?.status === 401) {
        setErrorMessage('You are not registered. Please contact admin.');
      } else if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        setErrorMessage('Cannot connect to server. Please check your connection.');
      } else if (error.response) {
        const status = error.response.status;
        const apiMessage = error.response.data?.message || error.response.data?.error;
        
        switch (status) {
          case 401:
            setErrorMessage('You are not registered. Please contact admin.');
            break;
          case 400:
            setErrorMessage(apiMessage || 'Invalid request. Please check your input.');
            break;
          case 404:
            setErrorMessage('Login endpoint not found.');
            break;
          case 500:
            setErrorMessage('Server error. Please try again later.');
            break;
          default:
            setErrorMessage('You are not registered. Please contact admin.');
        }
      } else if (error.request) {
        setErrorMessage('No response from server. Please try again.');
      } else {
        setErrorMessage('You are not registered. Please contact admin.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-6 px-4">
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-indigo-600 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Compact Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <LogIn className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Visit Tracking System</h1>
                <p className="text-indigo-100 text-xs">Sign in to continue</p>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* Error Message */}
                {errorMessage && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full pl-9 pr-9 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-3.5 h-3.5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    Remember me
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium text-sm inline-flex items-center justify-center gap-2 shadow-md ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Register Link */}
            <div className="mt-5 pt-4 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">
                Don't have an account?{' '}
                <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Contact Admin
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
