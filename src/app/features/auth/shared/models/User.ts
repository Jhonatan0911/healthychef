export interface UserResponse {
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


export interface UserRequest {
  user: UserResponse
}
