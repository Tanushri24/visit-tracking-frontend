import axios from 'axios';

// Use relative path with proxy or direct URL
const API_URL = import.meta.env.VITE_API_URL || 'http://192.168.29.8:8080/api/Auth';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  isFirstLogin: boolean;
  forcePasswordChange: any;
  token: string;
  message?: string;
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('Sending login request to:', `${API_URL}/login`);
      
      const response = await axios.post<LoginResponse>(
        `${API_URL}/login`,
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10 second timeout
        }
      );
      
      console.log('Login API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  }

  async changePassword(data: ChangePasswordRequest): Promise<any> {
    try {
      const token = this.getToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      console.log('Sending change password request to:', `${API_URL}/change-password`);
      
      const response = await axios.post(
        `${API_URL}/change-password`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );
      
      console.log('Change password response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Change password API error:', error);
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('user');
    localStorage.removeItem('firstLogin'); // Clear first login flag
  }

  getToken(): string | null {
    return localStorage.getItem('auth') || localStorage.getItem('authToken');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Optional: Check if token is expired
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      if (exp && Date.now() >= exp * 1000) {
        this.logout();
        return false;
      }
      return true;
    } catch {
      return !!token;
    }
  }
}

export default new AuthService();