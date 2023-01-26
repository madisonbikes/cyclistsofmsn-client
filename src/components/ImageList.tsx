import { loadImageList } from "../api/images";
import { IconButton, Link } from "@mui/material";
import { useQuery } from "react-query";
import { Image } from "../api/contract";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Edit } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import { RawImage } from "./RawImage";

export const ImageList = () => {
  const { data, isLoading, isError, error } = useQuery<Image[], Error>({
    queryKey: "imageList",
    queryFn: () => loadImageList(),
  });
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error has occurred {error.message}</div>;

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
      headerName: "Image",
      width: 108,
      renderCell: (params: GridRenderCellParams<Image>) => (
        <Link component={RouterLink} to={`/images/${params.id}`}>
          <RawImage id={String(params.id)} width={96} />
        </Link>
      ),
    },
    { field: "filename", headerName: "Filename", width: 200 },
    { field: "description", headerName: "Description", width: 400 },
    {
      field: "buttons",
      headerName: "Ops",
      renderCell: (params: GridRenderCellParams<Image>) => (
        <>
          <IconButton onClick={() => onModifyClicked(params.row.id)}>
            <Edit />
          </IconButton>
        </>
      ),
    },
  ];
  const initialState: GridInitialStateCommunity = {
    columns: { columnVisibilityModel: { id: false } },
  };

  return (
    <>
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
    </>
  );
};
