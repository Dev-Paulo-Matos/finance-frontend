export interface AuthResponse {
  token: string;
  type: string;
  username: string;
  roles: string[];
}

export interface User {
  username: string;
  isLoggedIn: boolean;
  id: string,
  name: string,
  email: string,
  password: string,
  phone: string,
  role: string
}