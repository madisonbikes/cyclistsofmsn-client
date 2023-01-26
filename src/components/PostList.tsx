import { loadPostList } from "../api/posts";
import { ListItem } from "@mui/material";
import { useQuery } from "react-query";
import { formatISO } from "date-fns";
import { RawImage } from "./RawImage";

export const PostList = () => {
  const { data, isLoading } = useQuery({
    queryKey: "postList",
    queryFn: () => loadPostList(),
  });
  if (isLoading) return <>Loading...</>;
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
