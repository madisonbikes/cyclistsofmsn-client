import { Posts } from "./services/api/Posts";

export type ImageData = {
  id: string;
  filename: string;
};

export type PostData = {
  id: string;
  timestamp: string;
  image: string;
};

export const loadPostList = async (): Promise<PostData[]> => {
  const response = await Posts.index();
  return response.data;
};

export const loadCurrentPost = async (): Promise<PostData> => {
  const response = await Posts.current();
  return response.data;
};
