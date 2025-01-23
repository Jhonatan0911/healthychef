export interface RegisterRequest {
  user: {
    name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
  }
}
