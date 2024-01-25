import React, { useContext } from "react";
import { servcontext } from "../../../App";
import SingleMember from "../SingleMember/SingleMember";
import "./TeamMembers.css";
const TeamMembers = () => {
  const { member } = useContext(servcontext);
  const fourmember = member?.slice(0, 4);
  return (
    <div className="teammember-con">
      <div className="homeservices-top" id="home-project-top">
        <h5>OUR TEAM</h5>
        <h1>Meet The Expert</h1>
        <p>
          Nulla in nibh at leo faucibus molestie eget nec velit. Phasellus vel
          felis vel orci iaculis tempor tristique sagittis urna. Phasellus ac
          ante in lacus tempor egestas.
        </p>
      </div>
      <div className="teammember">
        {fourmember?.map((member) => (
          <SingleMember member={member} key={member?._id}></SingleMember>
        ))}
      </div>
      <div id="view-tem-btn">
        <button className="button">VIEW ALL TEAM</button>
      </div>
    </div>
  );
};

export default TeamMembers;
