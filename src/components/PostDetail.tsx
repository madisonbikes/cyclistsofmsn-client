import { useParams, useNavigate } from "react-router";
import { useQueryPostInfo } from "../api/postQueries";
import { PostEdit } from "./forms/PostEdit";
import { ScaledFullImage } from "./ScaledFullImage";
import { useState } from "react";

export const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dismissingForm, setDismissingForm] = useState(false);

  if (id === undefined) {
    throw new Error("requires id param");
  }
  const { data: postInfo, isLoading } = useQueryPostInfo({
    id,
    enabled: !dismissingForm,
  });
  const imageId = postInfo?.imageid;
  if (isLoading || imageId == null) {
    return <>Loading...</>;
  }
  return (
    <>
      <ScaledFullImage id={imageId} />
      <PostEdit
        id={id}
        onDismissForm={() => {
          setDismissingForm(true);
          void navigate(-1);
        }}
      />
    </>
  );
};
