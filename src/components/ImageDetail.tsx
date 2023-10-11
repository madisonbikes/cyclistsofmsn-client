import { useParams, useNavigate } from "react-router-dom";
import { ImageEdit } from "./forms/ImageEdit";
import { ScaledFullImage } from "./ScaledFullImage";

export const ImageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (id === undefined) {
    throw new Error("requires id param");
  }
  return (
    <>
      <div>
        <ScaledFullImage id={id} />
      </div>
      <div>
        <ImageEdit id={id} navigateUp={() => navigate(-1)} />
      </div>
    </>
  );
};
