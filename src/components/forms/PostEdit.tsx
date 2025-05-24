import { Button, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putPostBodySchema, postStatusFlagSchema } from "../../api/contract";
import { deletePost, putPostData } from "../../api/posts";
import { useQueryPostInfo } from "../../api/postQueries";
import { ConfirmLoseChanges } from "../ConfirmLoseChanges";
import { FormSelect } from "../input/FormSelect";
import { z } from "zod";
import { ConfirmPostDelete } from "../ConfirmPostDelete";

interface Props {
  id: string;
  onDismissForm: () => void;
}

const formDataSchema = putPostBodySchema;
type FormData = z.infer<typeof formDataSchema>;

const defaultValues: FormData = {
  timestamp: new Date(),
  imageid: undefined,
  status: { flag: "pending" },
};

export const PostEdit = ({ id, onDismissForm }: Props) => {
  const queryClient = useQueryClient();
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const form = useForm({ defaultValues });
  const {
    formState: { isSubmitting, isDirty },
    handleSubmit,
    reset,
  } = form;

  const { mutate: mutatePostInfo, isSuccess: modifyPostSuccess } = useMutation({
    mutationFn: (mutated: FormData) => {
      console.log(`reset (mutate): ${JSON.stringify(mutated)}`);
      reset(mutated);
      return putPostData(id, mutated);
    },
    onSuccess: () => {
      onDismissForm();
      return queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutate: mutateDeletePost, isSuccess: deletePostSuccess } =
    useMutation({
      mutationFn: async () => {
        const deleted = await deletePost(id);
        if (!deleted) {
          throw new Error(`Failed to delete post id ${id}`);
        }
      },
      onSuccess: () => {
        onDismissForm();
        return queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    });

  const { isSuccess, data: postInfo } = useQueryPostInfo({
    id,
    enabled: !deletePostSuccess && !modifyPostSuccess,
  });

  useEffect(() => {
    if (isSuccess && !initialLoadComplete) {
      const resetData = formDataSchema.parse(postInfo);
      console.log(`reset (useEffect): ${JSON.stringify(resetData)}`);
      reset(resetData);
      setInitialLoadComplete(true);
    }
  }, [isSuccess, initialLoadComplete, reset, postInfo]);

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
          onDismissForm();
        }}
      />
      <ConfirmPostDelete
        open={showConfirmDelete}
        onClose={() => {
          setShowConfirmDelete(false);
        }}
        onConfirm={() => {
          mutateDeletePost();
        }}
      />
      <form>
        <Status />
        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
          <Button
            disabled={isSubmitting}
            onClick={handleSubmit((formData) => {
              mutatePostInfo(formData);
            })}
            variant="contained"
          >
            Save
          </Button>

          <Button
            disabled={isSubmitting}
            onClick={() => {
              setShowConfirmDelete(true);
            }}
            variant="contained"
          >
            Delete Post
          </Button>

          <Button
            disabled={isSubmitting}
            color="warning"
            onClick={() => {
              if (!isDirty) {
                onDismissForm();
              } else {
                setShowConfirmCancel(true);
              }
            }}
            variant="contained"
          >
            Discard
          </Button>
        </div>
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
