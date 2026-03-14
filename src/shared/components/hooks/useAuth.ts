// Mock hook for UI development
export const useAuth = () => {
  return {
    user: { name: 'John Doe', role: 'employee' },
    loading: false,
    isAuthenticated: true,
    login: async () => {},
    logout: () => {},
  };
};