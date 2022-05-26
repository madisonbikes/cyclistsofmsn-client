import { Button } from "@mui/material";

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
