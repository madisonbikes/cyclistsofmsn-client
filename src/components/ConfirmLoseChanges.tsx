import { BaseConfirmDelete } from "./BaseConfirmDelete";

interface Props {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmLoseChanges = (props: Props) => {
  return (
    <BaseConfirmDelete
      description="Are you sure that you want to cancel? You have made changes that will be discarded."
      confirmButtonText="Discard Changes"
      {...props}
    />
  );
};
