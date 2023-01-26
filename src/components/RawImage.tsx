type Props = {
  id: string;
  width?: number;
};
export const RawImage = ({ id, width }: Props) => {
  const widthQualifier = width ? `?width=${width}` : "";
  return (
    <>
      <img src={`/api/v1/images/${id}${widthQualifier}`} alt="cyclist" />
    </>
  );
};
