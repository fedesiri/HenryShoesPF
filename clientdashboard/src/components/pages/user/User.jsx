import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
  } from "@material-ui/icons";
import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import "./user.css";
  import axios from 'axios'
  import { useParams } from "react-router-dom";
  import FingerprintIcon from '@material-ui/icons/Fingerprint';
  import { ToastContainer, toast } from "react-toastify";
  
  export default function User() {
    const {userId} = useParams()
    const [user, setUser] = useState({})    

    async function findUser(){
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`);
        return response.data
      } catch (err) {
        console.error(err)
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
      async function fetchData(){
        const result = await findUser()
        setUser(result)
      }
      fetchData()
    }, [])

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
      console.log(input)
      const response = await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}/user/edit/${userId}`,
        data: {
          name: input.name !== "" ? input.name : user.name,
          lastname: input.lastname !== "" ? input.lastname : user.lastname,
          email: input.email !== "" ? input.email : user.email,
          roleId: input.roleId !== "" ? input.roleId : user.roleId,
          address: input.address !== "" ? input.address : user.address,
        },
      });
      console.log(input, 'despues de que termine')
      toast(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };


    return (
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
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          {/* <Link to="/newUser">
            <button className="userAddButton">Create</button>
          </Link> */}
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <div className="userShowTopTitle">
                <span className="userShowUsername">{user.name}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{user.name +" "+ user.lastname}</span>
              </div>
              <div className="userShowInfo">
                <FingerprintIcon className="userShowIcon" />
                <span className="userShowInfoTitle">{user.id}</span>
              </div>
              
              {/* <span className="userShowTitle">Contact Details</span> */}
              {/* <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">+1 123 456 67</span>
              </div> */}
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">Role: {user.roleId}</span>
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
              </div>
              <div className="userUpdateRight">
                {/* <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div> */}
                <button onClick={(e) => HandleOnSubmit(e)} className="userUpdateButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }