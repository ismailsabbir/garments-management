import React, { useContext, useState } from "react";
import logo from "../../Images/Logo.png";
import { CgGoogle } from "react-icons/cg";
import { BiLogoFacebook, BiLogoGmail } from "react-icons/bi";
import "./LoginPages.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginPages = () => {
  let location = useLocation();
  const { userlogin, signinwithgoogle, resetpassword, facebooksignup, user } =
    useContext(AuthContext);
  const [errormessage, seterrormessage] = useState("");
  const [sucessmessage, setsucessmessage] = useState(false);
  const [email1, setemail] = useState("");
  const name = user?.displayName;
  const email = user?.email;
  const userdata = { name, email };
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  const loginuser = (e) => {
    e.preventDefault();
    setsucessmessage(false);
    const form = e.target;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    seterrormessage("");
    userlogin(email, password)
      .then((req) => {
        const user = req.user;
        console.log(user);
        const currentuser = {
          email: user.email,
        };
        setsucessmessage(true);
        form.reset();
        fetch(`${process.env.REACT_APP_URL}/jwt`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(currentuser),
        })
          .then((req) => req.json())
          .then((data) => {
            console.log(data);
            localStorage.setItem("garments-token", data?.token);
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        console.log(error);
        seterrormessage(error.message);
      });
  };
  const handlegooglesignin = () => {
    signinwithgoogle()
      .then((req) => {
        const user = req.user;
        console.log(user);
        setsucessmessage(true);
        fetch(`${process.env.REACT_APP_URL}/users`, {
          method: "POST",
          body: JSON.stringify(userdata),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((req) => req.json())
          .then((data) => {
            console.log(data);
          });
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        seterrormessage(error.message);
      });
  };
  const handlesetemail = (e) => {
    const email = e.target.value;
    setemail(email);
  };
  const handlerestpassword = () => {
    if (!email1) {
      toast("Enter email for Reset password!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    resetpassword(email1)
      .then(() => {
        toast("Please check you email!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlefacebooksign = () => {
    facebooksignup()
      .then((req) => {
        console.log(req.user);
        fetch(`${process.env.REACT_APP_URL}/users`, {
          method: "POST",
          body: JSON.stringify(userdata),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((req) => req.json())
          .then((data) => {
            console.log(data);
          });
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
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
          <button onClick={handlefacebooksign} className="google-btn">
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
          <form onSubmit={loginuser}>
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
                <span>Login sucessfully!!!!</span>
              </div>
            ) : (
              <></>
            )}
            <input
              onBlur={handlesetemail}
              className="signup-input"
              name="email"
              type="email"
              placeholder="EMAIL ADDRESSS"
            />
            <input
              className="signup-input"
              type="password"
              name="password"
              placeholder="PASSWORD"
            />
            <div className="mid-login">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  checked="checked"
                  className="checkbox checkbox-success mr-2"
                />
                <span className="label-text">Remember me</span>
              </label>

              <Link onClick={handlerestpassword} className="forget">
                Forgot password?
              </Link>
            </div>
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
              Log In with email
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPages;
