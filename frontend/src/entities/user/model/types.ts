export interface AuthState {
  user: CurrentUser | null
}

export interface AuthRequestDto {
  email: string
  password: string
  token: string
}

export interface AuthResponse {
  accessToken: string
}

export interface CurrentUser {
  id: string
  name: string
  email: string
  created_at: string
}