import {
  LocationSearching,
  MailOutline,
  PermIdentity,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import "./user.css";
import axios from "axios";
import { Redirect, useParams } from "react-router-dom";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

export default function User() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const userInfo = useSelector((state) => state.userInfo);

  async function findUser() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${userId}`
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    id: "",
    email: "",
    roleId: "",
    address: "",
  });

  useEffect(() => {
    async function fetchData() {
      const result = await findUser();
      setUser(result);
    }
    fetchData();
  }, []);

  const HandleOnChange = (e) => {
    setInput((PreValue) => ({
      ...PreValue,
      [e.target.name]: e.target.value,
    }));
    // setError(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  };

  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    // const form = document.getElementById("CreateForm");
    try {
      let newData = {
        name: input.name || user.name,
        lastname: input.lastname || user.lastname,
        email: input.email || user.email,
        roleId: input.roleId || user.roleId,
        address: input.address || user.address,
      };
      const response = await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}/user/edit/${userId}`,
        data: newData,
      });
      setUser({ ...user, ...newData });
      toast(response.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <div className="userContainer">
        {userInfo && userInfo.roleId === 1 ? (
          <>
            <div className="userList_pageTitle">
              <Typography variant="body1">Dashboard</Typography>
              <Typography variant="body1" style={{ color: "grey" }}>
                {" "}
                / Edit User
              </Typography>
            </div>
            <div className="user">
              <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
              />
              <div className="innerContainer">
                <div className="userShow">
                  <div className="userShowTop">
                    <div className="userShowTopTitle">
                      <span className="userUpdateTitle">{user.name}</span>
                    </div>
                  </div>
                  <div className="userShowBottom">
                    <span className="userShowTitle">Account Details</span>
                    <div className="userShowInfo">
                      <PermIdentity className="userShowIcon" />
                      <span className="userShowInfoTitle">
                        {user.name + " " + user.lastname}
                      </span>
                    </div>
                    <div className="userShowInfo">
                      <FingerprintIcon className="userShowIcon" />
                      <span className="userShowInfoTitle">{user.id}</span>
                    </div>

                    <div className="userShowInfo">
                      <MailOutline className="userShowIcon" />
                      <span className="userShowInfoTitle">{user.email}</span>
                    </div>
                    <div className="userShowInfo">
                      <PermIdentity className="userShowIcon" />
                      <span className="userShowInfoTitle">
                        Role: {user.roleId}
                      </span>
                    </div>
                    <div className="userShowInfo">
                      <LocationSearching className="userShowIcon" />
                      <span className="userShowInfoTitle">{user.address}</span>
                    </div>
                  </div>
                </div>
                <div className="userUpdate">
                  <span className="userUpdateTitle">Edit</span>
                  <form className="userUpdateForm">
                    <div className="userUpdateLeft">
                      <div className="userUpdateItem">
                        <label>Name</label>
                        <input
                          name="name"
                          id="name"
                          type="text"
                          placeholder={user.name}
                          className="userUpdateInput"
                          onChange={HandleOnChange}
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Last name</label>
                        <input
                          name="lastname"
                          id="lastname"
                          type="text"
                          placeholder={user.lastname}
                          className="userUpdateInput"
                          onChange={HandleOnChange}
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Email</label>
                        <input
                          name="email"
                          id="email"
                          type="text"
                          placeholder={user.email}
                          className="userUpdateInput"
                          onChange={HandleOnChange}
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Role</label>
                        <input
                          name="roleId"
                          id="roleId"
                          type="number"
                          min="1"
                          max="2"
                          placeholder={user.roleId}
                          className="userUpdateInput"
                          onChange={HandleOnChange}
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Address</label>
                        <input
                          name="address"
                          id="address"
                          type="text"
                          placeholder={user.address}
                          className="userUpdateInput"
                          onChange={HandleOnChange}
                        />
                      </div>
                      <button
                        onClick={(e) => HandleOnSubmit(e)}
                        className="userUpdateButton"
                      >
                        Update
                      </button>
                    </div>
                  
                  </form>
                </div>
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
