import { CircularProgress, Container } from "@mui/material";
import { loadCurrentPost } from "../api/posts";
import { PhotoContainer } from "./PhotoContainer";
import { useQuery } from "@tanstack/react-query";

export const Current = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["photos"],
    queryFn: () => loadCurrentPost(),
  });

  if (isLoading || !data) {
    return <Loading />;
  }
  return <PhotoContainer initialPostId={data.id} />;
};

const Loading = () => {
  return (
    <Container maxWidth="sm">
      <CircularProgress />
    </Container>
  );
};
