import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { Link } from "react-router-dom";
import "./LeftManageAccounts.css";
const LeftManageAccounts = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="left-link-con">
      <p className="mb-6">
        Hellow, <span className="manage-email">{user?.email}</span>
      </p>
      <div className="account-link-con">
        <Link className="manage-left-link">Manage My Account</Link>
        <Link to="/manage_account/my-profile" className="manage-left-link">
          My Profile
        </Link>
        <Link to="/manage_account/address-book" className="manage-left-link">
          Address Book
        </Link>
      </div>

      <div className="account-link-con">
        <Link to="/manage_account/shop_orders" className="manage-left-link">
          My Orders
        </Link>
        <Link
          to="/manage_account/customized_orders"
          className="manage-left-link"
        >
          My Customized Orders
        </Link>
        <Link to="/manage_account/cancelorder" className="manage-left-link">
          {" "}
          My Cancellations
        </Link>
        <Link
          to="/manage_account/customized/cancelorder"
          className="manage-left-link"
        >
          {" "}
          My Customized Cancellations
        </Link>
      </div>
      <div className="account-link-con">
        <Link to="/manage_account/review" className="manage-left-link">
          My Reviews
        </Link>
        <Link to="/manage_account/cartproduct" className="manage-left-link">
          My cart product
        </Link>
        <Link to="/manage_account/wishlist" className="manage-left-link">
          My Wishlist & Followed Stores (1)
        </Link>
      </div>
    </div>
  );
};

export default LeftManageAccounts;
