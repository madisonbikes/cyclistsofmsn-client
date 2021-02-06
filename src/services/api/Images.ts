import { get } from '../../config/api';
import { AxiosResponse } from "axios";

export const Images = {
  index: (): Promise<AxiosResponse> =>
    get('/images'),
  single: (id: string): Promise<AxiosResponse> =>
    get(`/images/${id}`)
}