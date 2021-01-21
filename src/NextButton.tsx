import React, { Component, ReactNode } from "react";

type Props = {
  handleNextPhoto: () => void;
};

export default class NextButton extends Component<Props> {
  render(): ReactNode {
    return <button onClick={this.props.handleNextPhoto}>Next Image</button>;
  }
}
