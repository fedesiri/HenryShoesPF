import React from "react";
import "./topbar.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { postLogOut } from "../../redux/actions";
import { Link, Redirect } from "react-router-dom";

// import { NotificationsNone, Language, Settings } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Topbar() {
  const classes = useStyles();
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch()

  

  const signOutHandler = () => {
    dispatch(postLogOut());
    window.localStorage.removeItem("userInfo");
    window.location.href = "/signin";
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
         <Link style={{textDecoration: "none", color: "white"}} to={userInfo ? "/" : "/signin"}>
         <span className="logo">Henry Shoes</span>
         </Link>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            {userInfo && userInfo.roleId === 1 ? (
              <Button
              onClick={signOutHandler}
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<ExitToAppIcon />}
              >
                Log out
              </Button>
            ) : null}
          </div> */}
        </div>
      </div>
    </div>
  );
}
