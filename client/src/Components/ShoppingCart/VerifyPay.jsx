import React from "react";
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
import "./verifyPay.css"
import Footer from "../Footer";


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
  const products = useSelector((state) => state.AuxShopingCartBack);
console.log(products)
  // const products = useSelector((state) => state.shoppingCartUserRegister);
  // console.log( "verifiqueee",products.newArray)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTotal = () => {
    let total = 0;
    products.newArray.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  };
  const total =  getTotal();
console.log(total)
=


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
        data: products.newArray,
      })
    );
    document.getElementById("pay").style.display = "block";
  };

  const handlePay = async () => {
    if (userInfo) {
      const {
        data: { links },
      } = await axios.post(
        `${process.env.REACT_APP_API_URL}/payment/create-order`,
        { email: userInfo.email, total: total }
      );
      var redirectUrl = links[1].href;
      window.location.href = redirectUrl;
    } else {
      navigate("/profile");
      // aqui agregar opcion para abrir el modal de login
    }
  };

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
                      style={{ backgroundColor: "black", color: "white", borderRadius: "0.75rem" }}
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
                // <button id="pay" style={{display: "none" }} onClick={handlePay}>Pay </button>
                <button id="pay" style={{display: "none" }} onClick={handlePay} className="paypal-buy-now-button">
                  <span id="span-btn">Buy now with</span>
                  <svg
                    className="svg-btn"
                    aria-label="PayPal"
                    xmlns="http://www.w3.org/2000/svg"
                    width="90"
                    height="33"
                    viewBox="34.417 0 90 33"
                  >
                    <path
                      fill="#253B80"
                      d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zM66.654 13.075h-3.275a.57.57 0 0 0-.563.481l-.146.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.03.998 1.177 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.804l1.77-11.208a.566.566 0 0 0-.56-.657zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.392-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zM84.096 13.075h-3.291a.955.955 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678H69.41a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.469-.895z"
                    ></path>
                    <path
                      fill="#179BD7"
                      d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.767 17.537a.57.57 0 0 0 .563.658h3.51a.665.665 0 0 0 .656-.563l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.141-2.694-1.745-4.983-1.745zm.789 6.405c-.373 2.454-2.248 2.454-4.063 2.454h-1.031l.726-4.583a.567.567 0 0 1 .562-.481h.474c1.233 0 2.399 0 3.002.704.358.42.467 1.044.33 1.906zM115.434 13.075h-3.272a.566.566 0 0 0-.562.481l-.146.916-.229-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.312 6.586-.312 1.918.131 3.752 1.22 5.03 1 1.177 2.426 1.666 4.125 1.666 2.916 0 4.532-1.875 4.532-1.875l-.146.91a.57.57 0 0 0 .563.66h2.949a.95.95 0 0 0 .938-.804l1.771-11.208a.57.57 0 0 0-.564-.657zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.483-.574-.666-1.392-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317zM119.295 7.23l-2.807 17.858a.569.569 0 0 0 .562.658h2.822c.469 0 .866-.34.938-.803l2.769-17.536a.57.57 0 0 0-.562-.659h-3.16a.571.571 0 0 0-.562.482z"
                    ></path>
                  </svg>
                </button>
              ) : null}
            </React.Fragment>
          </Paper>
        </main>

      </React.Fragment>
      <Footer/>
    </>
  );
};

export default VerifyPay;
