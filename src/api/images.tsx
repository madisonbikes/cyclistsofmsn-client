import { Images, imageSchema } from "./contract";

export const loadImageList = async () => {
  const response = await Images.index();
  return imageSchema.array().parse(response.body);
};
