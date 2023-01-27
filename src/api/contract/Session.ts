import { Request, post, get } from "superagent";

export const Session = {
  login: (): Request => post(`/api/v1/session/login`),
  logout: (): Request => post(`/api/v1/session/logout`),
  info: (): Request => get(`/api/v1/session/info`),
};
