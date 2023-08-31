import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { GiWorld } from "react-icons/gi";

import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import logo from "../../Images/Logo.png";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="bg-neutral">
      <footer className="footer p-10 bg-neutral text-base-content">
        <div>
          <img className="h-16" src={logo} alt="not found" />
          <p className="text-white text-base">
            Vivamus pharetra neque a lacus ullamcorper <br /> suscipit. Aenean
            blandit euismod dignissim.
            <br /> Praesent suscipit fermentum mi.
          </p>
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
        <div>
          <span className="text-white text-xl font-medium">Quick Links</span>
          <p className="flex">
            <FaArrowRightLong className="footer-right-arwo"></FaArrowRightLong>
            <Link className="link link-hover text-white text-base font-medium">
              Home
            </Link>
          </p>
          <p className="flex">
            <FaArrowRightLong className="footer-right-arwo"></FaArrowRightLong>
            <Link className="link link-hover text-white text-base font-medium">
              AboutUs
            </Link>
          </p>
          <p className="flex">
            <FaArrowRightLong className="footer-right-arwo"></FaArrowRightLong>
            <Link className="link link-hover text-white text-base font-medium">
              Services
            </Link>
          </p>
          <p className="flex">
            <FaArrowRightLong className="footer-right-arwo"></FaArrowRightLong>
            <Link className="link link-hover text-white text-base font-medium">
              Projects
            </Link>
          </p>
          <p className="flex">
            <FaArrowRightLong className="footer-right-arwo"></FaArrowRightLong>
            <Link className="link link-hover text-white text-base font-medium">
              Pricing
            </Link>
          </p>
          <p className="flex">
            <FaArrowRightLong className="footer-right-arwo"></FaArrowRightLong>
            <Link className="link link-hover text-white text-base font-medium">
              ContactUs
            </Link>
          </p>
        </div>
        <div>
          <span className="text-white text-xl font-medium">Services</span>
          <p className="flex">
            <FaArrowRightLong className="footer-right-arwo"></FaArrowRightLong>
            <Link className="link link-hover text-white text-base font-medium">
              Fabric Dyeing
            </Link>
          </p>
          <p className="flex">
            <FaArrowRightLong className="footer-right-arwo"></FaArrowRightLong>
            <Link className="link link-hover text-white text-base font-medium">
              Satin Weaving
            </Link>
          </p>
          <p className="flex">
            <FaArrowRightLong className="footer-right-arwo"></FaArrowRightLong>
            <Link className="link link-hover text-white text-base font-medium">
              Fabric Printing
            </Link>
          </p>
          <p className="flex">
            <FaArrowRightLong className="footer-right-arwo"></FaArrowRightLong>
            <Link className="link link-hover text-white text-base font-medium">
              Garment Stitching
            </Link>
          </p>{" "}
          <p className="flex">
            <FaArrowRightLong className="footer-right-arwo"></FaArrowRightLong>
            <Link className="link link-hover text-white text-base font-medium">
              Linen Weaving
            </Link>
          </p>
          <p className="flex">
            <FaArrowRightLong className="footer-right-arwo"></FaArrowRightLong>
            <Link className="link link-hover text-white text-base font-medium">
              Custom Apparel
            </Link>
          </p>
        </div>
        <div>
          <span className="text-white text-xl font-medium">Legal</span>
          <div className="top-navbar-item">
            <IoCallOutline className="navbar-top-icon"></IoCallOutline>
            <p className="text-white text-base font-medium">+123-234-1234</p>
          </div>
          <div className="top-navbar-item">
            <MdOutlineEmail className="navbar-top-icon"></MdOutlineEmail>
            <p className="text-white text-base font-medium">
              hello@awesomesite.com
            </p>
          </div>
          <div className="top-navbar-item">
            <GiWorld className="navbar-top-icon"></GiWorld>
            <p className="text-white text-base font-medium">
              www.awesomesite.com
            </p>
          </div>
          <div className="top-navbar-item">
            <IoLocationOutline className="navbar-top-icon"></IoLocationOutline>
            <p className="text-white text-base font-medium">
              99 Roving St., Big City, PKU 23456
            </p>
          </div>
        </div>
      </footer>
      <div className="bottom-footer">
        <p className="text-white text-base text-center pt-6 pb-8">
          Copyright 2023 © All Right Reserved Design by Rometheme
        </p>
      </div>
    </div>
  );
};

export default Footer;
