import { Images, imageSchema, MutableImage } from "./contract";

export const loadImageList = async () => {
  const response = await Images.index();
  return imageSchema.array().parse(response.body);
};

export const putImageData = async (id: string, imageData: MutableImage) => {
  const response = await Images.put(id).send(imageData);
  return imageSchema.parse(response);
};
