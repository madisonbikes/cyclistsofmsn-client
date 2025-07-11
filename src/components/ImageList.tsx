import { useNavigate, Link as RouterLink } from "react-router";
import { IconButton, LinearProgress, Link } from "@mui/material";
import { Check, DeleteForever, Edit } from "@mui/icons-material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  type GridInitialState,
} from "@mui/x-data-grid";
import { RawImage } from "./RawImage";
import { useState } from "react";
import { DeleteImage } from "./ImageDelete";
import { useImageList } from "../api/imageQueries";
import type { Image } from "../api/contract";

export const ImageList = () => {
  const [deleteImageId, setDeleteImageId] = useState<string | undefined>(
    undefined,
  );
  const navigate = useNavigate();

  const { data, isLoading, isRefetching } = useImageList();
  if (isLoading) return <div>Loading...</div>;

  const onModifyClicked = (id: string) => {
    void navigate(`/images/${id}`);
  };

  if (!data) {
    throw new Error("data should always exist");
  }

  const columns: GridColDef<Image>[] = [
    { field: "id", headerName: "ID", width: 240 },
    {
      field: "image",
      sortable: false,
      headerName: "Image",
      width: 108,
      renderCell: (params: GridRenderCellParams<Image, string>) => {
        const id = params.row.id;
        return (
          <Link component={RouterLink} to={`/images/${id}`}>
            <RawImage id={id} width={96} height={72} />
          </Link>
        );
      },
    },
    { field: "filename", headerName: "Filename", width: 200 },
    { field: "description", headerName: "Description", width: 400 },
    {
      field: "hidden",
      headerName: "Hidden",
      width: 100,
      renderCell: (params: GridRenderCellParams<Image, boolean>) => {
        if (params.value === true) return <Check />;
        else return null;
      },
    },
    {
      field: "buttons",
      sortable: false,
      headerName: "Ops",
      renderCell: (params: GridRenderCellParams<Image>) => (
        <>
          <IconButton
            onClick={() => {
              onModifyClicked(params.row.id);
            }}
          >
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
  const initialState = {
    columns: { columnVisibilityModel: { id: false } },
    pagination: { paginationModel: { pageSize: 25 } },
  } satisfies GridInitialState;

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
        onClose={() => {
          setDeleteImageId(undefined);
        }}
      />
    </>
  );
};
