import { useImageInfo } from "../api/imageQueries";
import { useWindowDimensions } from "../common/windowDimensions";
import { RawImage } from "./RawImage";
import { Image } from "../api/contract";

type Props = {
  id: string | undefined;
};
export const ScaledFullImage = (props: Props) => {
  const { id } = props;
  const windowDimensions = useWindowDimensions();

  const { data: metadata, isLoading } = useImageInfo(id);
  if (id === undefined || metadata === undefined || isLoading) {
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
