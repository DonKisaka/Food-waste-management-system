// Action Response Type for Server Actions
export type ActionResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: {
    [key: string]: string[];
  };
  error?: string;
};

// Authentication Response from Spring Boot
export interface AuthenticationResponse {
  token: string;
  expiresIn: number;
}

// User Type
export interface User {
  id: number;
  username: string;
  email: string;
}

// Login Request
export interface LoginRequest {
  username: string;
  password: string;
}

// Register Request
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

