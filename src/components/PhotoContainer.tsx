import { Container, ButtonGroup } from "@mui/material";
import { NextButton } from "./NextButton";
import { PreviousButton } from "./PreviousButton";
import { RawImage } from "./RawImage";
import { useQueryPostListCompleted } from "../api/posts";
import { useEffect, useState } from "react";

type Props = {
  initialPostId: string;
};

export const PhotoContainer = ({ initialPostId }: Props) => {
  const { data, isLoading, isSuccess } = useQueryPostListCompleted();
  const [postIndex, setPostIndex] = useState(-1);

  useEffect(() => {
    if (isSuccess && postIndex === -1) {
      const newPostIndex = data.findIndex((v) => v.id === initialPostId);
      if (newPostIndex === -1) {
        throw new Error("post id should be found");
      }
      setPostIndex(newPostIndex);
    }
  }, [data, isSuccess, initialPostId, postIndex, setPostIndex]);

  if (isLoading || postIndex === -1) return <>Loading...</>;
  if (!data) {
    throw new Error("data should always exist");
  }
  const { imageid, timestamp } = data[postIndex];
  if (imageid === undefined) {
    throw new Error("photoId should be defined");
  }

  const previousButtonEnabled = () => {
    return postIndex > 0;
  };

  const nextButtonEnabled = () => {
    return postIndex < data.length - 1;
  };

  const handlePreviousPhoto = () => {
    setPostIndex(postIndex - 1);
  };

  const handleNextPhoto = () => {
    setPostIndex(postIndex + 1);
  };
  return (
    <Container>
      <Container className="photoDate">
        <RawImage id={imageid} height={512} />
        <div className="photoDate">{timestamp.toLocaleDateString()}</div>
      </Container>
      <div>
        <ButtonGroup>
          {previousButtonEnabled() ? (
            <PreviousButton handlePreviousPhoto={handlePreviousPhoto} />
          ) : null}
          {nextButtonEnabled() ? (
            <NextButton handleNextPhoto={handleNextPhoto} />
          ) : null}
        </ButtonGroup>
      </div>
    </Container>
  );
};
