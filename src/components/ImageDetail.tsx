import { useParams, useNavigate } from "react-router-dom";
import { ImageEdit } from "./forms/ImageEdit";
import { ScaledFullImage } from "./ScaledFullImage";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useImageInfo } from "../api/imageQueries";
import { formatDate } from "../common/date";

export const ImageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (id === undefined) {
    throw new Error("requires id param");
  }
  return (
    <>
      <ScaledFullImage id={id} />
      <ImageMetadataTable id={id} />
      <ImageEdit id={id} navigateUp={() => navigate(-1)} />
    </>
  );
};

type ImageMetadataTableProps = {
  id: string | undefined;
};
const ImageMetadataTable = ({ id }: ImageMetadataTableProps) => {
  const { data, isLoading } = useImageInfo(id);
  if (isLoading || data == null) return <></>;

  type Metadata = { description: string; value: string };

  const rows = new Array<Metadata>();
  if (data.exif_createdon != null) {
    rows.push({
      description: "Created On",
      value: formatDate(data.exif_createdon),
    });
  }
  rows.push({
    description: "Uploaded On",
    value: formatDate(data.fs_timestamp),
  });
  if (data.width != null && data.height != null) {
    rows.push({
      description: "Dimensions",
      value: `${data.width} x ${data.height}`,
    });
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="a dense table">
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.description}>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
