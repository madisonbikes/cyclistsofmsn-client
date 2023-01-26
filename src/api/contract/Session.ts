import { Request, post, get } from "superagent";

export const Session = {
  login: (): Request => post(`/api/v1/login`),
  logout: (): Request => post(`/api/v1/logout`),
  info: (): Request => get(`/api/v1/sessioninfo`),
};
