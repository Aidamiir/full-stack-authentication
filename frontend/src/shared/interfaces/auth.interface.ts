export interface Credentials {
  email: string
  password: string
}

export interface AuthState {
  isAuth: boolean
  user: User | null
  accessToken: string | null
}

export interface User {
  id: string
  name: string
  email: string
  created_at: string
}

export interface AuthResponse {
  user: User
  accessToken: string
  expiresIn: string
}