import React from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import Review from "./Review";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../NavBar";
import { placeOrder } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["User data", "Review your order"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;
    case 2:
      return <Review />;
    case 3:
      return <Review />;

    default:
      throw new Error("Unknown step");
  }
}

// const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const VerifyPay = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const products = useSelector((state) => state.shoppingCartUserRegister);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const getTotal = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  };
  const total = getTotal();
  console.log(total)

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep === 3) {
      setActiveStep(1);
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   dispatch(
      placeOrder({
        email: userInfo.email,
        data: products,
      })
    );
    document.getElementById("pay").style.display = "block";

  };

   const handlePay = async () => {
     console.log("pay", total)
  if (userInfo) {
   const {data: {links}} = await axios.post(`${process.env.REACT_APP_API_URL}/payment/create-order`, { email: userInfo.email, total: total });
   var redirectUrl = links[1].href
   console.log(redirectUrl)
   window.location.href = redirectUrl
  } else {
    console.log("no hay usuario")
  navigate("/profile");
  // aqui agregar opcion para abrir el modal de login
   }
  }

  return (
    <>
      <NavBar />
      <React.Fragment>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          className={classes.appBar}
        ></AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {getStepContent(activeStep)}

              {userInfo && (
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep === 2 ? null : (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={
                        activeStep === steps.length - 1
                          ? handleSubmit
                          : handleNext
                      }
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  )}
                </div>
              )}
            </React.Fragment>

            <React.Fragment>
              {activeStep === steps.length - 1 ? (
                <button id="pay" style={{display: "none" }} onClick={handlePay}  >Pay</button>
              ) : null}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    </>
  );
};

export default VerifyPay;
