import { Request, get, put } from "superagent";

const prefix = `/api/v1/posts`;

export const Posts = {
  index: (): Request => get(prefix),
  current: (): Request => get(`${prefix}/current`),
  single: (id: string): Request => get(`${prefix}/${id}`),
  put: (id: string): Request => put(`${prefix}/${id}`),
};
