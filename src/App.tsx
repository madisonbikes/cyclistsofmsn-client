import "./App.css";
import React, { Component, ReactNode } from "react";
import CyclistPhoto from "./CyclistPhoto";
import NextButton from "./NextButton";
import axios from "axios";

type Props = Record<string, never>;

type State = {
  loading: boolean;
  photoId: number;
};

type ImageData = {
  id: number;
  filename: string;
};

export default class App extends Component<Props, State> {
  state: State = {
    loading: false,
    photoId: -1,
  };

  images: ImageData[] = [];
  mounted = false;

  constructor(props: Props) {
    super(props);

    // FIXME make this async so that loading... works
    this.load();
  }

  private load(): void {
    console.log("loading image data");
    const imageQuery = "/images";
    axios
      .get(imageQuery)
      .then((result) => {
        this.images = result.data;
        this.handleNextPhoto();
      })
      .catch((error) => console.error(error));
  }

  componentDidMount(): void {
    this.mounted = true;
    this.handleNextPhoto();
  }

  componentWillUnmount(): void {
    this.mounted = false;
  }

  handleNextPhoto = (): void => {
    if (!this.mounted || this.images.length === 0) return;

    let id: number;
    if (this.state.photoId === -1) {
      id = this.images[0].id;
    } else {
      let ndx = this.images.findIndex(
        (value) => value.id === this.state.photoId
      );
      ndx++;
      if (ndx >= this.images.length) {
        ndx = 0;
      }
      id = this.images[ndx].id;
    }

    this.setState({ loading: false, photoId: id });
  };

  render(): ReactNode {
    if (this.state.loading) {
      return this.renderLoading();
    } else {
      return this.renderPhoto();
    }
  }

  renderLoading(): ReactNode {
    return <div>Loading...</div>;
  }

  renderPhoto(): ReactNode {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.photoId !== -1 && (
            <CyclistPhoto photoId={this.state.photoId} />
          )}
          <p>Cyclists of Madison in the house!</p>
          <a
            className="App-link"
            href="https://twitter.com/cyclists_of_msn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <NextButton handleNextPhoto={this.handleNextPhoto} />
        </header>
      </div>
    );
  }
}
