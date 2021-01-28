import { ImageData } from "../api";

/** mocks that make the tests deterministic */
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

export async function getNextRandomIndex(_unused: number): Promise<number> {
  return 1;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
