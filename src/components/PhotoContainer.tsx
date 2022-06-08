import { Container, ButtonGroup, Link } from "@mui/material";
import { CyclistPhoto } from "./CyclistPhoto";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { NextButton } from "./NextButton";
import { PreviousButton } from "./PreviousButton";
import { Profile } from "./Profile";
import { RandomButton } from "./RandomButton";
import { Link as RouterLink } from "react-router-dom";

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
      <CyclistPhoto photoId={photoId} />
      <p>Cyclists of Madison on {timestamp?.toLocaleDateString()}</p>
      <Link
        href="https://twitter.com/cyclists_of_msn"
        color="primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </Link>
      <br />
      <Link component={RouterLink} to="/posts">
        Posts
      </Link>
      <div>
        <ButtonGroup>
          <RandomButton handleRandomPhoto={handleRandomPhoto} />
          <PreviousButton handlePreviousPhoto={handlePreviousPhoto} />
          <NextButton handleNextPhoto={handleNextPhoto} />
          <LoginButton />
          <LogoutButton />
        </ButtonGroup>
      </div>
      <div>
        <Profile />
      </div>
    </Container>
  );
};
