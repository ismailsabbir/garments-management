import React from "react";
import "./MissionVission.css";
import mission from "../../../Images/mission.jpg";
import vission from "../../../Images/vission.jpg";
import { AiOutlineDownCircle } from "react-icons/ai";
const MissionVission = () => {
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
            <p className="vission1">
              <AiOutlineDownCircle className="circel-icon"></AiOutlineDownCircle>
              Integer consectetur tincidunt.
            </p>
            <p className="vission1">
              <AiOutlineDownCircle className="circel-icon"></AiOutlineDownCircle>
              Integer consectetur tincidunt.
            </p>
            <p className="vission1">
              <AiOutlineDownCircle className="circel-icon"></AiOutlineDownCircle>
              Integer consectetur tincidunt.
            </p>
            <p className="vission1">
              <AiOutlineDownCircle className="circel-icon"></AiOutlineDownCircle>
              Integer consectetur tincidunt.
            </p>
            <p className="vission1">
              <AiOutlineDownCircle className="circel-icon"></AiOutlineDownCircle>
              Integer consectetur tincidunt.
            </p>
          </div>
          <div className="mission">
            <h4>Our Mission</h4>
            <p className="vission1">
              <AiOutlineDownCircle className="circel-icon"></AiOutlineDownCircle>
              Integer consectetur tincidunt.
            </p>
            <p className="vission1">
              <AiOutlineDownCircle className="circel-icon"></AiOutlineDownCircle>
              Integer consectetur tincidunt.
            </p>
            <p className="vission1">
              <AiOutlineDownCircle className="circel-icon"></AiOutlineDownCircle>
              Integer consectetur tincidunt.
            </p>
            <p className="vission1">
              <AiOutlineDownCircle className="circel-icon"></AiOutlineDownCircle>
              Integer consectetur tincidunt.
            </p>
          </div>
        </div>
        <button className="button" id="discover-btn">
          MORE ABOUT US
        </button>
      </div>
    </div>
  );
};

export default MissionVission;
