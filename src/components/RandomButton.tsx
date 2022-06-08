import { Button } from "@mui/material";

type Props = {
  handleRandomPhoto: () => void;
};

export const RandomButton = ({ handleRandomPhoto }: Props) => {
  return (
    <Button color="primary" onClick={handleRandomPhoto}>
      Random Photo
    </Button>
  );
};
