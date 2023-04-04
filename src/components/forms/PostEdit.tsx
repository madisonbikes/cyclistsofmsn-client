import { Button, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { putPostBodySchema, postStatusFlagSchema } from "../../api/contract";
import { putPostData, useQueryPostInfo } from "../../api/posts";
import { ConfirmLoseChanges } from "../ConfirmLoseChanges";
import { FormSelect } from "../input/FormSelect";
import { z } from "zod";

type Props = {
  id: string;
  navigateUp: () => void;
};

const formDataSchema = putPostBodySchema;
type FormData = z.infer<typeof formDataSchema>;

const defaultValues: FormData = {
  timestamp: new Date(),
  imageid: undefined,
  status: { flag: "pending" },
};

export const PostEdit = ({ id, navigateUp }: Props) => {
  const queryClient = useQueryClient();
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  const form = useForm({ defaultValues });
  const {
    formState: { isSubmitting, isDirty },
    handleSubmit,
    reset,
  } = form;

  const { isSuccess, data: postInfo } = useQueryPostInfo(id);

  const { mutate: mutatePostInfo, isSuccess: mutationSuccess } = useMutation({
    mutationFn: (mutated: FormData) => {
      console.log(`reset (mutate): ${JSON.stringify(mutated)}`);
      reset(mutated);
      return putPostData(id, mutated);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(["posts"]);
    },
  });

  useEffect(() => {
    if (isSuccess && !initialLoadComplete) {
      const resetData = formDataSchema.parse(postInfo);
      console.log(`reset (useEffect): ${JSON.stringify(resetData)}`);
      reset(resetData);
      setInitialLoadComplete(true);
    }
  }, [isSuccess, initialLoadComplete, reset, postInfo]);

  useEffect(() => {
    if (mutationSuccess) {
      navigateUp();
    }
  }, [mutationSuccess, navigateUp]);

  if (!initialLoadComplete) {
    return <>Loading...</>;
  }
  return (
    <FormProvider {...form}>
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
        <Status />
        <br />

        <Button
          style={{ marginLeft: "5em" }}
          disabled={isSubmitting}
          onClick={handleSubmit((formData) => {
            mutatePostInfo(formData);
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
    </FormProvider>
  );
};

const Status = () => {
  const { control } = useFormContext();
  return (
    <FormSelect name="status.flag" control={control}>
      <MenuItem
        key={postStatusFlagSchema.Values.pending}
        value={postStatusFlagSchema.Values.pending}
      >
        Pending
      </MenuItem>
      <MenuItem
        key={postStatusFlagSchema.Values.complete}
        value={postStatusFlagSchema.Values.complete}
      >
        Complete
      </MenuItem>
      <MenuItem
        key={postStatusFlagSchema.Values.failed}
        value={postStatusFlagSchema.Values.failed}
      >
        Failed
      </MenuItem>
    </FormSelect>
  );
};
