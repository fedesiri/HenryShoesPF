import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"
import { fetchDataUserUpdated } from "../../redux/actions";



export default function AddressForm() {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    name: "",
    lastname: "",
    address: "",
    address2: "",
    state: "",
    zipcode: "",
    city: "",
  })

useEffect(() => {
  dispatch(fetchDataUserUpdated(userInfo.id))
}, [dispatch, userInfo.id])


const handleOnChange = (e) => {
  setInput({
    ...input,
    [e.target.name]: e.target.value,
  });
}
// console.log(input)

const handleOnSubmit = async (e) => {
  e.preventDefault();
  try {
    let newData = {
      name: input.name || userInfo.name,
      lastname: input.lastname || userInfo.lastname,
      address: input.address || userInfo.address,
      address2: input.address2 || userInfo.address2,
      state: input.state || userInfo.state,
      zipcode: input.zipcode || userInfo.zipcode,
      city: input.city || userInfo.city,
    };
    const response = await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/user/edit/${userInfo.id}`,
      data: newData,
    });
    // console.log(userInfo.id)
    await dispatch(fetchDataUserUpdated(userInfo.id))
    toast(response.data.message);    
    document.getElementById("name").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("address").value = "";
    document.getElementById("address2").value = "";
    document.getElementById("state").value = "";
    document.getElementById("zipcode").value = "";
    document.getElementById("city").value = "";
  } catch (error) {
    console.log(error)
  }
}
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Information
      </Typography>

      {!userInfo ? null : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <label>Name</label>
            <TextField
              required
              id="name"
              name="name"
              onChange={handleOnChange}
              fullWidth
              placeholder={userInfo.name}
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Last name</label>
            <TextField
              required
              id="lastname"
              name="lastname"
              onChange={handleOnChange}
              placeholder={userInfo.lastname}
              fullWidth
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <label>Address 1</label>
            <TextField
              required
              id="address"
              name="address"
              onChange={handleOnChange}
              placeholder={userInfo.address}
              fullWidth
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12}>
          <label>Address 2</label>
            <TextField
              id="address2"
              name="address2"
              placeholder={userInfo.address2}
              onChange={handleOnChange}
              fullWidth
              autoComplete="shipping address-line2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>City</label>
            <TextField
              required
              id="city"
              name="city"
              placeholder={userInfo.city}
              onChange={handleOnChange}
              fullWidth
              autoComplete="shipping address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>State/Province/Region</label>
            <TextField
              id="state"
              name="state"
              placeholder={userInfo['province/region']}
              onChange={handleOnChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Zip / Postal code</label>
            <TextField
              required
              id="zipcode"
              name="zipcode"
              placeholder={userInfo.zipcode}
              onChange={handleOnChange}
              fullWidth
              autoComplete="shipping postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button style={{ backgroundColor: "black", color: "white", borderRadius: "0.75rem" }} onClick={(e) => handleOnSubmit(e)} variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      )}
      <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
        />
    </React.Fragment>
  );
}
