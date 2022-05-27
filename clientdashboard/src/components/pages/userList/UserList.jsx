import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { CircularProgress } from "@material-ui/core"
import { ToastContainer, toast } from "react-toastify";

export default function UserList() {
  const [data, setData] = useState([]);

  async function getAllUsers(){
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user`);
      return response.data
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    async function fetchData (){
      const result = await getAllUsers()
      setData(result)
    }
    fetchData()
  }, []);
  

  const handleDelete = async (id) => {
    try{
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/user/delete/${id}`);
      setData(data.filter((item) => item.id !== id));
      toast(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  const columns = [
    { field: "name", headerName: "Name", width: 150},
    { field: "lastname", headerName: "Last name", width: 150},
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", width: 150 },
    { field: "roleId", headerName: "Role", width: 150, renderCell: (params) => {
      if(params.row.roleId === 1){
        return "admin"
      } else {
        return "user"
      }      
    } },    
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
  if(!data.length){
    return <CircularProgress style={{ position: "absolute", marginTop: "60px", marginLeft: "auto", marginRight: "auto", left: "0", right: "0",textAlign: "center" }} />
  }
  return (

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
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
      />
    </div>
  );
}

