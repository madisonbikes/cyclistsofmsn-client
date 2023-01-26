import { Images } from "../api/contract";

type Props = {
  id: string | undefined;
  width?: number;
  height?: number;
};
export const RawImage = (props: Props) => {
  const { id } = props;
  if (!id) {
    return <></>;
  }
  const uri = Images.binaryUri(id, props);
  return <img src={uri} alt="cyclist" />;
};
