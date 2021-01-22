import React, { Component, ReactNode } from "react";

type Props = {
  photoId: number;
};

export default class CyclistPhoto extends Component<Props> {
  render(): ReactNode {
    return (
      <img
        src={"/images/" + this.props.photoId + "?height=512"}
        height="512"
        alt="cyclist"
      />
    );
  }
}
