import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { PutImageBody } from "../../api/contract";
import { loadImageInfo, putImageData } from "../../api/images";
import { ConfirmLoseChanges } from "../ConfirmLoseChanges";
import { FormTextField } from "../input/FormTextField";

type Props = {
  id: string;
  navigateUp: () => void;
};

const defaultValues: PutImageBody = { description: "" };

export const ImageEdit = ({ id, navigateUp }: Props) => {
  const queryClient = useQueryClient();
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  const {
    formState: { isSubmitting, isDirty },
    handleSubmit,
    control,
    reset,
  } = useForm({
    defaultValues,
  });

  const { isSuccess, data: imageInfo } = useQuery(["images", id], () => {
    return loadImageInfo(id);
  });

  const { mutate: mutateImageInfo, isSuccess: mutationSuccess } = useMutation(
    (imageInfo: PutImageBody) => {
      reset(imageInfo);
      return putImageData(id, imageInfo);
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries("images");
      },
    }
  );

  useEffect(() => {
    if (isSuccess && !initialLoadComplete) {
      reset(imageInfo);
      setInitialLoadComplete(true);
    }
  }, [isSuccess, initialLoadComplete, reset, imageInfo]);

  useEffect(() => {
    if (mutationSuccess) {
      navigateUp();
    }
  }, [mutationSuccess, navigateUp]);

  if (!initialLoadComplete) {
    return <>Loading...</>;
  }
  return (
    <>
      <ConfirmLoseChanges
        open={showConfirmCancel}
        onClose={() => {
          setShowConfirmCancel(false);
        }}
        onConfirm={() => {
          navigateUp();
        }}
      />
      <form>
        <FormTextField
          control={control}
          name="description"
          multiline={true}
          fullWidth
          required
          margin="normal"
          label="Description"
        />
        <br />

        <Button
          style={{ marginLeft: "5em" }}
          disabled={isSubmitting}
          onClick={handleSubmit((formData) => {
            mutateImageInfo(formData);
          })}
          variant="contained"
        >
          Save
        </Button>

        <Button
          style={{ marginLeft: "1em" }}
          disabled={isSubmitting}
          onClick={() => {
            if (!isDirty) {
              navigateUp();
            } else {
              setShowConfirmCancel(true);
            }
          }}
          variant="contained"
        >
          Discard
        </Button>
      </form>
    </>
  );
};
