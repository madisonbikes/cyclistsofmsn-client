import type { Image, Post } from "../contract";

/** mocks that make the tests deterministic */
export const loadImageList = async () => {
  const data: Image[] = [
    {
      id: "1",
      filename: "filename1",
      fs_timestamp: new Date(),
      description_from_exif: false,
      hidden: false,
    },
    {
      id: "2",
      filename: "filename2",
      fs_timestamp: new Date(),
      description_from_exif: false,
      hidden: false,
    },
  ];
  await sleep(250);
  return data;
};

export const loadPostList = (): Promise<Post[]> => {
  return Promise.resolve([
    {
      id: "1",
      imageid: "1",
      timestamp: new Date(),
      status: { flag: "complete" },
    },
    {
      id: "2",
      imageid: "1",
      timestamp: new Date(),
      status: { flag: "complete" },
    },
    {
      id: "3",
      imageid: "1",
      timestamp: new Date(),
      status: { flag: "complete" },
    },
  ]);
};

export const loadCurrentPost = (): Promise<Post> => {
  return Promise.resolve({
    id: "3",
    timestamp: new Date(),
    imageid: "1",
    status: { flag: "complete" },
  });
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
