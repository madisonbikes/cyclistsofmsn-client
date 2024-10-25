import { Button } from "@mui/material";

interface Props {
  handleNextPhoto: () => void;
}

export const NextButton = ({ handleNextPhoto }: Props) => {
  return (
    <Button color="primary" onClick={handleNextPhoto}>
      Next Photo
    </Button>
  );
};
