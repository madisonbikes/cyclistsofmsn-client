import React from "react";

type Props = {
  handleNextPhoto: () => void;
};

export function NextButton({ handleNextPhoto }: Props): JSX.Element {
  return <button onClick={handleNextPhoto}>Next Image</button>;
}
