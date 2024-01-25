import React, { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../CommonComponents/Loading/Loading";
import useEmployee from "../../Hooks/useEmployee";
const EmployeeRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isEmployee, employeeloading] = useEmployee(user?.email);
  const loacation = useLocation();
  if (loading || employeeloading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }
  if (user && user?.uid && isEmployee) {
    return children;
  }
  return (
    <Navigate
      to="/employee/Login"
      state={{ from: loacation }}
      replace
    ></Navigate>
  );
};

export default EmployeeRoutes;
