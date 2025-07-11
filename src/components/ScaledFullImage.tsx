import { useImageInfo } from "../api/imageQueries";
import { useWindowDimensions } from "../common";
import { RawImage } from "./RawImage";
import { type Image } from "../api/contract";

interface Props {
  id: string | undefined;
}
export const ScaledFullImage = (props: Props) => {
  const { id } = props;
  const windowDimensions = useWindowDimensions();
  const { data: metadata, isLoading } = useImageInfo(id);
  // FIXME isloading always false?
  if (id === undefined || metadata === undefined || (isLoading as boolean)) {
    return <></>;
  }

  const newMetadata = calculateScaledImageSize({ metadata, windowDimensions });
  return <RawImage id={id} {...newMetadata} />;
};

const calculateScaledImageSize = (props: {
  metadata: Image;
  windowDimensions: { width: number; height: number };
}) => {
  const { metadata, windowDimensions } = props;
  if (metadata.width === undefined || metadata.height === undefined) {
    return metadata;
  }

  const newHeight = Math.floor(
    Math.min(metadata.height, windowDimensions.height * 0.6),
  );
  const ratio = metadata.height / newHeight;
  const newWidth = Math.floor(metadata.width / ratio);
  return { width: newWidth, height: newHeight };
};
