import React, { useContext } from "react";
import { FaFacebookF } from "react-icons/fa";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import "./ContactFrom.css";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
const ContactFrom = () => {
  const { user } = useContext(AuthContext);
  const currentDate = new Date();
  const options = { month: "2-digit", day: "2-digit", year: "numeric" };
  const contact_date = currentDate.toLocaleDateString(undefined, options);
  const contact_time = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const handlecontact = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const subject = e.target.subject.value;
    const message = e.target.message.value;
    const contactinfo = {
      name,
      email,
      subject,
      message,
      contact_date,
      contact_time,
    };
    fetch(`${process.env.REACT_APP_URL}/contact_request`, {
      method: "POST",
      body: JSON.stringify(contactinfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast("Requested sucessfully !!!", {
          position: "top-center",
          autoClose: 1000,
        });
        form.reset();
      });
  };
  return (
    <div className="contact-from-con">
      <Form onSubmit={handlecontact}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control type="text" placeholder="Full Name" name="name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            value={user?.email}
            name="email"
            type="email"
            placeholder="Email Address"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control type="text" name="subject" placeholder="Subject" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            name="message"
            as="textarea"
            rows={5}
            placeholder="Message"
          />
        </Form.Group>
        <div className="from-bottom">
          <button type="submit" className="button">
            Send Message
          </button>
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
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ContactFrom;
