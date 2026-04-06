import axios from 'axios';

// Use relative path with proxy or direct URL
const API_URL = import.meta.env.VITE_API_URL || 'http://192.168.29.8:8080/api/Auth';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  message?: string;
  user?: {
    id: string;
    email: string;
    role: string;
  };
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

  logout(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('user');
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
