import React, { useContext } from "react";
import "./MissionVission.css";
import mission from "../../../Images/mission.jpg";
import vission from "../../../Images/vission.jpg";
import { AiOutlineDownCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { servcontext } from "../../../App";
const MissionVission = () => {
  const { missions, vissions } = useContext(servcontext);
  console.log(typeof missions, vissions);
  return (
    <div className="mission-vission-con">
      <div className="mission-vission-left">
        <div className="mission-vission-left-big">
          <img src={mission} alt="not found" />
        </div>
        <div className="mission-vission-left-small">
          <img src={vission} alt="not found" />
        </div>
        <div className="mission-vission-empty"></div>
      </div>
      <div className="mission-vission-right">
        <p className="about-garmen">ABOUT GARMEN</p>
        <h1>You Can Find All Kinds of Fabric Here</h1>
        <p className="mission-top-text">
          Phasellus ultricies ex vitae neque placerat porta. Aenean libero eros
          ultrices vel tristique non, porta eget dolor. Donec vel ipsum
          imperdiet neque, sit amet porta facilisis elit. Nunc neque enim
          finibus at nisi non, auctor venenatis leo.
        </p>
        <div className="mission-vission">
          <div className="vission">
            <h4>Our Visions</h4>
            {vissions?.vission?.map((vission) => (
              <p className="vission1">
                <AiOutlineDownCircle className="circel-icon"></AiOutlineDownCircle>
                {vission?.vision}
              </p>
            ))}
          </div>
          <div className="mission">
            <h4>Our Mission</h4>
            {missions?.mission?.map((mission) => (
              <p className="vission1">
                <AiOutlineDownCircle className="circel-icon"></AiOutlineDownCircle>
                {mission?.mission}
              </p>
            ))}
          </div>
        </div>
        <Link to="/aboutus" className="button" id="discover-btn">
          MORE ABOUT US
        </Link>
      </div>
    </div>
  );
};

export default MissionVission;
