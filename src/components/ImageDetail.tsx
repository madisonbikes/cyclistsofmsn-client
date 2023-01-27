import { useParams, useNavigate } from "react-router-dom";
import { ImageEdit } from "./forms/ImageEdit";
import { RawImage } from "./RawImage";

export const ImageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    throw new Error("requires id param");
  }
  return (
    <>
      <div>
        <RawImage id={id} height={400} width={300} />
      </div>
      <div>
        <ImageEdit id={id} navigateUp={() => navigate("/images")} />
      </div>
    </>
  );
};
