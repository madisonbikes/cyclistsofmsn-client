import { useNavigate, Link as RouterLink } from "react-router-dom";
import { IconButton, LinearProgress, Link } from "@mui/material";
import { Check, DeleteForever, Edit } from "@mui/icons-material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import { RawImage } from "./RawImage";
import { useState } from "react";
import { DeleteImage } from "./ImageDelete";
import { useImageList } from "../api/imageQueries";

export const ImageList = () => {
  const [deleteImageId, setDeleteImageId] = useState<string | undefined>(
    undefined,
  );
  const navigate = useNavigate();

  const { data, isLoading, isRefetching } = useImageList();
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
      renderCell: (params: GridRenderCellParams) => (
        <Link component={RouterLink} to={`/images/${params.id}`}>
          <RawImage id={String(params.id)} width={96} height={72} />
        </Link>
      ),
    },
    { field: "filename", headerName: "Filename", width: 200 },
    { field: "description", headerName: "Description", width: 400 },
    {
      field: "hidden",
      headerName: "Hidden",
      width: 100,
      renderCell: (
        params: GridRenderCellParams<GridValidRowModel, boolean>,
      ) => {
        if (params.value === true) return <Check />;
        else return null;
      },
    },
    {
      field: "buttons",
      sortable: false,
      headerName: "Ops",
      renderCell: (params: GridRenderCellParams) => (
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
    pagination: { paginationModel: { pageSize: 25 } },
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
