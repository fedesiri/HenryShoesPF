import React, { useEffect } from "react";
import { Alert } from "@material-ui/lab";
import { Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      boxShadow: "none",
      marginTop: 10,
    },
    button: {
      boxShadow: "none",
      marginTop: 10,
    },
  }));

//   useEffect(() => {
//     setTimeout(() => {
//       window.location.href = "/cart";
//     }, 2500);
//   });
  const classes = useStyles();

  return (
    <>
      <>
        <div className={classes.root}>
          <Paper elevation={0}>
            <Alert severity="error">
              {/* <img src={toni} alt="toni faro" /> */}
      <div>
        Payment cancelled
        <p>Redirecting to HenryShoes...</p>
      </div>
            </Alert>
            <Button component={Link} to="/" className={classes.button}>
              Go Back
            </Button>
          </Paper>
        </div>
      </>
    </>
  );
};

export default PaymentCancel;
