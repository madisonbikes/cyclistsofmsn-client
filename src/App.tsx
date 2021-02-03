import "./App.css";
import React, { useEffect, useState } from "react";
import {
  ButtonGroup,
  CircularProgress,
  Container,
  Link
} from "@material-ui/core";

import { CyclistPhoto } from "./components/CyclistPhoto";
import { NextButton } from "./components/NextButton";
import { PreviousButton } from "./components/PreviousButton";
import { RandomButton } from "./components/RandomButton";
import { LoginButton } from "./components/LoginButton";
import { ImageData, loadImageList, getNextRandomIndex } from "./api";
import { LogoutButton } from "./components/LogoutButton";
import { Profile } from "./components/Profile";

export const App = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [photoId, setPhotoId] = useState<number | undefined>(undefined);
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
      // use flag to avoid setting state if component unmounts (unlikely)
      let abort = false;
      async function loadImages() {
        console.debug(`loading image data`);
        const response = await loadImageList();
        const ndx = await getNextRandomIndex(response.length);
        if (!abort) {
          setLoading(false);
          setPhotoId(response[ndx].id);
          setImages(response);
        }
      }

      // resolve these promises just to satisfy eslint and render error in console
      loadImages()
        .then(() => {
          // do nothing
        })
        .catch((e) => {
          console.error(e);
        });

      // cleanup aborts load
      return () => {
        abort = true;
      };

    },
    // empty dependency array causes effect to be run only once
    []
  );

  if (loading) {
    return renderLoading();
  } else {
    return renderPhoto();
  }

  function renderLoading() {
    return (
      <Container maxWidth="sm">
        <CircularProgress />
      </Container>
    );
  }

  async function handleRandomPhoto() {
    const ndx = await getNextRandomIndex(images.length);
    setLoading(false);
    setPhotoId(images[ndx].id);
  }

  function handleNextPhoto() {
    let ndx = images.findIndex((value) => value.id === photoId);
    ndx++;
    if (ndx >= images.length) {
      ndx = 0;
    }
    setLoading(false);
    setPhotoId(images[ndx].id);
  }

  function handlePreviousPhoto() {
    let ndx = images.findIndex((value) => value.id === photoId);
    ndx--;
    if (ndx < 0) {
      ndx = images.length - 1;
    }
    setLoading(false);
    setPhotoId(images[ndx].id);
  }

  function renderPhoto() {
    return (
      <Container>
        <CyclistPhoto photoId={photoId} />
        <p>Cyclists of Madison</p>
        <Link
          href="https://twitter.com/cyclists_of_msn"
          color="primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
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
  }
};
