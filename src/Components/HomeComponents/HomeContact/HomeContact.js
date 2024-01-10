import React from "react";
import "./HomeContact.css";
import { Link } from "react-router-dom";
const HomeContact = () => {
  return (
    <div className="homecontact-con">
      <h1>Consult With Us The Suitable Material for Your Project</h1>
      <p>
        Nulla in nibh at leo faucibus molestie eget nec velit. Phasellus vel
        felis vel orci iaculis tempor tristique sagittis urna. Phasellus ac ante
        in lacus tempor egestas.
      </p>
      <Link to="/contactus" className="button">
        {" "}
        Contact Us
      </Link>
    </div>
  );
};

export default HomeContact;
