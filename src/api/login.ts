import { z } from "zod";
import {
  AuthenticatedUser,
  loginResponseSchema,
  LoginRequest,
  Session,
} from "./contract";

const authenticationResultSchema = z.object({
  authenticated: z.boolean(),
  failureString: z.string().optional(),
});
type AuthenticationResult = z.infer<typeof authenticationResultSchema>;
export type LoginResponse = Partial<AuthenticatedUser> & AuthenticationResult;

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const response = await Session.login()
    .send(request)
    .ok((res) => res.status === 200 || res.status === 401);

  if (response.status === 200) {
    const result = loginResponseSchema.parse(response.body);
    return { authenticated: true, ...result };
  } else {
    return {
      authenticated: false,
      failureString: response.text,
    };
  }
};
