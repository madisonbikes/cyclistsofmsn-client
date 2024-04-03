import { Image } from "../contract/types";
export const loadImageInfo = (id: string): Promise<Image> => {
  return Promise.resolve({
    id,
    width: 1000,
    height: 1000,
    filename: "blarg.jpg",
    hidden: false,
    fs_timestamp: new Date(0),
    description_from_exif: true,
  });
};
