import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../Images/Logo.png";
import "./MainNavbar.css";
import { Link, NavLink } from "react-router-dom";
import TopNavbar from "../TopNavbar/TopNavbar";
import { AuthContext } from "../../Context/UserContext";
import { FaUserPlus } from "react-icons/fa";
import { RiDislikeLine } from "react-icons/ri";
import { BsBagDash } from "react-icons/bs";
import { useState } from "react";
import { useEffect } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineInbox } from "react-icons/ai";
import { GrFavorite } from "react-icons/gr";
import { GoCodeReview } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";
import useAdmin from "../../Hooks/useAdmin";

const MainNavbar = () => {
  const { user, userlogout } = useContext(AuthContext);
  const [cartproducts, setcartproducts] = useState([]);
  const [isFixed, setIsFixed] = useState(false);
  const [isAdmin] = useAdmin(user?.email);
  const [userinfo, setuserinfo] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/singleuser?email=${user?.email}`, {
      headers: {
        authorization: `Beare ${localStorage.getItem("garments-token")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return userlogout();
        }
        return res.json();
      })
      .then((jsonData) => {
        setuserinfo(jsonData);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  }, [user?.email, userlogout]);
  useEffect(() => {
    fetchData(user?.email);
  });
  const fetchData = async (email) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/cartproduct?email=${user?.email}`,
        {
          headers: {
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
        }
      );
      if (response.status === 401 || response.status === 403) {
        console.log(response.status);
      }
      const jsonData = await response.json();
      setcartproducts(jsonData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const handlelogout = () => {
    userlogout()
      .then(() => {
        console.log("Log Out Sucessfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };
  window.addEventListener("scroll", handleScroll);
  return (
    <div className="print:hidden" id={isFixed ? "fixed" : ""}>
      <div id={isFixed ? "topnone" : ""}>
        <TopNavbar></TopNavbar>
      </div>
      <Navbar
        expand="lg"
        className="bg-neutral"
        id={isFixed ? "mainnav-color" : ""}
      >
        <div className="main-nav-con">
          <div className="nav-brand-tab">
            <Navbar.Brand href="/" className="navbar-brand-imaage">
              <img src={logo} alt="not found" />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" nav-items">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "new-item-color" : undefined
                }
                id="nav-item"
                to="/home"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "new-item-color" : undefined
                }
                id="nav-item"
                to="/aboutus"
              >
                AboutUs
              </NavLink>
              {/* <NavLink
                className={({ isActive }) =>
                  isActive ? "new-item-color" : undefined
                }
                id="nav-item"
                to="/Services"
              >
                Services
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "new-item-color" : undefined
                }
                id="nav-item"
                to="/Projects"
              >
                Projects
              </NavLink> */}
              <NavLink
                className={({ isActive }) =>
                  isActive ? "new-item-color" : undefined
                }
                id="nav-item"
                to="/shop"
              >
                Shop
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive ? "new-item-color" : undefined
                }
                id="nav-item"
                to="/blog"
              >
                Blog
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "new-item-color" : undefined
                }
                id="nav-item"
                to="/contactus"
              >
                ContactUs
              </NavLink>
              {isAdmin && user?.uid ? (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "new-item-color" : undefined
                  }
                  id="nav-item"
                  to="/dashbord"
                >
                  Dashboard
                </NavLink>
              ) : (
                <></>
              )}

              {user?.uid ? (
                <button
                  className={({ isActive }) =>
                    isActive ? "new-item-color" : undefined
                  }
                  id="nav-item"
                  onClick={handlelogout}
                >
                  LogOut
                </button>
              ) : (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "new-item-color" : undefined
                  }
                  id="nav-item"
                  to="/Login"
                >
                  Login
                </NavLink>
              )}
              {/* {userinfo?.role === "Premium" ? (
                <></>
              ) : (
                <Link
                  to="/premium/customer/login"
                  className="button1 ml-4"
                  id="make-wholesale-btn"
                >
                  Login For Wholesale
                </Link>
              )} */}
            </Nav>
            <Navbar.Collapse className="justify-content-end navbar-end-con">
              {/* <Link to="/make-project" className="button" id="make-project-btn">
                wholesale
              </Link> */}
              <Link to="/make-project" className="button" id="make-project-btn">
                Customized
              </Link>

              {/* jdfhdfdkd */}
              <div className="account-wishlist-cart-con">
                <div className="nav-useer dropdown dropdown-hover">
                  <FaUserPlus
                    tabIndex={0}
                    className="nav-user-icon"
                  ></FaUserPlus>
                  <div className="nav-login-register account">
                    <p tabIndex={0}>Account</p>
                    <Link to="/login" className="nav-login">
                      Login
                    </Link>
                    <>/</>
                    <Link to="/signup" className="nav-login">
                      Register
                    </Link>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100  w-52 dropdrown-menu ml-20"
                  >
                    <li>
                      <Link to="/manage_account" className="nav-account">
                        <BsEmojiSmile></BsEmojiSmile> <>Manage My Account</>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/manage_account/shop_orders"
                        className="nav-account"
                      >
                        <AiOutlineInbox></AiOutlineInbox> <>My Orders</>
                      </Link>
                      <Link
                        to="/manage_account/customized_orders"
                        className="nav-account"
                      >
                        <AiOutlineInbox></AiOutlineInbox>{" "}
                        <>My Customized Orders</>
                      </Link>
                      <Link
                        to="/manage_account/cartproduct"
                        className="nav-account"
                      >
                        <BsBagDash></BsBagDash>
                        <>My Shoping cart</>
                      </Link>
                      <Link
                        to="/manage_account/wishlist"
                        className="nav-account"
                      >
                        <GrFavorite></GrFavorite>
                        <>My Wishlist & Followed Stores</>
                      </Link>
                      <Link to="/manage_account/review" className="nav-account">
                        <GoCodeReview></GoCodeReview>
                        <>My Reviews</>
                      </Link>
                      <button onClick={handlelogout} className="nav-account">
                        <BiLogOut></BiLogOut>
                        <>Logout</>
                      </button>
                    </li>
                  </ul>
                </div>

                <Link to={`/wishlistproduct`} className="nav-useer">
                  <RiDislikeLine className="favarite-icon"></RiDislikeLine>
                  <Link
                    to="/wishlistproduct"
                    className="nav-login-register no-underline"
                  >
                    <p> Wishlist</p>
                    <Link
                      to={`/wishlistproduct`}
                      className="nav-login no-underline"
                    >
                      Edit your wishlist
                    </Link>
                  </Link>
                </Link>

                <Link to="/cartproduct" className="indicator nav-cart-con mr-4">
                  <span className="indicator-item badge badge-secondary">
                    {cartproducts?.length}
                    <sup>+</sup>{" "}
                  </span>
                  <Link
                    to="/cartproduct"
                    className="grid w-5 h-5  place-items-center"
                  >
                    <BsBagDash className="nav-cart-icon"></BsBagDash>
                  </Link>
                </Link>
              </div>

              {/* <div className="nav-useer dropdown dropdown-hover">
                <FaUserPlus tabIndex={0} className="nav-user-icon"></FaUserPlus>
                <div className="nav-login-register account">
                  <p tabIndex={0}>Account</p>
                  <Link to="/login" className="nav-login">
                    Login
                  </Link>
                  <>/</>
                  <Link to="/signup" className="nav-login">
                    Register
                  </Link>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100  w-52 dropdrown-menu"
                >
                  <li>
                    <Link to="/manage_account" className="nav-account">
                      <BsEmojiSmile></BsEmojiSmile> <>Manage My Account</>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/manage_account/shop_orders"
                      className="nav-account"
                    >
                      <AiOutlineInbox></AiOutlineInbox> <>My Orders</>
                    </Link>
                    <Link
                      to="/manage_account/customized_orders"
                      className="nav-account"
                    >
                      <AiOutlineInbox></AiOutlineInbox>{" "}
                      <>My Customized Orders</>
                    </Link>
                    <Link
                      to="/manage_account/cartproduct"
                      className="nav-account"
                    >
                      <BsBagDash></BsBagDash>
                      <>My Shoping cart</>
                    </Link>
                    <Link to="/manage_account/wishlist" className="nav-account">
                      <GrFavorite></GrFavorite>
                      <>My Wishlist & Followed Stores</>
                    </Link>
                    <Link to="/manage_account/review" className="nav-account">
                      <GoCodeReview></GoCodeReview>
                      <>My Reviews</>
                    </Link>
                    <button onClick={handlelogout} className="nav-account">
                      <BiLogOut></BiLogOut>
                      <>Logout</>
                    </button>
                  </li>
                </ul>
              </div>

              <Link to={`/wishlistproduct`} className="nav-useer">
                <RiDislikeLine className="favarite-icon"></RiDislikeLine>
                <Link
                  to="/wishlistproduct"
                  className="nav-login-register no-underline"
                >
                  <p> Wishlist</p>
                  <Link
                    to={`/wishlistproduct`}
                    className="nav-login no-underline"
                  >
                    Edit your wishlist
                  </Link>
                </Link>
              </Link>

              <Link to="/cartproduct" className="indicator nav-cart-con">
                <span className="indicator-item badge badge-secondary">
                  {cartproducts?.length}
                  <sup>+</sup>{" "}
                </span>
                <Link
                  to="/cartproduct"
                  className="grid w-5 h-5  place-items-center"
                >
                  <BsBagDash className="nav-cart-icon"></BsBagDash>
                </Link>
              </Link> */}
            </Navbar.Collapse>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default MainNavbar;
