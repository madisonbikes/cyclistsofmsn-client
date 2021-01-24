import { Button } from "@material-ui/core";
import React from "react";

type Props = {
  handlePreviousPhoto: () => void;
};

export function PreviousButton({ handlePreviousPhoto }: Props): JSX.Element {
  return (
    <Button color="primary" onClick={handlePreviousPhoto}>
      Previous Photo
    </Button>
  );
}
