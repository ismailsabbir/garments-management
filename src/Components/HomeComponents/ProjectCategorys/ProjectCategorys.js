import React, { useContext } from "react";
import "./ProjectCategorys.css";
import { servcontext } from "../../../App";
import { Link } from "react-router-dom";
const ProjectCategorys = () => {
  const { category } = useContext(servcontext);
  console.log(category);
  return (
    <div className="categorys-con">
      <div className="category-head">
        <h3 className="neutral">Chose what do you want to make</h3>
        <p>Customized</p>
      </div>
      <div className="categorys mt-12">
        <div className="all-category row">
          {category?.map((cate) => (
            <div className="category col col-12 col-sm-12 col-md-12 col-lg-3">
              <div className="category-image">
                <img src={cate?.image} alt="n" />
                <div className="category-text">
                  <h3>{cate?.name}</h3>
                  <p>{cate?.text}</p>
                  <Link
                    to="/customized-details"
                    className="button"
                    id="custom-btn"
                  >
                    Customized
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCategorys;
