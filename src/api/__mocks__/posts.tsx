import { Image, Post } from "../contract";

/** mocks that make the tests deterministic */
export const loadImageList = async (): Promise<Image[]> => {
  const data = [
    { id: "1", filename: "filename1" },
    { id: "2", filename: "filename2" },
  ];
  await sleep(250);
  return data;
};

export const loadPostList = (): Promise<Post[]> => {
  // TODO
  return Promise.reject("unimplemented");
};

export const loadCurrentPost = (): Promise<Post> => {
  return Promise.resolve({
    id: "1",
    timestamp: new Date(),
    imageid: "image",
    status: { flag: "complete" },
  });
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
