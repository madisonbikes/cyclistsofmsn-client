import axios from "axios";
import randomNumber from "random-number-csprng";

export type ImageData = {
  id: number;
  filename: string;
};

export async function loadImageList(): Promise<ImageData[]> {
  const imageQuery = "/images";
  const response = await axios.get(imageQuery);
  return response.data;
}

export async function getNextRandomIndex(
  imageListSize: number
): Promise<number> {
  if (imageListSize === 1) {
    return 0;
  }
  return randomNumber(0, imageListSize - 1);
}
