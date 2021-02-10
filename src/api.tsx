import { Images } from "./services/api/Images";
import { Posts } from "./services/api/Posts";

export type ImageData = {
  id: string;
  filename: string;
};

export type PostData = {
  id: string;
  timestamp: string;
  image: string;
}

export async function loadPostList(): Promise<PostData[]> {
  const response = await Posts.index();
  return response.data
}

export async function loadCurrentPost(): Promise<PostData> {
  const response = await Posts.current();
  return response.data;
}
