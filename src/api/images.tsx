import { Images } from "./contract/Images";
import { imageSchema } from "./contract/types";

export const loadImageList = async () => {
  const response = await Images.index();
  return imageSchema.array().parse(response.body);
};
