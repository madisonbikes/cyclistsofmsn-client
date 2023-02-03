import { Request, get, put, del } from "superagent";
import { GetImageQuery } from ".";

const prefix = `/api/v1/images`;

export const Images = {
  index: (): Request => get(prefix),
  metadata: (id: string): Request => get(`${prefix}/${id}`),

  binaryUri: (id: string, { height, width }: GetImageQuery = {}): string => {
    const qp = new URLSearchParams();
    let paramSupplied = false;
    if (height) {
      qp.append("height", String(height));
      paramSupplied = true;
    }
    if (width) {
      qp.append("width", String(width));
      paramSupplied = true;
    }
    const query = paramSupplied ? `?${qp.toString()}` : "";
    return `${prefix}/${id}/binary${query}`;
  },

  binary: (id: string, params?: GetImageQuery): Request =>
    get(Images.binaryUri(id, params)),

  put: (id: string): Request => put(`${prefix}/${id}`),

  delete: (id: string): Request => del(`${prefix}/${id}`),
};
