import { Container, ButtonGroup } from "@mui/material";
import { CyclistPhoto } from "./CyclistPhoto";
import { NextButton } from "./NextButton";
import { PreviousButton } from "./PreviousButton";
import { RandomButton } from "./RandomButton";

type Props = {
  photoId: string | undefined;
  timestamp: Date | undefined;
};

export const PhotoContainer = ({ photoId, timestamp }: Props) => {
  const handleRandomPhoto = async () => {
    /*
    const ndx = await getNextRandomIndex(images.length);
    setLoading(false);
    setPhotoId(images[ndx].id);
    */
  };

  const handleNextPhoto = async () => {
    /*
    let ndx = images.findIndex((value) => value.id === photoId);
    ndx++;
    if (ndx >= images.length) {
      ndx = 0;
    }
    setLoading(false);
    setPhotoId(images[ndx].id);
    */
  };

  const handlePreviousPhoto = async () => {
    /*
    let ndx = images.findIndex((value) => value.id === photoId);
    ndx--;
    if (ndx < 0) {
      ndx = images.length - 1;
    }
    setLoading(false);
    setPhotoId(images[ndx].id);
    */
  };
  return (
    <Container>
      <Container className="photoDate">
        <CyclistPhoto photoId={photoId} />
        <div className="photoDate">{timestamp?.toLocaleDateString()}</div>
      </Container>
      <div>
        <ButtonGroup>
          <RandomButton handleRandomPhoto={handleRandomPhoto} />
          <PreviousButton handlePreviousPhoto={handlePreviousPhoto} />
          <NextButton handleNextPhoto={handleNextPhoto} />
        </ButtonGroup>
      </div>
    </Container>
  );
};
