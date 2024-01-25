import React, { useContext, useState } from "react";
import logo from "../../Images/Logo.png";
import { CgGoogle } from "react-icons/cg";
import { BiLogoFacebook, BiLogoGmail } from "react-icons/bi";
import "./SignupPages.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";
const SignupPages = () => {
  const { createuser, signinwithgoogle, updateusername, facebooksignup, user } =
    useContext(AuthContext);
  const [errormessage, seterrormessage] = useState("");
  const [sucessmessage, setsucessmess] = useState(false);
  let location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  const name = user?.displayName;
  const email = user?.email;
  const userdata = { name, email };
  console.log("Sign up Page");
  const handleregister = (e) => {
    e.preventDefault();
    setsucessmess(false);
    const form = e.target;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const userdata = { name, email };
    if (password.length < 8) {
      seterrormessage("Password must be 8 characters!!");
      return;
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      seterrormessage("Password must have a special character");
      return;
    }
    seterrormessage("");
    createuser(email, password)
      .then((req) => {
        setsucessmess(true);
        form.reset();
        updateusername(name)
          .then((req) => {})
          .catch((error) => {
            console.error(error);
          });
        fetch(`${process.env.REACT_APP_URL}/users`, {
          method: "POST",
          body: JSON.stringify(userdata),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((req) => req.json())
          .then((data) => {});
      })
      .catch((error) => {
        seterrormessage(error.message);
      });
  };

  const handlegooglesignin = () => {
    signinwithgoogle()
      .then((req) => {
        const user = req.user;
        const currentuser = {
          email: user.email,
        };
        setsucessmess(true);

        fetch(`${process.env.REACT_APP_URL}/users`, {
          method: "POST",
          body: JSON.stringify(userdata),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((req) => req.json())
          .then((data) => {
            fetch(`${process.env.REACT_APP_URL}/jwt`, {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(currentuser),
            })
              .then((req) => req.json())
              .then((data) => {
                localStorage.setItem("garments-token", data?.token);
                navigate(from, { replace: true });
              });
          });
      })
      .catch((error) => {
        seterrormessage(error.message);
      });
  };
  const handlefackbooksignin = () => {
    facebooksignup()
      .then((res) => {
        const user = res.user;
        const currentuser = {
          email: user.email,
        };
        fetch(`${process.env.REACT_APP_URL}/users`, {
          method: "POST",
          body: JSON.stringify(userdata),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((req) => req.json())
          .then((data) => {
            fetch(`${process.env.REACT_APP_URL}/jwt`, {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(currentuser),
            })
              .then((req) => req.json())
              .then((data) => {
                localStorage.setItem("garments-token", data?.token);
                navigate(from, { replace: true });
              });
          });
      })
      .catch((error) => {});
  };
  return (
    <div className="sign-page-con">
      <div className="signup-con">
        <div className="signup-left bg-neutral">
          <img src={logo} alt="not" />
          <p>Login using social media to get quick access</p>
          <button
            onClick={handlegooglesignin}
            className="google-btn"
            id="google"
          >
            <CgGoogle className="signup-icon"></CgGoogle>
            Signin with Google
          </button>
          <button onClick={handlefackbooksignin} className="google-btn">
            <BiLogoFacebook className="signup-icon"></BiLogoFacebook>
            Signin with Facebook
          </button>
        </div>
        <div className="signup-right">
          <div className="alreday-link">
            <Link className="signup-link" to="/Login">
              ALREADY A MEMBER
            </Link>
            <Link className="signup-link" to="/SignUp">
              I AM NEW HERE
            </Link>
          </div>

          <form onSubmit={handleregister}>
            {sucessmessage ? (
              <div className="alert alert-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Account created sucessfully!!!!</span>
              </div>
            ) : (
              <></>
            )}
            <input
              className="signup-input"
              name="email"
              type="text"
              placeholder="EMAIL ADDRESSS"
              required
            />
            <input
              className="signup-input"
              type="text"
              name="name"
              placeholder="FULL NAME"
              required
            />
            <input
              className="signup-input"
              type="password"
              name="password"
              placeholder="PASSWORD"
              required
            />
            {errormessage ? (
              <div className="alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>{errormessage}</span>
              </div>
            ) : (
              <></>
            )}

            <button type="submit" className="signup-btn">
              <BiLogoGmail className="gmail-icon"></BiLogoGmail>
              Sign up with email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPages;
