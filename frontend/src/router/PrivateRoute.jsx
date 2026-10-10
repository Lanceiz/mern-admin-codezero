import React from "react";
import { motion } from "framer-motion";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import * as authService from "@/auth";
import { selectCurrentAdminRole } from "@/redux/auth/selectors";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const role = useSelector(selectCurrentAdminRole);
  const { allowedRoles, ...routeProps } = rest;
  const config = {
    type: "spring",
    damping: 20,
    stiffness: 100,
  };
  return (
    // Show the component only when the admin is logged in
    // Otherwise, redirect the admin to /signin page

    <Route
      {...routeProps}
      render={(props) =>
        authService.token.get() ? (
          allowedRoles && !allowedRoles.includes(role) ? (
            <Redirect to="/" />
          ) : (
            <motion.div
              transition={config}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              <Component {...props} />
            </motion.div>
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
