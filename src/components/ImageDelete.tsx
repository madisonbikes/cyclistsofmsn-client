import { useMutation, useQueryClient } from "react-query";
import { deleteImageData } from "../api/images";
import { ConfirmImageDelete } from "./ConfirmImageDelete";

type DeleteImageProps = {
  imageId: string | undefined;
  onClose: () => void;
};
export const DeleteImage = ({ imageId, onClose }: DeleteImageProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    async (id: string) => {
      await deleteImageData(id);
      return id;
    },
    {
      onSuccess: (id: string) => {
        return queryClient.invalidateQueries(["images"]);
      },
    }
  );
  return (
    <ConfirmImageDelete
      open={imageId !== undefined}
      onClose={onClose}
      onConfirm={() => {
        if (imageId !== undefined) {
          deleteMutation.mutate(imageId);
        }
      }}
    />
  );
};
