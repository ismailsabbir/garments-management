import React, { useEffect, useState } from "react";
import "./Partnership.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../../Images/Partner-1.png";
import image2 from "../../../Images/Partner-2.png";
import image3 from "../../../Images/Partner-3.png";
import image4 from "../../../Images/Partner-4.png";
import image5 from "../../../Images/Partner-5.png";
import image6 from "../../../Images/Partner-7.png";

const Partnership = () => {
  const [partnership, setpartnership] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/partnership`)
      .then((res) => res.json())
      .then((data) => {
        setpartnership(data);
      });
  }, []);
  console.log(partnership);

  return (
    <div>
      {partnership ? (
        <div className="partnership-con bg-slate-900">
          {partnership?.map((partnership) => (
            <img src={partnership?.company_logo} alt="not" />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Partnership;
