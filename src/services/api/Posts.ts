import { Request, get } from "superagent";

export const Posts = {
  index: (): Request => get("/api/v1/posts"),
  current: (): Request => get("/api/v1/posts/current"),
  single: (id: string): Request => get(`/api/v1/posts/${id}`),
};
