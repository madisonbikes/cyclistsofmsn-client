import { Button, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { putImageBodySchema } from "../../api/contract";
import { loadImageInfo, putImageData } from "../../api/images";
import { ConfirmLoseChanges } from "../ConfirmLoseChanges";
import { FormTextField } from "../input/FormTextField";
import { z } from "zod";
import { FormCheckbox } from "../input/FormCheckbox";

type Props = {
  id: string;
  navigateUp: () => void;
};

const formDataSchema = putImageBodySchema.extend({
  description: z.string().default(""),
});
type FormData = z.infer<typeof formDataSchema>;

const defaultValues: FormData = { description: "", hidden: false };

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

  const { isSuccess, data: imageInfo } = useQuery({
    queryKey: ["images", id],
    queryFn: () => {
      return loadImageInfo(id);
    },
  });

  const { mutate: mutateImageInfo, isSuccess: mutationSuccess } = useMutation({
    mutationFn: (imageInfo: FormData) => {
      reset(imageInfo);
      return putImageData(id, imageInfo);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(["images"]);
    },
  });

  useEffect(() => {
    if (isSuccess && !initialLoadComplete) {
      reset(formDataSchema.parse(imageInfo));
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
          multiline
          fullWidth
          rows={3}
          required
          margin="normal"
          label="Description"
        />
        <br />
        <FormControlLabel
          control={<FormCheckbox control={control} name="hidden" required />}
          label="Hidden"
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
