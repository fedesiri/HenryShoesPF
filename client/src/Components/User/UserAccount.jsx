import React, { useEffect, useState } from "react";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./userAccount.css";
import { fetchUserAuthenticated } from "../../redux/actions";

const UserAccount = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  // console.log(user)

  
  async function findUser(){
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userInfo.id}`);
      return response.data
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    async function fetchData(){
      const result = await findUser()
      setUser(result)
    }
    fetchData()
  }, [])

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    id: "",
    email: "",
    address: "",
    password: "",
    passwordConfirm: "",
  });
  //   const [errors, setErrors] = useState({});

  const expression = {
    regexName: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
    regexEmail: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
    regexLetra: /[A-z]/,
    regexMayuscula: /[A-Z]/,
    regexNumero: /\d/,
    regexLetrasYNumeros: /[^a-zA-Z0-9]/,
    regexPassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };


  const HandleOnChange = (e) => {
    setInput((PreValue) => ({
      ...PreValue,
      [e.target.name]: e.target.value,
    }));
  };

  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo.name)
    try {
      let newData = {
        name: input.name || userInfo.name,
        lastname: input.lastname || userInfo.lastname,
        address: input.address || userInfo.address,
        password: input.passwordConfirm || userInfo.passwordConfirm,
      };
      const response = await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}/user/edit/${userInfo.id}`,
        data: newData,
      });
      setUser({ ...user, ...newData });
      document.getElementById("name").value = "";
      document.getElementById("lastname").value = "";
      document.getElementById("address").value = "";
      document.getElementById("password").value = "";
      document.getElementById("passwordConfirm").value = "";
      toast(response.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const showPassword = () => {
    var tipo = document.getElementById("password");
    if (tipo.type === "password") {
      tipo.type = "text";
    } else {
      tipo.type = "password";
    }
  };
  const showConfirmPassword = () => {
    var tipo = document.getElementById("passwordConfirm");
    if (tipo.type === "password") {
      tipo.type = "text";
    } else {
      tipo.type = "password";
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
        {/* <Link to="/newUser">
        <button className="userAddButton">Create</button>
      </Link> */}
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">{userInfo.name}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">
                {userInfo.name + " " + userInfo.lastname}
              </span>
            </div>
            <div className="userShowInfo">
              <FingerprintIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{userInfo.id}</span>
            </div>

            {/* <span className="userShowTitle">Contact Details</span> */}
            {/* <div className="userShowInfo">
            <PhoneAndroid className="userShowIcon" />
            <span className="userShowInfoTitle">+1 123 456 67</span>
          </div> */}
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{userInfo.email}</span>
            </div>
            {/* <div className="userShowInfo">
            <PermIdentity className="userShowIcon" />
            <span className="userShowInfoTitle">Role: {userInfo.roleId}</span>
          </div> */}
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{userInfo.address}</span>
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
                  placeholder={userInfo.name}
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
                  placeholder={userInfo.lastname}
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
                  placeholder={userInfo.email}
                  className="userUpdateInput"
                  onChange={HandleOnChange}
                  disabled={true}
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
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder=""
                  className="userUpdateInput"
                  onChange={HandleOnChange}
                />
                {input.password.length > 0 &&
                input.password.length < 8 &&
                !expression.regexPassword.test(input.password) ? (
                  <span style={{ color: "red" }}>
                    Minimum eight characters, at least one capital letter and
                    one number{" "}
                  </span>
                ) : null}
                <div
                  style={{
                    backgroundColor: "#303030",
                    width: "100px",
                    height: "25px",
                    alignItems: "center",
                    borderRadius: "5px",
                    marginTop: "5px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      cursor: "pointer",
                      fontSize: "12px",
                      color: "white",
                    }}
                    onClick={showPassword}
                  >
                    Show password
                  </span>
                </div>
              </div>
              <div className="userUpdateItem">
                <label>Confirm new Password</label>
                <input
                  name="passwordConfirm"
                  id="passwordConfirm"
                  type="password"
                  placeholder=""
                  className="userUpdateInput"
                  onChange={HandleOnChange}
                />
                {input.password !== input.passwordConfirm ? (
                  <span style={{ color: "red" }}>Passwords don't match.</span>
                ) : null}
                <div
                  style={{
                    backgroundColor: "#303030",
                    width: "130px",
                    height: "25px",
                    alignItems: "center",
                    borderRadius: "5px",
                    marginTop: "5px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      cursor: "pointer",
                      fontSize: "12px",
                      color: "white",
                    }}
                    onClick={showConfirmPassword}
                  >
                    Show confirm password
                  </span>
                </div>
              </div>
            </div>
            <div className="userUpdateRight">
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
  );
};

export default UserAccount;
