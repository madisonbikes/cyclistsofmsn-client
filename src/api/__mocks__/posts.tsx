import { Image, Post } from "../contract";

/** mocks that make the tests deterministic */
export const loadImageList = async () => {
  const data: Image[] = [
    {
      id: "1",
      filename: "filename1",
      fs_timestamp: new Date(),
      description_from_exif: false,
    },
    {
      id: "2",
      filename: "filename2",
      fs_timestamp: new Date(),
      description_from_exif: false,
    },
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
