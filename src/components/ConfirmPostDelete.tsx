import { BaseConfirmDelete } from "./BaseConfirmDelete";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmPostDelete = (props: Props) => {
  return (
    <BaseConfirmDelete
      description="Are you sure you want to delete this post? It will be regenerated from the available photo pool at the next check interval."
      confirmButtonText="Delete Post"
      {...props}
    />
  );
};
