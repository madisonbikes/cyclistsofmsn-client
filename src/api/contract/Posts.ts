import { Request, del, get, put } from "superagent";

const prefix = `/api/v1/posts`;

export const Posts = {
  index: (): Request => get(prefix),
  current: (): Request =>
    get(`${prefix}/current`).ok((res) => res.status < 500),
  single: (id: string): Request => get(`${prefix}/${id}`),
  put: (id: string): Request => put(`${prefix}/${id}`),
  del: (id: string): Request => del(`${prefix}/${id}`),
};
