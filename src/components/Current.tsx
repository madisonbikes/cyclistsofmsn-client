import { CircularProgress, Container } from "@mui/material";
import { parseJSON } from "date-fns";
import { loadCurrentPost, PostData } from "../api";
import { PhotoContainer } from "./PhotoContainer";
import { useQuery } from "react-query";

export const Current = () => {
  const { data, error, isLoading, isError } = useQuery<PostData, Error>({
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
      photoId={data.image}
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
