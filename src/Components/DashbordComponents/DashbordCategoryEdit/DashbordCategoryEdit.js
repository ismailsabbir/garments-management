import React from "react";
import "./DashbordCategoryEdit.css";
import { ToastContainer, toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { BsFillImageFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
const DashbordCategoryEdit = () => {
  const imagebb = process.env.REACT_APP_IMGBB;
  const location = useLocation();
  const category = location.state;
  const [categoryData, setcategoryData] = useState({});
  useEffect(() => {
    setcategoryData(category);
  }, {});
  console.log(categoryData);
  const [category_image, setcategory_image] = useState(
    category?.category_image
  );

  const handleCategoryedit = (e) => {
    e.preventDefault();
    const category_id = e.target.categoryid.value.toString();
    const category_name = e.target.categorytname.value.toString();
    const staffinfo = {
      category_id,
      category_name,
      category_image,
    };
    console.log(staffinfo);
    fetch(`${process.env.REACT_APP_URL}/edit_category/${category?._id}`, {
      method: "PUT",
      body: JSON.stringify(staffinfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast("Update sucessfully !!!", {
          position: "top-center",
          autoClose: 1000,
        });
      });
  };
  const handleimage1 = (e) => {
    console.log("click");
    const image1 = e.target.files[0];
    const formdata = new FormData();
    formdata.append("image", image1);
    const url = `https://api.imgbb.com/1/upload?key=${imagebb}`;
    fetch(url, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setcategory_image(data.data.url);
          toast("Product Image Upload sucessfully !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        toast("Image Upload Failed. Please try again later.", {
          position: "top-center",
          autoClose: 1000,
          type: "error",
        });
      });
  };
  return (
    <div className="add-staff-con">
      <h5>Edit Category</h5>
      <p>Edit your Category and necessary information from here</p>

      <Form onSubmit={handleCategoryedit} className="add-staff-form">
        <div className="staff-image-con">
          <div className="product-image-edit">
            <Form.Group>
              <label
                for="input-file1"
                id="file"
                className="border-dashed border-2 border-green-700"
              >
                <BsFillImageFill className="image-icon"></BsFillImageFill>
                <h6>Drag your images here</h6>
                <p>(Only *.jpeg, *.webp and *.png images will be accepted)</p>
                <input
                  type="file"
                  id="input-file1"
                  className="fileinput"
                  name="image"
                  onChange={handleimage1}
                />
              </label>
            </Form.Group>
          </div>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Category Name"
              name="categorytname"
              value={categoryData?.category_name}
              onChange={(e) =>
                setcategoryData({
                  ...categoryData,
                  category_name: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Category Id</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Category Id"
              name="categoryid"
              value={categoryData?.category_id}
              onChange={(e) =>
                setcategoryData({
                  ...categoryData,
                  category_id: e.target.value,
                })
              }
            />
          </Form.Group>
        </div>

        <div
          className="staff-first-name-lastname mt-6 mx-auto"
          id="add-cat-con"
        >
          <button
            className="add-staf--btn mx-auto mb-10"
            variant="primary"
            type="submit"
          >
            Edit Category
          </button>
        </div>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordCategoryEdit;
