import axios from "axios";

export type ImageData = {
  id: number;
  filename: string;
};

export async function loadImageList(): Promise<ImageData[]> {
  const imageQuery = "/images";
  const response = await axios.get(imageQuery);
  return response.data;
}
