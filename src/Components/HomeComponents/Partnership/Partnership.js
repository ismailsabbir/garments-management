import React, { useEffect, useState } from "react";
import "./Partnership.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Partnership = () => {
  const [partnership, setpartnership] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/partnership`)
      .then((res) => res.json())
      .then((data) => {
        setpartnership(data);
      });
  }, []);
  console.log("Partnership");

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
