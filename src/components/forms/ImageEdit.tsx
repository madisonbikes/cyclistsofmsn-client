import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { MutableImage } from "../../api/contract";
import { loadImageInfo, putImageData } from "../../api/images";
import { ConfirmLoseChanges } from "../ConfirmLoseChanges";
import { FormTextField } from "../input/FormTextField";

type Props = {
  id: string;
};

const defaultValues: MutableImage = { description: "" };

export const ImageEdit = ({ id }: Props) => {
  const navigate = useNavigate();
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

  const { isSuccess, data: imageInfo } = useQuery(["images", id], async () => {
    const data = await loadImageInfo(id);
    console.log("loading image info " + JSON.stringify(data));
    return data;
  });

  const { mutate: mutateImageInfo, isSuccess: mutationSuccess } = useMutation(
    (imageInfo: MutableImage) => {
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
      console.log("populating image info " + JSON.stringify(imageInfo));
      reset(imageInfo);
      setInitialLoadComplete(true);
    }
  }, [isSuccess, initialLoadComplete, reset, imageInfo]);

  useEffect(() => {
    if (mutationSuccess) {
      navigate("/images");
    }
  }, [mutationSuccess, navigate]);

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
          navigate("/images");
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
              navigate("/images");
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

  return <></>;
};
