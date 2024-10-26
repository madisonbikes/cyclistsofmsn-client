import { useQuery } from "@tanstack/react-query";
import { loadImageInfo, loadImageList } from "./images";

export const useImageInfo = (id?: string) => {
  return useQuery({
    enabled: id !== undefined,
    queryKey: ["images", id],
    queryFn: () => loadImageInfo(id ?? ""),
  });
};

export const useImageList = () => {
  return useQuery({
    queryKey: ["images"],
    queryFn: () => loadImageList(),
  });
};
