import React from "react";
import "./AccountMenu.css";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
const AccountMenu = () => {
  console.log("Account Menu");
  return (
    <div className="account-menu-con">
      <h5>Account Menu</h5>
      <Link to="/manage_account" className="menu-link">
        <BiChevronRight></BiChevronRight> <>MY ACCOUNT</>
      </Link>
      <Link className="menu-link">
        <BiChevronRight></BiChevronRight> ADDRESS BOOK
      </Link>
      <Link to="/manage_account/cartproduct" className="menu-link">
        <BiChevronRight></BiChevronRight> ShOPING CART
      </Link>
      <Link to="/manage_account/wishlist" className="menu-link">
        <BiChevronRight></BiChevronRight> WISHLIST
      </Link>
      <Link to="/manage_account/shop_orders" className="menu-link">
        <BiChevronRight></BiChevronRight> ORDER HISTORY
      </Link>
      <Link to="/manage_account/customized_orders" className="menu-link">
        <BiChevronRight></BiChevronRight>CUSTOMIZED ORDER HISTORY
      </Link>
    </div>
  );
};

export default AccountMenu;
