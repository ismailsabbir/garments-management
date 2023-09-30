import React from "react";
import "./AccountMenu.css";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
const AccountMenu = () => {
  return (
    <div className="account-menu-con">
      <h5>Account Menu</h5>
      <Link className="menu-link">
        <BiChevronRight></BiChevronRight> <>MY ACCOUNT</>
      </Link>
      <Link className="menu-link">
        <BiChevronRight></BiChevronRight> ADDRESS BOOK
      </Link>
      <Link className="menu-link">
        <BiChevronRight></BiChevronRight> WISHLIST
      </Link>
      <Link className="menu-link">
        <BiChevronRight></BiChevronRight> ORDER HISTORY
      </Link>
    </div>
  );
};

export default AccountMenu;
