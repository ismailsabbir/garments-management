import React from "react";
import "./DashbordCategoryView.css";
import { Link, useLocation } from "react-router-dom";

const DashbordCategoryView = () => {
  const location = useLocation();
  const category = location.state;
  console.log(category);
  return (
    <div className="category-view-con">
      <div className="category-view-left">
        <img src={category?.category_image} alt="off" />
      </div>
      <div className="category-view-right">
        <div className="category-view-id-name">
          <h6>Category Id :{category?.category_id}</h6>
          <h6>Category Name: {category?.category_name}</h6>
        </div>
        <div className="cat-edit-btn-con">
          <Link
            to="/dashbord/shop-category-edit"
            state={category}
            className="product-edit-btn"
          >
            Edit Category
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashbordCategoryView;
