import React, { useContext } from "react";
import { FiSettings, FiUser } from "react-icons/fi";
import { PiSquaresFourDuotone } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import "./EmployeeLeft.css";
import { SlNote } from "react-icons/sl";
import { CgNotes } from "react-icons/cg";
import { EmployeeContext } from "../../../Layouts/EmployeeLayouts/EmployeeLayouts";
import { AuthContext } from "../../../Context/UserContext";
import { MdOutlineNoteAlt, MdOutlinePayments } from "react-icons/md";
const EmployeeLeft = () => {
  const employee = useContext(EmployeeContext);
  const { userlogout } = useContext(AuthContext);
  console.log(employee);
  const handleLogOut = () => {
    userlogout()
      .then(() => {
        console.log("Log Out Sucessfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(employee);
  return (
    <div className="dashbord-left-con print:hidden">
      <div className="employee-info">
        <img src={employee?.photo} alt="" />
        <span>{employee?.name}</span>
        <>{employee?.role}</>
      </div>
      <NavLink
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
        to="/employee/"
      >
        <PiSquaresFourDuotone className="dashbord-icon"></PiSquaresFourDuotone>{" "}
        Dashboard
      </NavLink>

      <NavLink
        to="/employee/attendance"
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
      >
        <SlNote className="dashbord-icon"></SlNote>
        Attendance
      </NavLink>
      {employee?.role === "admin" || employee?.role === "Manager" ? (
        <NavLink
          to="/employee/take_attendance/attendance"
          className={({ isActive }) =>
            isActive ? "dashbord-active-link" : "dashbord-link"
          }
        >
          <MdOutlineNoteAlt className="dashbord-icon"></MdOutlineNoteAlt>
          Take Attendance
        </NavLink>
      ) : (
        <></>
      )}
      {employee?.role === "admin" || employee?.role === "Manager" ? (
        <NavLink
          to="/dashbord/employee/salary/make"
          className={({ isActive }) =>
            isActive ? "dashbord-active-link" : "dashbord-link"
          }
        >
          <MdOutlinePayments className="dashbord-icon"></MdOutlinePayments>
          Employee Salary
        </NavLink>
      ) : (
        <></>
      )}

      <NavLink
        to="/employee/leaves"
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
      >
        <CgNotes className="dashbord-icon"></CgNotes>My Leaves
      </NavLink>
      <NavLink
        to="/dashbord/staff"
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
      >
        <FiUser className="dashbord-icon"></FiUser> Our Staff
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
        to="/employee/setting"
      >
        <FiSettings className="dashbord-icon"></FiSettings>Settings
      </NavLink>
      <NavLink onClick={handleLogOut} className="dashbord-link">
        <IoLogOutOutline className="dashbord-icon"></IoLogOutOutline>Log Out
      </NavLink>
    </div>
  );
};

export default EmployeeLeft;
