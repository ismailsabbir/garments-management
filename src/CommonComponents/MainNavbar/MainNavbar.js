import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../Images/Logo.png";
import "./MainNavbar.css";
import { NavLink } from "react-router-dom";
import TopNavbar from "../TopNavbar/TopNavbar";
const MainNavbar = () => {
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
              <NavLink
                className={({ isActive }) =>
                  isActive ? "new-item-color" : undefined
                }
                id="nav-item"
                to="/SignUp"
              >
                SignUp
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "new-item-color" : undefined
                }
                id="nav-item"
                to="/Login"
              >
                Login
              </NavLink>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <button className="button">MAKE PROJECT</button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MainNavbar;
