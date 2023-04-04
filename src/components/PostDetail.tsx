import { useParams, useNavigate } from "react-router-dom";
import { useQueryPostInfo } from "../api/postQueries";
import { PostEdit } from "./forms/PostEdit";
import { RawImage } from "./RawImage";

export const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (id === undefined) {
    throw new Error("requires id param");
  }
  const { data, isLoading } = useQueryPostInfo(id);
  if (isLoading || data == null) {
    return <>Loading...</>;
  }
  const imageId = data.imageid ?? "";
  return (
    <>
      {imageId ? (
        <div>
          <RawImage id={imageId} height={400} width={300} />
        </div>
      ) : null}
      <div>
        <PostEdit id={id} navigateUp={() => navigate(-1)} />
      </div>
    </>
  );
};
