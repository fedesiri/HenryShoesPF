import React from "react";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { Redirect } from "react-router-dom";
const Home = () => {
  const userInfo = useSelector((state) => state.userInfo);

  const validateIsAuthenticated = useCallback(() => {
    if (!userInfo) {
      return <Redirect to="/signin" />;
    } else {
      return <Redirect to="/" />;
    }
  }, [userInfo]);
  useEffect(() => {
    validateIsAuthenticated();
  }, [validateIsAuthenticated]);
  return (
    <>
      {userInfo && userInfo.roleId === 1 ? (
        <div>
          <h1>Home</h1>
        </div>
      ) : (
        <Redirect to="/signin" />
      )}
    </>
  );
};

export default Home;
