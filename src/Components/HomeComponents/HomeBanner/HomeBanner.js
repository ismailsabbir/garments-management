import React from "react";
import "./HomeBanner.css";
import icon1 from "../../../Images/Icon-1.png";
import icon2 from "../../../Images/Icon-2.png";
import icon3 from "../../../Images/Icon-3.png";
import { useState } from "react";
import { Link } from "react-router-dom";
const HomeBanner = () => {
  console.log("Home Banner");
  const [isFixed, setIsFixed] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 60) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };
  window.addEventListener("scroll", handleScroll);
  return (
    <div className="home-banner-hole">
      <div className="home-banner-con">
        <div className="home-banner-left">
          <p className="banner-text-top">GARMEN TEXTILE INDUSTRY</p>
          <h1>You Can Never Go Wrong With Our Quality.</h1>
          <p className="home-banner-p">
            Integer id ipsum eu massa pretium pulvinar non vitae massa donec ut
            dignissim. Metus aenean vulputate ex sed sem aliquet dapibus. Mauris
            imperdiet.
          </p>
          <Link to="/shop" className="button" id="discover-btn">
            DISCOVER MORE
          </Link>
        </div>
      </div>

      <div
        className="banner-bottom-con"
        id={isFixed ? "banner-bottom-fixed" : ""}
      >
        <div className="banner-bottom-1 bg-neutral">
          <img src={icon1} alt="not found" />
          <div className="banner-bottom-right">
            <h4>Excellent Material</h4>
            <p>Luctus nec ullamcorper ipsum mattis pulvinar dolor.</p>
          </div>
        </div>
        <div className="banner-bottom-1 bg-neutral">
          <img src={icon2} alt="not found" />
          <div className="banner-bottom-right">
            <h4>Quality Product</h4>
            <p>Luctus nec ullamcorper ipsum mattis pulvinar dolor.</p>
          </div>
        </div>
        <div className="banner-bottom-1 bg-neutral">
          <img src={icon3} alt="not found" />
          <div className="banner-bottom-right">
            <h4>Trusted by Clients</h4>
            <p>Luctus nec ullamcorper ipsum mattis pulvinar dolor.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
