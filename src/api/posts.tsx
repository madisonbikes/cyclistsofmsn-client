import { PutPostBody, putPostBodySchema, Posts, postSchema } from "./contract";

export const loadPostList = async () => {
  const response = await Posts.index();
  return postSchema.array().parse(response.body);
};

export const loadCurrentPost = async () => {
  const response = await Posts.current();
  return postSchema.parse(response.body);
};

export const putPostData = async (id: string, postData: PutPostBody) => {
  // parse the data to ensure we don't send a bunch of extra junk
  const parsed = putPostBodySchema.parse(postData);
  const response = await Posts.put(id).send(parsed);
  return postSchema.parse(response.body);
};

export const loadPostInfo = async (id: string) => {
  const response = await Posts.single(id);
  return postSchema.parse(response.body);
};
