import "./sidebar.css";
import { LineStyle, PermIdentity, Storefront } from "@material-ui/icons";
import CreateIcon from "@material-ui/icons/Create";
import StoreIcon from "@material-ui/icons/Store";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postLogOut } from "../../redux/actions";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
export default function Sidebar() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.userInfo);

  const signOutHandler = () => {
    dispatch(postLogOut());
    window.localStorage.removeItem("userInfo");
    window.location.href = "/signin";
  };
  return (
    <>
      {userInfo && userInfo.roleId === 1 ? (
        <>
          <div className="sidebar">
            <div className="sidebarWrapper">
              <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to="/"
                    className="active-link"
                  >
                    <li className="sidebarListItem">
                      <LineStyle className="sidebarIcon" />
                      Home
                    </li>
                  </NavLink>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to="/users"
                    className="active-link"
                  >
                    <li className="sidebarListItem">
                      <PermIdentity className="sidebarIcon" />
                      Users
                    </li>
                  </NavLink>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to="/products"
                    className="active-link"
                  >
                    <li className="sidebarListItem">
                      <Storefront className="sidebarIcon" />
                      Products
                    </li>
                  </NavLink>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to="/create-products"
                    className="link"
                  >
                    <li className="sidebarListItem">
                      <CreateIcon className="sidebarIcon" />
                      Add Products
                    </li>
                  </NavLink>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to="/onsale-bestsellers"
                    className="link"
                  >
                    <li className="sidebarListItem">
                      <LoyaltyIcon className="sidebarIcon" />
                      Products on Sale & bestsellers
                    </li>
                  </NavLink>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to="/create-category"
                    className="link"
                  >
                    <li className="sidebarListItem">
                      <CreateIcon className="sidebarIcon" />
                      Add Category
                    </li>
                  </NavLink>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to="/create-brand"
                    className="link"
                  >
                    <li className="sidebarListItem">
                      <CreateIcon className="sidebarIcon" />
                      Add Brand
                    </li>
                  </NavLink>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to="/orders"
                    className="link"
                  >
                    <li className="sidebarListItem">
                      <StoreIcon className="sidebarIcon" />
                      Orders
                    </li>
                  </NavLink>
                  <li>
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
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
