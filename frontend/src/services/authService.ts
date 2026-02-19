import api from './api';

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  role?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: string;
  is_active: boolean;
}

class AuthService {
  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data);
    return response.data;
  }

  async login(data: LoginData) {
    const response = await api.post('/auth/login', data);
    const { access_token } = response.data;
    localStorage.setItem('access_token', access_token);
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data;
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
const authService = new AuthService();
export default authService;


