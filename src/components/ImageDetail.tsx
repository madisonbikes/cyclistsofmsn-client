import { useParams } from "react-router-dom";
import { RawImage } from "./RawImage";

export const ImageDetail = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("requires id param");
  }
  return (
    <>
      <RawImage id={id} />
    </>
  );
};
