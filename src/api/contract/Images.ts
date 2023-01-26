import { Request, get, put } from "superagent";
const prefix = `/api/v1/images`;

export const Images = {
  index: (): Request => get(prefix),
  metadata: (id: string): Request => get(`${prefix}/${id}`),
  binary: (id: string): Request => get(`${prefix}/${id}/binary`),
  put: (id: string): Request => put(`${prefix}/${id}`),
};
