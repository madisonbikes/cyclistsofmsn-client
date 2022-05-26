import { Button } from "@mui/material";

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
