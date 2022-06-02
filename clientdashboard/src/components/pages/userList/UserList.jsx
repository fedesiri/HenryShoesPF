import "./userList.css";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Typography } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function UserList() {
  const [data, setData] = useState([]);
  const userInfo = useSelector((state) => state.userInfo);

  async function getAllUsers() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const result = await getAllUsers();
      setData(result);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/user/delete/${id}`
      );
      setData(data.filter((item) => item.id !== id));
      toast(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "lastname", headerName: "Last name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", width: 150 },
    {
      field: "roleId",
      headerName: "Role",
      width: 150,
      renderCell: (params) => {
        if (params.row.roleId === 1) {
          return "admin";
        } else {
          return "user";
        }
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  if (!data.length) {
    return (
      <CircularProgress
        style={{
          position: "absolute",
          marginTop: "60px",
          marginLeft: "auto",
          marginRight: "auto",
          left: "0",
          right: "0",
          textAlign: "center",
        }}
      />
    );
  }
  return (
    <>
      <div className="userContainer">
        {userInfo && userInfo.roleId === 1 ? (
          <>
            <div className="userList_pageTitle">
              <Typography variant="body1">Dashboard</Typography>
              <Typography variant="body1" style={{color: "grey"}}> / Users</Typography>
            </div>
            <div className="userList_container">
              <div className="userList">
                <ToastContainer
                  position="top-center"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  draggable
                />
                <DataGrid
                  style={{ heigth: "100vh" }}
                  rows={data}
                  disableSelectionOnClick
                  columns={columns}
                  pageSize={10}
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <Redirect to="/signin" />
        )}
      </div>
    </>
  );
}
