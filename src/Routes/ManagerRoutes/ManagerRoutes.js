import React, { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../CommonComponents/Loading/Loading";
import useManager from "../../Hooks/userManager";
import useAdmin from "../../Hooks/useAdmin";
const ManagerRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isManager, managerloading] = useManager(user?.email);
  const [isAdmin, adminloading] = useAdmin(user?.email);
  const loacation = useLocation();
  if (loading || managerloading || adminloading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }
  if ((user && user?.uid && isManager) || (user && user?.uid && isAdmin)) {
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

export default ManagerRoutes;
