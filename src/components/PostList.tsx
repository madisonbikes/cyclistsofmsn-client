import { loadPostList } from "../api/posts";
import { ListItem } from "@mui/material";
import { useQuery } from "react-query";
import { Post } from "../api/contract/types";

export const PostList = () => {
  const { data, isLoading, isError, error } = useQuery<Post[], Error>({
    queryKey: "postList",
    queryFn: () => loadPostList(),
  });
  if (isLoading) return <>Loading...</>;
  if (isError) return <>An error has occurred {error.message}</>;
  return (
    <ul>
      {data?.map((post) => {
        return (
          <ListItem key={post.id}>
            <>
              <img
                src={`/api/v1/images/${post.imageid}?width=96`}
                alt="cyclist"
              />
              {post.timestamp}
            </>
          </ListItem>
        );
      })}
    </ul>
  );
};
