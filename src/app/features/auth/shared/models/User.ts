export interface UserResponse {
  id: number;
  email: string;
  name: string;
  last_name: string;
  image: string;
  username: string;
  followees: [],
  followers: []
}

export interface UserRequest {
  user: UserResponse
}

export interface Followers {
  id: number,
  email: string,
  name: string
}

export interface UserPaginationResponse {
  users: UserResponse[],
  meta:Pagination
}

export interface Pagination  {
  total_pages: number,
  current_page: number,
  total_count: number
}
