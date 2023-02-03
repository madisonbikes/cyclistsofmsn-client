import { BaseConfirmDelete } from "./BaseConfirmDelete";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ConfirmImageDelete = (props: Props) => {
  return (
    <BaseConfirmDelete
      description="Are you sure you want to delete this image?"
      confirmButtonText="Delete Image"
      {...props}
    />
  );
};
