import { useQuery } from "react-query";
import { loadPostInfo, loadPostList } from "./posts";

export const useQueryPostList = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: () => loadPostList(),
  });

export const useQueryPostListCompleted = () =>
  useQuery({
    queryKey: ["posts", { status: "complete" }],
    queryFn: async () => {
      const posts = await loadPostList();
      return posts.filter(
        (p) => p.status.flag === "complete" && p.imageid != null,
      );
    },
  });

export const useQueryPostInfo = (id: string) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => {
      return loadPostInfo(id);
    },
  });
};
