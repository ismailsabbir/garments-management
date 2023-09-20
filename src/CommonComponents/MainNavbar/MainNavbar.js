import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../Images/Logo.png";
import "./MainNavbar.css";
import { Link, NavLink } from "react-router-dom";
import TopNavbar from "../TopNavbar/TopNavbar";
import { AuthContext } from "../../Context/UserContext";
const MainNavbar = () => {
  const { user, userlogout } = useContext(AuthContext);
  console.log(user);
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
    <div>
      <TopNavbar></TopNavbar>
      <Navbar expand="lg" className="bg-neutral">
        <Container>
          <Navbar.Brand href="#home">
            <img className="h-14" src={logo} alt="not found" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto nav-items">
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
              <NavLink
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
              </NavLink>
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
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Link
                  to="/make-project"
                  className="button"
                  id="make-project-btn"
                >
                  Customized
                </Link>
                {/* <button className="button">MAKE PROJECT</button> */}
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MainNavbar;
