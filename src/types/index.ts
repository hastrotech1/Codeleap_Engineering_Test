export interface Post {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

export interface CreatePostPayload {
  username: string;
  title: string;
  content: string;
}

export interface UpdatePostPayload {
  title: string;
  content: string;
}
