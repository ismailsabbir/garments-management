import React, { useContext } from "react";
import { AuthContext } from "../Context/UserContext";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../CommonComponents/Loading/Loading";

const EmployeePrivetRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const loacation = useLocation();
  if (loading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }
  if (user?.uid) {
    return children;
  }
  return (
    <Navigate
      to="/employee/login"
      state={{ from: loacation }}
      replace
    ></Navigate>
  );
};

export default EmployeePrivetRoutes;
