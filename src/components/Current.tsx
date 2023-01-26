import { CircularProgress, Container } from "@mui/material";
import { parseJSON } from "date-fns";
import { loadCurrentPost } from "../api/posts";
import { PhotoContainer } from "./PhotoContainer";
import { useQuery } from "react-query";

export const Current = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: "currentPhoto",
    queryFn: () => loadCurrentPost(),
    useErrorBoundary: (error: Error) => true,
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
