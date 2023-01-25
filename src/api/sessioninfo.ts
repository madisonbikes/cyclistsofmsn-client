import { get } from "superagent";
import { loginResponseSchema } from "./contract";
import { LoginResponse } from "./login";

export type SessionInfoResponse = LoginResponse;

export const sessionInfo = async (): Promise<SessionInfoResponse> => {
  const response = await get("/api/v1/sessioninfo")
    .ok((res) => res.status === 200 || res.status === 401)
    .send();

  if (response.status === 200) {
    const result = loginResponseSchema.parse(response.body);
    return { authenticated: true, ...result };
  } else {
    return { authenticated: false };
  }
};
