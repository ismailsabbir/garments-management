import React from "react";
import { PiSquaresFourDuotone } from "react-icons/pi";
import { FiSettings, FiUser, FiUsers } from "react-icons/fi";
import { BiErrorCircle, BiHomeAlt } from "react-icons/bi";
import { RiPagesLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import "./DashbordLeft.css";
import { MdOutlinePayments, MdProductionQuantityLimits } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { LuCompass } from "react-icons/lu";
import { MdOutlineNoteAlt } from "react-icons/md";
const DashbordLeft = () => {
  return (
    <div className="dashbord-left-con print:hidden">
      <NavLink
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
        to="/dashbord/"
      >
        <PiSquaresFourDuotone className="dashbord-icon"></PiSquaresFourDuotone>{" "}
        Dashboard
      </NavLink>
      <NavLink
        to="/dashbord/attendance"
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
      >
        <MdOutlineNoteAlt className="dashbord-icon"></MdOutlineNoteAlt>
        Take Attendance
      </NavLink>
      <NavLink
        to="/dashbord/today/attendance"
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
      >
        <MdOutlineNoteAlt className="dashbord-icon"></MdOutlineNoteAlt>
        Today Attendance
      </NavLink>
      <NavLink
        to="/dashbord/sheet/attendance"
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
      >
        <MdOutlineNoteAlt className="dashbord-icon"></MdOutlineNoteAlt>
        Attendance Sheet
      </NavLink>
      <NavLink
        to="/dashbord/employee/attendance"
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
      >
        <MdOutlineNoteAlt className="dashbord-icon"></MdOutlineNoteAlt>
        Employee Attendance
      </NavLink>
      <NavLink
        to="/dashbord/employee/salary/make"
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
      >
        <MdOutlinePayments className="dashbord-icon"></MdOutlinePayments>
        Employee Salary
      </NavLink>
      <NavLink
        to="/dashbord/employee/leaves"
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
      >
        <MdOutlinePayments className="dashbord-icon"></MdOutlinePayments>
        Leave Management
      </NavLink>

      <NavLink
        to="/dashbord/shop-product"
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
      >
        <MdProductionQuantityLimits className="dashbord-icon"></MdProductionQuantityLimits>
        Shop Products
      </NavLink>
      <NavLink
        to="/dashbord/shop-category"
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
      >
        <TbCategory className="dashbord-icon"></TbCategory>Shop Category
      </NavLink>

      <NavLink
        to="/dashbord/customized-product"
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
      >
        <MdProductionQuantityLimits className="dashbord-icon"></MdProductionQuantityLimits>
        Customized Products
      </NavLink>
      <NavLink
        to="/dashbord/customized-category"
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
      >
        <TbCategory className="dashbord-icon"></TbCategory>Customized Category
      </NavLink>
      <NavLink
        to="/dashbord/orders"
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
      >
        <RiPagesLine className="dashbord-icon"></RiPagesLine> Orders
      </NavLink>
      <NavLink
        to="/dashbord/customized-orders"
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
      >
        <LuCompass className="dashbord-icon"></LuCompass>Customized Orders
      </NavLink>

      <NavLink
        to="/dashbord/customers"
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
      >
        <FiUsers className="dashbord-icon"></FiUsers> Customers
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
        to="/dashbord/setting"
      >
        <FiSettings className="dashbord-icon"></FiSettings>Settings
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
        to="/home"
      >
        <BiHomeAlt className="dashbord-icon"></BiHomeAlt>Online Store
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
        to="/dashbord/error-page"
      >
        <BiErrorCircle className="dashbord-icon"></BiErrorCircle> 404 Pages
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "dashbord-active-link" : "dashbord-link"
        }
        to="/dashbord/comming-soon"
      >
        <LuCompass className="dashbord-icon"></LuCompass> Coming Soon
      </NavLink>
    </div>
  );
};

export default DashbordLeft;
