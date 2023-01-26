import { loadPostList } from "../api/posts";
import { ListItem } from "@mui/material";
import { useQuery } from "react-query";
import { formatISO } from "date-fns";
import { RawImage } from "./RawImage";

export const PostList = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: "postList",
    queryFn: () => loadPostList(),
    useErrorBoundary: (error: Error) => true,
  });
  if (isLoading) return <>Loading...</>;
  if (isError) return <>An error has occurred {error.message}</>;
  return (
    <ul>
      {data?.map((post) => {
        return (
          <ListItem key={post.id}>
            <>
              <RawImage id={post.imageid} width={96} height={72} />
              {formatISO(post.timestamp)}
            </>
          </ListItem>
        );
      })}
    </ul>
  );
};
