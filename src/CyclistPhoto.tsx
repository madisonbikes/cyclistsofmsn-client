import React from "react";

type Props = {
  photoId: number;
};

export const CyclistPhoto = ({ photoId }: Props): JSX.Element => {
  return (
    <img
      src={"/images/" + photoId + "?height=512"}
      height="512"
      alt="cyclist"
    />
  );
};
