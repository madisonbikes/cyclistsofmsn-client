import { Posts, postSchema } from "./contract";

export const loadPostList = async () => {
  const response = await Posts.index();
  return postSchema.array().parse(response.body);
};

export const loadCurrentPost = async () => {
  const response = await Posts.current();
  return postSchema.parse(response.body);
};
