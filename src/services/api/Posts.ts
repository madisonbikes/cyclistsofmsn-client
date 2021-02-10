import { get } from "../../config/api";
import { AxiosResponse } from "axios";

export const Posts = {
  index: (): Promise<AxiosResponse> =>
    get("/posts"),
  current: (): Promise<AxiosResponse> =>
    get(`/posts/current`),
  single: (id: string): Promise<AxiosResponse> =>
    get(`/posts/${id}`)
};