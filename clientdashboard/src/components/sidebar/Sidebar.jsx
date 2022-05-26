import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  Storefront,
  AttachMoney,
} from "@material-ui/icons";
import CreateIcon from '@material-ui/icons/Create';
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link style={{textDecoration: "none"}} to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <Link style={{textDecoration: "none"}} to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link style={{textDecoration: "none"}} to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link style={{textDecoration: "none"}} to="/create-products" className="link">
              <li className="sidebarListItem">
                <CreateIcon className="sidebarIcon" />
                Create Products
              </li>
            </Link>
            <Link style={{textDecoration: "none"}} to="/create-oferta" className="link">
              <li className="sidebarListItem">
                <CreateIcon className="sidebarIcon" />
                Create Ofert and BetSellers
              </li>
            </Link>
            {/* <Link to="/edit-product" className="link">
              <li className="sidebarListItem">
                <CreateIcon className="sidebarIcon" />
                Edit Product
              </li>
            </Link> */}
            <Link style={{textDecoration: "none"}} to="/create-category" className="link">
              <li className="sidebarListItem">
                <CreateIcon className="sidebarIcon" />
                Create Category
              </li>
            </Link>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}