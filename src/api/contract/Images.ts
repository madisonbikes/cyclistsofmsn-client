import { Request, get } from "superagent";

export const Images = {
  index: (): Request => get("/api/v1/images"),
  single: (id: string): Request => get(`/api/v1/images/${id}`),
};
