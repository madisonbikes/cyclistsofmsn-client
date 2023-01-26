import { CircularProgress, Container } from "@mui/material";
import { parseJSON } from "date-fns";
import { loadCurrentPost } from "../api/posts";
import { PhotoContainer } from "./PhotoContainer";
import { useQuery } from "react-query";

export const Current = () => {
  const { data, isLoading } = useQuery({
    queryKey: "currentPhoto",
    queryFn: () => loadCurrentPost(),
  });

  if (isLoading || !data) {
    return <Loading />;
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
