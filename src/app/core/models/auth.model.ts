export interface AuthResponse {
  token: string;
  type: string;
  username: string;
  roles: string[];
}

export interface User {
  username: string;
  isLoggedIn: boolean;
}