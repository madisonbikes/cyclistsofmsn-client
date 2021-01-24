import { Button } from "@material-ui/core";
import React from "react";

type Props = {
  handleNextPhoto: () => void;
};

export function NextButton({ handleNextPhoto }: Props): JSX.Element {
  return (
    <Button color="primary" onClick={handleNextPhoto}>
      Next Photo
    </Button>
  );
}
