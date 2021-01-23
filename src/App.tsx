import "./App.css";
import React, { useEffect, useState } from "react";
import { CyclistPhoto } from "./CyclistPhoto";
import { NextButton } from "./NextButton";
import axios from "axios";

type ImageData = {
  id: number;
  filename: string;
};

export const App = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [photoId, setPhotoId] = useState<number | undefined>(undefined);
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    console.log("loading image data");
    const imageQuery = "/images";
    axios
      .get(imageQuery)
      .then((result) => {
        setImages(result.data);
        setLoading(false);
        setPhotoId(result.data[0].id);
      })
      .catch((error) => console.error(error));
  }, []);

  if (loading) {
    return renderLoading();
  } else {
    return renderPhoto();
  }

  function renderLoading() {
    return <div>Loading...</div>;
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

  function renderPhoto() {
    return (
      <div className="App">
        <header className="App-header">
          {photoId && <CyclistPhoto photoId={photoId} />}
          <p>Cyclists of Madison</p>
          <a
            className="App-link"
            href="https://twitter.com/cyclists_of_msn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <NextButton handleNextPhoto={handleNextPhoto} />
        </header>
      </div>
    );
  }
};
