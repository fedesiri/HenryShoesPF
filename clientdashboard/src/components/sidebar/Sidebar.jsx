import "./sidebar.css";
import { LineStyle, PermIdentity, Storefront } from "@material-ui/icons";
import CreateIcon from "@material-ui/icons/Create";
import StoreIcon from "@material-ui/icons/Store";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const userInfo = useSelector((state) => state.userInfo);
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
                      Create Products
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
                      Create Category
                    </li>
                  </NavLink>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to="/create-brand"
                    className="link"
                  >
                    <li className="sidebarListItem">
                      <CreateIcon className="sidebarIcon" />
                      Create Brand
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
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
