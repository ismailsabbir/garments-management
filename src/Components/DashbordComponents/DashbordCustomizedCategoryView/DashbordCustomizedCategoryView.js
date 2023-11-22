import React from "react";
import { Link, useLocation } from "react-router-dom";

const DashbordCustomizedCategoryView = () => {
  const location = useLocation();
  const category = location.state;
  console.log(category);
  return (
    <div className="category-view-con">
      <div className="category-view-left">
        <img src={category?.image} alt="off" />
      </div>
      <div className="category-view-right">
        <div className="category-view-id-name">
          <h6>Category Id :{category?.category_id}</h6>
          <h6>Category Name: {category?.name}</h6>
        </div>
        <div className="cat-edit-btn-con">
          <Link
            to="/dashbord/customized-category-edit"
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

export default DashbordCustomizedCategoryView;
