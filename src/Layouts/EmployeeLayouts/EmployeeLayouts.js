import React, { createContext, useContext, useEffect, useState } from "react";
import MainNavbar from "../../CommonComponents/MainNavbar/MainNavbar";
import { Outlet } from "react-router-dom";
import Footer from "../../CommonComponents/Footer/Footer";
import EmployeeLeft from "../../Components/EmployeeComponents/EmployeeLeft/EmployeeLeft";
import { AuthContext } from "../../Context/UserContext";
export const EmployeeContext = createContext({});
const EmployeeLayouts = () => {
  const { user } = useContext(AuthContext);
  const [employee, setemployee] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/single/employee?email=${user?.email}`, {
      headers: {
        authorization: `Beare ${localStorage.getItem("garments-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setemployee(data);
      })
      .catch((error) => {});
  }, []);
  return (
    <EmployeeContext.Provider value={employee}>
      <div className="dashbord-layut-hole">
        <MainNavbar></MainNavbar>
        <div className="row dashbord-layut-con">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-2 dashbord-layout-left">
            <EmployeeLeft></EmployeeLeft>
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-10 dashbordlayout-right">
            <Outlet></Outlet>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </EmployeeContext.Provider>
  );
};

export default EmployeeLayouts;
