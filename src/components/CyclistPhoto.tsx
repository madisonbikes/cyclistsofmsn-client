type Props = {
  photoId: string | undefined;
};

export const CyclistPhoto = ({ photoId }: Props) => {
  if (!photoId) return <></>;

  return (
    <img src={`/images/${photoId}?height=512`} height="512" alt="cyclist" />
  );
};
