type Props = {
  photoId: string | undefined;
};

export function CyclistPhoto({ photoId }: Props): JSX.Element {
  if (!photoId) return <></>;

  return (
    <img
      src={`/images/${photoId}?height=512`}
      height="512"
      alt="cyclist"
    />
  );
}
