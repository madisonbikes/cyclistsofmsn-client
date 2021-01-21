import React, { Component, ReactNode } from "react";

type PhotoProps = {
  photoId: number;
};

export default class CyclistPhoto extends Component<PhotoProps> {
  render(): ReactNode {
    return (
      <img src={"/images/" + this.props.photoId} height="600" alt="cyclist" />
    );
  }
}
