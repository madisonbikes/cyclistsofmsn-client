import { useParams, useNavigate } from "react-router";
import { useQueryPostInfo } from "../api/postQueries";
import { PostEdit } from "./forms/PostEdit";
import { ScaledFullImage } from "./ScaledFullImage";

export const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (id === undefined) {
    throw new Error("requires id param");
  }
  const { data: postInfo, isLoading } = useQueryPostInfo(id);
  const imageId = postInfo?.imageid;
  if (isLoading || imageId == null) {
    return <>Loading...</>;
  }
  return (
    <>
      <div>
        <ScaledFullImage id={imageId} />
      </div>
      <div>
        <PostEdit
          id={id}
          navigateUp={() => {
            void navigate(-1);
          }}
        />
      </div>
    </>
  );
};
