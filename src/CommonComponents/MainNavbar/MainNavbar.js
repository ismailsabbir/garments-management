import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
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

const MainNavbar = () => {
  const { user, userlogout } = useContext(AuthContext);
  const [cartproducts, setcartproducts] = useState([]);
  useEffect(() => {
    fetchData();
  });
  const fetchData = async () => {
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
    console.log("sub");
    userlogout()
      .then(() => {
        console.log("Log Out Sucessfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="print:hidden">
      <TopNavbar></TopNavbar>
      <Navbar expand="lg" className="bg-neutral">
        <Container>
          <Navbar.Brand href="#home">
            <img className="h-14" src={logo} alt="not found" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
            </Nav>
            <Navbar.Collapse className="justify-content-end navbar-end-con">
              {/* <Navbar.Text>
                <Link
                  to="/make-project"
                  className="button"
                  id="make-project-btn"
                >
                  Customized
                </Link>
                <div>
                  <h1>dd</h1>
                </div>
              </Navbar.Text> */}
              <Link to="/make-project" className="button" id="make-project-btn">
                Customized
              </Link>
              <div className="nav-useer dropdown">
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
                    <Link className="nav-account">
                      <AiOutlineInbox></AiOutlineInbox> <>My Orders</>
                    </Link>
                    <Link
                      to="/manage_account/customized_orders"
                      className="nav-account"
                    >
                      <AiOutlineInbox></AiOutlineInbox>{" "}
                      <>My Customized Orders</>
                    </Link>
                    <Link className="nav-account">
                      <GrFavorite></GrFavorite>
                      <>My Wishlist & Followed Stores</>
                    </Link>
                    <Link className="nav-account">
                      <GoCodeReview></GoCodeReview>
                      <>My Reviews</>
                    </Link>
                    <Link className="nav-account">
                      <BiLogOut></BiLogOut>
                      <>Logout</>
                    </Link>
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
              {/* <div className="nav-cart-con">
                <BsBagDash className="nav-cart-icon"></BsBagDash>
                <span className="cartproduct-q">dd</span>
              </div> */}
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
              </Link>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MainNavbar;
