import { useParams, useNavigate } from "react-router-dom";
import { useQueryPostInfo } from "../api/posts";
import { PostEdit } from "./forms/PostEdit";
import { RawImage } from "./RawImage";

export const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    throw new Error("requires id param");
  }
  const { data, isLoading } = useQueryPostInfo(id);
  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <>
      <div>
        <RawImage id={data?.imageid} height={400} width={300} />
      </div>
      <div>
        <PostEdit id={id} navigateUp={() => navigate(-1)} />
      </div>
    </>
  );
};
