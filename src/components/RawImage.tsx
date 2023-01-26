type Props = {
  id: string | undefined;
  width?: number;
  height?: number;
};
export const RawImage = ({ id, width, height }: Props) => {
  if (!id) {
    return <></>;
  }
  const params = new URLSearchParams();
  if (width) {
    params.append("width", String(width));
  }
  if (height) {
    params.append("height", String(height));
  }

  return (
    <img
      src={`/api/v1/images/${id}/binary?${params.toString()}`}
      alt="cyclist"
    />
  );
};
