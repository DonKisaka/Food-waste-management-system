// Action Response Type for Server Actions
export type ActionResponse =  {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
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
  email: string;
}

// Signin Request
export interface SignIn {
  email: string;
  password: string;
}

// Signup Request
export interface Signup {
  email: string;
  password: string;
  confirmPassword: string;
}

