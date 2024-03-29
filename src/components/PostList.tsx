import { useQueryPostList } from "../api/postQueries";
import { IconButton, LinearProgress, Link } from "@mui/material";
import { RawImage } from "./RawImage";
import { Post } from "../api/contract";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import { Edit } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { formatTimestamp } from "../common/date";

export const PostList = () => {
  const navigate = useNavigate();
  const { data, isLoading, isRefetching } = useQueryPostList();
  if (isLoading) return <>Loading...</>;
  if (!data) {
    throw new Error("data should always exist");
  }

  const onModifyClicked = (id: string) => {
    navigate(`/posts/${id}`);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 240 },
    {
      field: "imageid",
      headerName: "Image",
      width: 108,
      sortable: false,
      renderCell: (params) => {
        const imageId = params.row.imageid;
        if (imageId === undefined) {
          return <></>;
        } else {
          return (
            <Link component={RouterLink} to={`/images/${imageId}`}>
              <RawImage id={String(imageId)} width={96} height={72} />
            </Link>
          );
        }
      },
    },
    {
      field: "flag",
      headerName: "Status",
      width: 100,
      valueGetter: (params) => params.row.status.flag,
    },
    {
      field: "timestamp",
      headerName: "When",
      width: 250,
      valueFormatter: (params) => formatTimestamp(params.value),
    },
    {
      field: "buttons",
      headerName: "Ops",
      sortable: false,
      renderCell: (params: GridRenderCellParams<Post>) => (
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
    pagination: { paginationModel: { pageSize: 25 } },
    sorting: { sortModel: [{ field: "timestamp", sort: "desc" }] },
  };

  return (
    <>
      {isRefetching ? (
        <LinearProgress variant="determinate" value={0} />
      ) : (
        <LinearProgress variant="determinate" value={100} />
      )}
      <h2>Posts</h2>
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
