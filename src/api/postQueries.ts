import { useQuery } from "@tanstack/react-query";
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

type Props = {
  id: string;
  enabled?: boolean;
};
export const useQueryPostInfo = ({ id, enabled }: Props) => {
  return useQuery({
    enabled: enabled ?? true,
    queryKey: ["posts", id],
    queryFn: () => {
      return loadPostInfo(id);
    },
  });
};
