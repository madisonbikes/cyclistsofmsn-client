import { ImageData, PostData } from "../api";
/** mocks that make the tests deterministic */
export async function loadImageList(): Promise<ImageData[]> {
  const data = [
    { id: "1", filename: "filename1" },
    { id: "2", filename: "filename2" },
  ];
  await sleep(250);
  return data;
}

export async function loadPostList(): Promise<PostData[]> {
  // TODO
  return Promise.reject();
}

export async function loadCurrentPost(): Promise<PostData> {
  // TODO
  return Promise.reject();
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
