import React from "react";
import { FaFacebookF } from "react-icons/fa";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import "./ContactFrom.css";
import { Form } from "react-bootstrap";
const ContactFrom = () => {
  return (
    <div className="contact-from-con">
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control type="text" placeholder="Full Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control type="email" placeholder="Email Address" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control type="text" placeholder="Subject" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" rows={5} placeholder="Message" />
        </Form.Group>
        <div className="from-bottom">
          <button className="button">Send Message</button>
          <div className="top-navbar-right">
            <p className="socila-icon-p">
              <FaFacebookF className="socila-icon"></FaFacebookF>
            </p>
            <p className="socila-icon-p">
              <AiOutlineTwitter className="socila-icon"></AiOutlineTwitter>
            </p>
            <p className="socila-icon-p">
              <AiOutlineInstagram className="socila-icon"></AiOutlineInstagram>
            </p>
            <p className="socila-icon-p">
              <AiFillYoutube className="socila-icon"></AiFillYoutube>
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ContactFrom;
