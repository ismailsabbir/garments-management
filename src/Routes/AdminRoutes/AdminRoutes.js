import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../CommonComponents/Loading/Loading";
import useAdmin from "../../Hooks/useAdmin";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, adminloading] = useAdmin(user?.email);
  const loacation = useLocation();
  if (loading || adminloading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }
  if (user && user?.uid && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: loacation }} replace></Navigate>;
};

export default AdminRoutes;
