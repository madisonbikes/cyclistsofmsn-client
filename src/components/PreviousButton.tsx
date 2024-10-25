import { Button } from "@mui/material";

interface Props {
  handlePreviousPhoto: () => void;
}

export const PreviousButton = ({ handlePreviousPhoto }: Props) => {
  return (
    <Button color="primary" onClick={handlePreviousPhoto}>
      Previous Photo
    </Button>
  );
};
