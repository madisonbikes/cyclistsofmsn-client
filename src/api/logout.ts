import { post } from "superagent";

export type LogoutResponse = {
  success: boolean;
};

export const logout = async (): Promise<LogoutResponse> => {
  const response = await post("/api/v1/logout")
    .ok((res) => res.status === 200 || res.status === 400)
    .send();

  if (response.status === 200) {
    console.log(`logout response: ${response.text}`);
    return { success: true };
  } else {
    console.log(`logout response: ${response.text}`);
    return { success: false };
  }
};
