import React from "react";
import "./SingleMember.css";
const SingleMember = ({ member }) => {
  console.log(member);

  return (
    <div className="single-member-con ">
      <div className="single-info">
        <img src={member?.image} alt="not found" />
        <h4>{member?.name}</h4>
        <h6>{member.position}</h6>
      </div>
      <div className="member-empty"></div>
    </div>
  );
};

export default SingleMember;
