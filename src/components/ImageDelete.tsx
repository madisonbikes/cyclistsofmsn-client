import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImageData } from "../api/images";
import { ConfirmImageDelete } from "./ConfirmImageDelete";

interface DeleteImageProps {
  imageId: string | undefined;
  onClose: () => void;
}
export const DeleteImage = ({ imageId, onClose }: DeleteImageProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteImageData(id);
      return id;
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
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
