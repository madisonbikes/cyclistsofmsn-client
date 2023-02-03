import {
  Images,
  imageSchema,
  MutableImage,
  mutableImageSchema,
} from "./contract";

export const loadImageList = async () => {
  const response = await Images.index();
  return imageSchema.array().parse(response.body);
};

export const putImageData = async (id: string, imageData: MutableImage) => {
  // parse the data to ensure we don't send a bunch of extra junk
  const parsed = mutableImageSchema.parse(imageData);
  const response = await Images.put(id).send(parsed);
  return imageSchema.parse(response.body);
};

export const deleteImageData = async (id: string) => {
  const response = await Images.delete(id);
  return response.statusCode === 200;
};

export const loadImageInfo = async (id: string) => {
  const response = await Images.metadata(id);
  return imageSchema.parse(response.body);
};
