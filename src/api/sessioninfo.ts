import { authenticatedUserSchema, Session } from "./contract";
import { LoginResponse } from "./login";

export type SessionInfoResponse = LoginResponse;

export const sessionInfo = async (): Promise<SessionInfoResponse> => {
  const response = await Session.info()
    .ok((res) => res.status === 200 || res.status === 401)
    .send();

  if (response.status === 200) {
    const result = authenticatedUserSchema.parse(response.body);
    return { authenticated: true, ...result };
  } else {
    return { authenticated: false };
  }
};
