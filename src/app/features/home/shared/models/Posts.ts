export interface UserPost {
  id: number;
  name: string;
  image: string;
}

export interface PostResponse {
  id: number;
  image: string;
  description: string;
  likes: number | null;
  created_at: string;
  updated_at: string;
  user_id: number;
  comments: any[];
  user: UserPost;
}

export interface PostRequest {
  post: {
    image: string;
    description: string;
    user_id: number;
  }
}
