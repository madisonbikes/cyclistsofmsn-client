import { Session } from "./contract";

export type LogoutResponse = {
  success: boolean;
};

export const logout = async (): Promise<LogoutResponse> => {
  const response = await Session.logout()
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
