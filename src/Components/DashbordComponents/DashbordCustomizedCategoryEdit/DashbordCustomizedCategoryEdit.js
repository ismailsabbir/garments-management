import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { BsFillImageFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./DashbordCustomizedCategoryEdit.css";
const DashbordCustomizedCategoryEdit = () => {
  const imagebb = process.env.REACT_APP_IMGBB;
  const location = useLocation();
  const category = location.state;
  const [categoryData, setcategoryData] = useState({});
  const [categorydetails, setcategorydetails] = useState({});
  const [color, setcolor] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  console.log("Dashbord Category Edit");
  const [allcategory, setallcategory] = useState([]);
  useEffect(() => {
    setSelectedColors(categorydetails?.colors);
  }, [categorydetails]);
  useEffect(() => {
    setcategoryData(category);
  }, [category]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/project-category`)
      .then((res) => res.json())
      .then((data) => {
        setallcategory(data);
      })
      .catch((error) => {
        console.error("Error fetching category details:", error);
      });
  }, [categoryData?.category_id]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/customized-single-details?categoryid=${categoryData?.category_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setcategorydetails(data);
      })
      .catch((error) => {
        console.error("Error fetching category details:", error);
      });
  }, [categoryData?.category_id]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/color`)
      .then((res) => res.json())
      .then((data) => {
        setcolor(data);
      });
  }, []);
  const handleColorChange = (event) => {
    const selectedColorId = event.target.value;
    const selectedColor = color?.find((c) => c.color_id === selectedColorId);
    const isSelected = selectedColors?.some(
      (c) => c.color_id === selectedColorId
    );
    if (isSelected) {
      const updatedColors = selectedColors?.filter(
        (c) => c.color_id !== selectedColorId
      );
      setSelectedColors(updatedColors);
    } else {
      setSelectedColors([...selectedColors, selectedColor]);
    }
  };
  const [image, setcategory_image] = useState(category?.image);
  const [Default_image, setDefault_image] = useState(
    categorydetails?.Default_image
  );
  const handleimage2 = (e) => {
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
          setDefault_image(data.data.url);
          toast("Image Uplode sucessfully !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      });
  };
  const handleimage1 = (e) => {
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
          toast("Image Uplode sucessfully !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      });
  };
  const handleCategoryedit = (e) => {
    e.preventDefault();
    const category_id = e.target.categoryid.value.toString();
    const name = e.target.categorytname.value.toString();
    const text = e.target.text.value.toString();
    const availavle = e.target.availavle.value.toString();
    const default_price = e.target.default_price.value.toString();
    const custom_price = e.target.custom_price.value.toString();
    const colors = selectedColors;
    const staffinfo = {
      category_id,
      name,
      image,
      Default_image,
      text,
      availavle,
      default_price,
      colors,
      custom_price,
    };
    fetch(
      `${process.env.REACT_APP_URL}/edit-customized_category/${category?.category_id}`,
      {
        method: "PUT",
        body: JSON.stringify(staffinfo),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        toast("Update sucessfully !!!", {
          position: "top-center",
          autoClose: 1000,
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
                <h6>Drag your category images here</h6>
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
            <Form.Group>
              <label
                for="input-file2"
                id="file"
                className="border-dashed border-2 border-green-700"
              >
                <BsFillImageFill className="image-icon"></BsFillImageFill>
                <h6>Drag default product images here</h6>
                <p>(Only *.jpeg, *.webp and *.png images will be accepted)</p>
                <input
                  type="file"
                  id="input-file2"
                  className="fileinput"
                  name="image"
                  onChange={handleimage2}
                />
              </label>
            </Form.Group>
          </div>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Category Name</Form.Label>
            <select className="product-category" name="categorytname">
              {allcategory?.map((categorys) => (
                <option
                  value={categorys?.name}
                  selected={categorys?.name === categoryData?.name}
                >
                  <span> {categorys?.name}</span>
                </option>
              ))}
            </select>
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Category Id</Form.Label>

            <select className="product-category" name="categoryid">
              {allcategory?.map((categorys) => (
                <option
                  value={categorys?.category_id}
                  selected={
                    categorys?.category_id === categoryData?.category_id
                  }
                >
                  {categorys?.category_id}
                  <span> ({categorys?.name})</span>
                </option>
              ))}
            </select>
          </Form.Group>
        </div>

        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Description</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Category Name"
              name="text"
              value={categoryData?.text}
              onChange={(e) =>
                setcategoryData({
                  ...categoryData,
                  text: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Quentity</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Category Id"
              name="availavle"
              value={categoryData?.availavle}
              onChange={(e) =>
                setcategoryData({
                  ...categoryData,
                  availavle: e.target.value,
                })
              }
            />
          </Form.Group>
        </div>

        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Default Price</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Category Name"
              name="default_price"
              value={categorydetails?.default_price}
              onChange={(e) =>
                setcategorydetails({
                  ...categorydetails,
                  default_price: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Custom product Price</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Category Id"
              name="custom_price"
              value={categorydetails?.custom_price}
              onChange={(e) =>
                setcategorydetails({
                  ...categorydetails,
                  custom_price: e.target.value,
                })
              }
            />
          </Form.Group>
        </div>

        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Available Color</Form.Label>
            <select
              id="color-select"
              className="product-category"
              name="category"
              multiple
              value={selectedColors}
              onChange={handleColorChange}
            >
              {color?.map((singleColor) => (
                <option key={singleColor.color_id} value={singleColor.color_id}>
                  {singleColor.color_id}
                  <span> ({singleColor.color_name})</span>
                </option>
              ))}
            </select>
          </Form.Group>
          <div className="mb-3 firstname-staff">
            <strong>Selected Colors:</strong>
            <div id="selected-colorss">
              {selectedColors?.map((selectedColor) => (
                <li key={selectedColor.color_id} className="selected-color">
                  {selectedColor.color_name}

                  <span
                    className=""
                    onClick={() =>
                      handleColorChange({
                        target: { value: selectedColor.color_id },
                      })
                    }
                  >
                    X
                  </span>
                </li>
              ))}
            </div>
          </div>
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

export default DashbordCustomizedCategoryEdit;
