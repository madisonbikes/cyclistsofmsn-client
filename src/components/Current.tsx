import { CircularProgress, Container } from "@mui/material";
import { parseJSON } from "date-fns";
import { loadCurrentPost } from "../api/posts";
import { PhotoContainer } from "./PhotoContainer";
import { useQuery } from "react-query";
import { Post } from "../api/contract";

export const Current = () => {
  const { data, error, isLoading, isError } = useQuery<Post, Error>({
    queryKey: "currentPhoto",
    queryFn: () => loadCurrentPost(),
  });

  if (isLoading || !data) {
    return <Loading />;
  }
  if (isError) {
    return <>Error {error.message}</>;
  }
  return (
    <PhotoContainer
      photoId={data.imageid}
      timestamp={parseJSON(data.timestamp)}
    />
  );
};

const Loading = () => {
  return (
    <Container maxWidth="sm">
      <CircularProgress />
    </Container>
  );
};
