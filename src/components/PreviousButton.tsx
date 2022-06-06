import { Button } from "@mui/material";

type Props = {
  handlePreviousPhoto: () => void;
};

export const PreviousButton = ({ handlePreviousPhoto }: Props) => {
  return (
    <Button color="primary" onClick={handlePreviousPhoto}>
      Previous Photo
    </Button>
  );
};
