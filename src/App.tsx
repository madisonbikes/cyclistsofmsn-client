import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ButtonGroup,
  CircularProgress,
  Container,
  Link,
} from "@material-ui/core";
import randomNumber from "random-number-csprng";

import { CyclistPhoto } from "./components/CyclistPhoto";
import { NextButton } from "./components/NextButton";
import { PreviousButton } from "./components/PreviousButton";
import { RandomButton } from "./components/RandomButton";

type ImageData = {
  id: number;
  filename: string;
};

export const App = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [photoId, setPhotoId] = useState<number | undefined>(undefined);
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    async function loadImages() {
      console.log("loading image data");
      const imageQuery = "/images";
      const response = await axios.get(imageQuery);
      const ndx = await randomNumber(0, response.data.length - 1);
      setLoading(false);
      setPhotoId(response.data[ndx].id);
      setImages(response.data);
    }
    loadImages();
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
    const ndx = await randomNumber(0, images.length - 1);
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
