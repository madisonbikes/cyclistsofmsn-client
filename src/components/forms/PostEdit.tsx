import { Button, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import {
  PutPostBody,
  putPostBodySchema,
  postStatusFlagSchema,
} from "../../api/contract";
import { putPostData, useQueryPostInfo } from "../../api/posts";
import { ConfirmLoseChanges } from "../ConfirmLoseChanges";
import { FormSelect } from "../input/FormSelect";

type Props = {
  id: string;
  navigateUp: () => void;
};

const defaultValues: PutPostBody = {
  timestamp: new Date(),
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

  const { mutate: mutatePostInfo, isSuccess: mutationSuccess } = useMutation(
    (postInfo: PutPostBody) => {
      console.log(`reset (mutate): ${JSON.stringify(postInfo)}`);
      reset(postInfo);
      const sendData = putPostBodySchema.parse(postInfo);
      return putPostData(id, sendData);
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  useEffect(() => {
    if (isSuccess && !initialLoadComplete) {
      console.log(`reset (useEffect): ${JSON.stringify(postInfo)}`);
      reset(postInfo);
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
