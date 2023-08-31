import React from "react";
import "./HomeBanner.css";
import icon1 from "../../../Images/Icon-1.png";
import icon2 from "../../../Images/Icon-2.png";
import icon3 from "../../../Images/Icon-3.png";
const HomeBanner = () => {
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
          <button className="button" id="discover-btn">
            DISCOVER MORE
          </button>
        </div>
      </div>

      <div className="banner-bottom-con">
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
