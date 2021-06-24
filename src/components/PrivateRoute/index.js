import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "../../context/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAdmin, isAuthenticated } = useContext(Context);
  return (
    <Route {...rest} render={(props) =>
        isAdmin() ? (
          <Component {...props} />
        ) : isAuthenticated() ? (
          <Redirect to="/404" />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
