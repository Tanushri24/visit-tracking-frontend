import BaseApiService from './BaseApiService';
import type { AxiosResponse } from 'axios';

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    role?: string | null; // Backend currently returns null - TODO: Fix backend to return actual role
    user?: {
        id?: string;
        email?: string;
        fullName?: string;
        role?: string;
        roleId?: number;
    };
    roleId?: number;
    message?: string | null;
    success?: boolean;
}

class AuthService extends BaseApiService {
    constructor() {
        super();
    }

    login(credentials: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
        console.log('AuthService.login - calling login API', credentials);

        // Backend expects LoginDto with Email + Password
        const payload = {
            Email: credentials.email,
            Password: credentials.password,
        };

        return this.post<LoginResponse>('/Auth/login', payload);
    }
}

export default new AuthService();   