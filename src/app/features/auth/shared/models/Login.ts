export interface LoginRequest {
  user: {
    email: string;
    password: string;
  }
}

export interface LoginResponse {
  id: number;
  email: string;
  name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
  jti: string;
  image: string;
  username: string;
  following_users: [],
  followed_users: []
}
