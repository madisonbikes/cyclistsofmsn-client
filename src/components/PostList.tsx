import { loadPostList, PostData } from "../api";
import parseJSON from "date-fns/parseJSON";
import { ListItem } from "@mui/material";
import { useQuery } from "react-query";

export const PostList = () => {
  const { data, isLoading, isError, error } = useQuery<PostData[], Error>({
    queryKey: "postList",
    queryFn: () => loadPostList(),
  });
  if (isLoading) return <>Loading...</>;
  if (isError) return <>An error has occurred {error.message}</>;
  return (
    <ul>
      {data?.map((post) => {
        const parsedTimestamp = parseJSON(post.timestamp).toLocaleDateString();
        return (
          <ListItem key={post.id}>
            <img src={`/api/v1/images/${post.image}?width=96`} alt="cyclist" />
            {parsedTimestamp}
          </ListItem>
        );
      })}
    </ul>
  );
};
