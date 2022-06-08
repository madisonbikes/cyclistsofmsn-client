import { ImageData, PostData } from "../api";
/** mocks that make the tests deterministic */
export const loadImageList = async (): Promise<ImageData[]> => {
  const data = [
    { id: "1", filename: "filename1" },
    { id: "2", filename: "filename2" },
  ];
  await sleep(250);
  return data;
};

export const loadPostList = async (): Promise<PostData[]> => {
  // TODO
  return Promise.reject("unimplemented");
};

export const loadCurrentPost = async (): Promise<PostData> => {
  return { id: "1", timestamp: "blarg", image: "image" };
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
