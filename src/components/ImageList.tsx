import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useQuery } from "react-query";
import { IconButton, LinearProgress, Link } from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import { loadImageList } from "../api/images";
import { RawImage } from "./RawImage";
import { Image } from "../api/contract";
import { useState } from "react";
import { DeleteImage } from "./ImageDelete";

export const ImageList = () => {
  const [deleteImageId, setDeleteImageId] = useState<string | undefined>(
    undefined
  );
  const navigate = useNavigate();

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["images"],
    queryFn: () => loadImageList(),
  });
  if (isLoading) return <div>Loading...</div>;

  const onModifyClicked = (id: string) => {
    navigate(`/images/${id}`);
  };

  if (!data) {
    throw new Error("data should always exist");
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 240 },
    {
      field: "image",
      sortable: false,
      headerName: "Image",
      width: 108,
      renderCell: (params: GridRenderCellParams<Image>) => (
        <Link component={RouterLink} to={`/images/${params.id}`}>
          <RawImage id={String(params.id)} width={96} height={72} />
        </Link>
      ),
    },
    { field: "filename", headerName: "Filename", width: 200 },
    { field: "description", headerName: "Description", width: 400 },
    {
      field: "buttons",
      sortable: false,
      headerName: "Ops",
      renderCell: (params: GridRenderCellParams<Image>) => (
        <>
          <IconButton onClick={() => onModifyClicked(params.row.id)}>
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => {
              setDeleteImageId(params.row.id);
            }}
          >
            <DeleteForever />
          </IconButton>
        </>
      ),
    },
  ];
  const initialState: GridInitialStateCommunity = {
    columns: { columnVisibilityModel: { id: false } },
    pagination: { pageSize: 25 },
  };

  return (
    <>
      {isRefetching ? (
        <LinearProgress variant="determinate" value={0} />
      ) : (
        <LinearProgress variant="determinate" value={100} />
      )}
      <h2>Images</h2>
      <div
        style={{
          width: "100%",
          height: 800,
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          getRowHeight={() => "auto"}
          initialState={initialState}
        />
      </div>
      <DeleteImage
        imageId={deleteImageId}
        onClose={() => setDeleteImageId(undefined)}
      />
    </>
  );
};
