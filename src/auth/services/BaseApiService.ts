import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import axios from 'axios';

class BaseApiService {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string = import.meta.env.VITE_API_URL) {
        console.log('BaseApiService baseURL:', baseURL, 'VITE_API_URL:', import.meta.env.VITE_API_URL);
        const instanceConfig: AxiosRequestConfig = {
            baseURL,
            timeout: 15000,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            validateStatus: function (status) {
                return true; // Don't throw on any status code
            }
        };


        this.axiosInstance = axios.create(instanceConfig);
        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        this.axiosInstance.interceptors.request.use((config) => {
            const token = localStorage.getItem('authToken') || localStorage.getItem('auth');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            console.error('Request interceptor error:', error);
            return Promise.reject(error);
        });

        this.axiosInstance.interceptors.response.use(
            (response) => {
                if (response.status === 401) {
                    localStorage.removeItem('auth');
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                    return Promise.reject(new Error('Unauthorized'));
                }
                return response;
            },
            (error) => {
                console.error('API Error Details:', {
                    message: error.message,
                    code: error.code,
                    status: error.response?.status,
                    url: error.config?.url,
                });

                if (error.response?.status === 401) {
                    localStorage.removeItem('auth');
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    }

    get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.get(url, config);
    }

    post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.post(url, data, config);
    }

    put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.put(url, data, config);
    }

    delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.delete(url, config);
    }
}

export default BaseApiService;
