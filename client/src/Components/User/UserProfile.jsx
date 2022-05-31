import React, { useState } from "react";
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import NavBar from "../NavBar";
import UserAccount from "./UserAccount";
import classnames from "classnames";
import UserOrders from "./UserOrders";


const UserProfile = () => {
  // State for current active Tab
  const [currentActiveTab, setCurrentActiveTab] = useState("1");

  // Toggle active state for Tab
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };


  return (
    <div>
      <NavBar />
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
                active: currentActiveTab === "1",
              })}
              onClick={() => {
                toggle("1");
              }}
              style={{ cursor: "pointer", color: "black" }}
            >
              My account
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: currentActiveTab === "2",
              })}
              onClick={() => {
                toggle("2");
              }}
              style={{ cursor: "pointer", color: "black" }}
            >
              My orders
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={currentActiveTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <UserAccount />
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <UserOrders />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default UserProfile;
