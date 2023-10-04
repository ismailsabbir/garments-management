import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { Link } from "react-router-dom";

const LeftManageAccounts = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <p>Hellow,{user?.email}</p>
      <Link>Manage My Account</Link>
      <Link>My Profile</Link>
      <Link>Address Book</Link>
      <Link>My Orders</Link>
      <Link>My Orders</Link>
      <Link>My Customized Orders</Link>
      <Link>My Reviews</Link>
      <Link>My Wishlist & Followed Stores (1)</Link>
    </div>
  );
};

export default LeftManageAccounts;
