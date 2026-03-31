import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Briefcase,
  Crown,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Shield,
  Users,
} from 'lucide-react';
import authService from '../services/auth.service';

type UserRole = 'super-admin' | 'admin' | 'manager' | 'employee' | 'management';

const roleOptions = [
  { id: 1, key: 'super-admin' as UserRole, label: 'Super Admin', icon: Crown },
  { id: 2, key: 'admin' as UserRole, label: 'Admin', icon: Shield },
  { id: 3, key: 'manager' as UserRole, label: 'Manager', icon: Users },
  { id: 4, key: 'employee' as UserRole, label: 'Employee', icon: Briefcase },
  { id: 5, key: 'management' as UserRole, label: 'Management', icon: BarChart3 },
];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleFromUrl = (searchParams.get('role') as UserRole) || 'super-admin';

  const [selectedRole, setSelectedRole] = useState<UserRole>(roleFromUrl);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    roleId: '',
  });

  useEffect(() => {
    const matchedRole = roleOptions.find((role) => role.key === roleFromUrl) ?? roleOptions[0];
    setSelectedRole(matchedRole.key);
    setFormData((prev) => ({
      ...prev,
      roleId: String(matchedRole.id),
    }));
  }, [roleFromUrl]);

  const currentRole = roleOptions.find((role) => role.key === selectedRole) ?? roleOptions[0];
  const CurrentRoleIcon = currentRole.icon;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrorMessage('');
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextRoleId = e.target.value;
    const matchedRole = roleOptions.find((role) => String(role.id) === nextRoleId);

    setFormData((prev) => ({
      ...prev,
      roleId: nextRoleId,
    }));

    if (matchedRole) {
      setSelectedRole(matchedRole.key);
    }

    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.roleId || isNaN(Number(formData.roleId))) {
      setErrorMessage('Please select a valid role');
      return;
    }

    setIsLoading(true);

    authService
      .login({ email: formData.email, password: formData.password })
      .then((response) => {
        const token = response?.data?.token;

        if (!token) {
          setErrorMessage('No token received');
          setIsLoading(false);
          return;
        }

        const base64Payload = token.split('.')[1];
        let decodedPayload: any = {};

        try {
          decodedPayload = JSON.parse(atob(base64Payload));
        } catch (decodeError) {
          console.error('JWT decode failed:', decodeError);
        }

        const roleFromToken =
          decodedPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
          decodedPayload.role ||
          '';

        const formattedRole = roleFromToken.toLowerCase().replace(/\s+/g, '-');

        localStorage.setItem('auth', token);
        localStorage.setItem('role', formattedRole);

        const roleRoutes: Record<string, string> = {
          'super-admin': '/super-admin/dashboard',
          admin: '/admin/dashboard',
          manager: '/manager/dashboard',
          employee: '/employee/dashboard',
          management: '/management/dashboard',
        };

        navigate(roleRoutes[formattedRole] || '/super-admin/dashboard');
        setIsLoading(false);
      })
      .catch((error) => {
        const apiMessage = error.response?.data?.message || error.response?.data?.error;
        const status = error.response?.status;

        let nextErrorMessage = 'Login failed. ';

        if (error.message === 'Network Error' || error.code === 'ECONNABORTED') {
          nextErrorMessage +=
            'Cannot connect to server. Please check if the backend server is running on http://localhost: or the configured VITE_API_URL.';
        } else if (
          error.code === 'CERT_HAS_EXPIRED' ||
          error.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE'
        ) {
          nextErrorMessage += 'SSL certificate error. This is a development environment issue.';
        } else if (apiMessage) {
          nextErrorMessage = `Login failed (${status}): ${apiMessage}`;
        } else if (error.response?.status === 0) {
          nextErrorMessage += 'Network error - please check backend server connection.';
        } else {
          nextErrorMessage += error.message || 'Please check your credentials and try again.';
        }

        setErrorMessage(nextErrorMessage);
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-purple-100 shadow-sm">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="flex items-center gap-2">
              <CurrentRoleIcon className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-600">Employee Login</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Employee Login</h1>
                <p className="text-purple-100 text-sm">
                  Sign in with your registered credentials to access the dashboard
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8 flex items-center gap-6 border-b border-gray-200">
              <button
                type="button"
                className="py-3 px-1 border-b-2 border-purple-600 text-purple-600 font-medium text-sm"
              >
                Login Details
              </button>
              <button
                type="button"
                disabled
                className="py-3 px-1 border-b-2 border-transparent text-gray-400 font-medium text-sm"
              >
                Review Access
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-2xl border border-purple-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">Account Information</h2>
                    <p className="text-sm text-gray-500">Enter your login details below</p>
                  </div>
                </div>

                {errorMessage && (
                  <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="roleId"
                      value={formData.roleId}
                      onChange={handleRoleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Select role</option>
                      {roleOptions.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-end">
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      Remember me
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-100">
                  <p className="text-xs font-medium text-purple-600 uppercase tracking-wide">Role</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">{currentRole.label}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-100">
                  <p className="text-xs font-medium text-purple-600 uppercase tracking-wide">Email</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">{formData.email || 'Not entered'}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-100">
                  <p className="text-xs font-medium text-purple-600 uppercase tracking-wide">Access</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">Dashboard Login</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm">
                  <Link
                    to="/forgot-password"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-600 hover:text-purple-700 font-medium"
                  >
                    Register now
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium inline-flex items-center gap-2 ${
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
          </div>
        </div>

        <p className="text-center mt-6 text-gray-600">
          Need a new account?{' '}
          <Link to="/register" className="font-medium text-purple-600 hover:text-purple-700 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
