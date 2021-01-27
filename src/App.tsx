import "./App.css";
import React, { useEffect, useState } from "react";
import {
  ButtonGroup,
  CircularProgress,
  Container,
  Link,
} from "@material-ui/core";

import { CyclistPhoto } from "./components/CyclistPhoto";
import { NextButton } from "./components/NextButton";
import { PreviousButton } from "./components/PreviousButton";
import { RandomButton } from "./components/RandomButton";
import { ImageData, loadImageList, getNextRandomIndex } from "./api";

export const App = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [photoId, setPhotoId] = useState<number | undefined>(undefined);
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    async function loadImages(iteration: number) {
      console.log(`loading image data # ${iteration}`);
      const response = await loadImageList();
      console.log(`response: {response.length}`);
      if (!response || response.length === 0) {
        // call it again sam
        await loadImages(iteration + 1);
      } else {
        const ndx = await getNextRandomIndex(response.length);
        setLoading(false);
        setPhotoId(response[ndx].id);
        setImages(response);
      }
    }
    loadImages(1);
  }, []);

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
        {photoId && <CyclistPhoto photoId={photoId} />}
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
          </ButtonGroup>
        </div>
      </Container>
    );
  }
};
