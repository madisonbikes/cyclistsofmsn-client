import { loadImageList } from "../api/images";
import { ListItem } from "@mui/material";
import { useQuery } from "react-query";
import { Image } from "../api/contract/types";

export const ImageList = () => {
  const { data, isLoading, isError, error } = useQuery<Image[], Error>({
    queryKey: "imageList",
    queryFn: () => loadImageList(),
  });
  if (isLoading) return <>Loading...</>;
  if (isError) return <>An error has occurred {error.message}</>;
  return (
    <ul>
      {data?.map((image) => {
        return (
          <ListItem key={image.id}>
            <>
              <img src={`/api/v1/images/${image.id}?width=96`} alt="cyclist" />
              {image.description}
            </>
          </ListItem>
        );
      })}
    </ul>
  );
};
