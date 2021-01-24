import { Button } from "@material-ui/core";
import React from "react";

type Props = {
  handleRandomPhoto: () => void;
};

export function RandomButton({ handleRandomPhoto }: Props): JSX.Element {
  return (
    <Button color="primary" onClick={handleRandomPhoto}>
      Random Photo
    </Button>
  );
}
