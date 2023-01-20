import { post } from "superagent";

export type LogoutResponse = {
  success: boolean;
};

export const logout = async (): Promise<LogoutResponse> => {
  const result = await post("/api/v1/logout")
    .ok((res) => res.status === 200 || res.status === 400)
    .send();

  if (result.status === 200) {
    return { success: true };
  } else {
    return { success: false };
  }
};
