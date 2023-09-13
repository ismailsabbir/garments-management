import React from "react";
import "./ContactUs.css";
import ContactBanner from "../../Components/ContactComponent/ContactBanner/ContactBanner";
import ContactMedia from "../../Components/ContactComponent/ContactMedia/ContactMedia";
import ContactFrom from "../../Components/ContactComponent/ContactFrom/ContactFrom";
const ContactUs = () => {
  return (
    <div>
      <ContactBanner></ContactBanner>
      <ContactMedia></ContactMedia>
      <ContactFrom></ContactFrom>
    </div>
  );
};

export default ContactUs;
