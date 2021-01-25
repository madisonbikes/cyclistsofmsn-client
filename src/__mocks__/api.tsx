import { ImageData } from "../api";
export async function loadImageList(): Promise<ImageData[]> {
  const response = {
    data: [
      { id: 1, filename: "filename1" },
      { id: 2, filename: "filename2" },
    ],
  };
  await sleep(250);
  return response.data;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
