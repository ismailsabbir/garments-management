import React from "react";
import "./DashbordAddProduct.css";
import { Form } from "react-bootstrap";
import { BsFillImageFill } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
const DashbordAddProduct = () => {
  const handleAddProduct = () => {
    console.log("add");
  };
  return (
    <div className="add-staff-con">
      <h5>Add Product</h5>
      <p>Add your product and necessary information from here</p>

      <Form onSubmit={handleAddProduct} className="add-staff-form">
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
                  //   onChange={handleimage1}
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
                <h6>Drag your images here</h6>
                <p>(Only *.jpeg, *.webp and *.png images will be accepted)</p>
                <input
                  type="file"
                  id="input-file2"
                  className="fileinput"
                  name="image"
                  //   onClick={handleimage2}
                />
              </label>
            </Form.Group>
          </div>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Product Title/Name</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Title/Name"
              name="productname"
              //   value={userData?.product_name}
              //   onChange={(e) =>
              //     setUserData({ ...userData, product_name: e.target.value })
              //   }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Category</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Category"
              name="category"
              //   value={userData?.category_name}
              //   onChange={(e) =>
              //     setUserData({ ...userData, category_name: e.target.value })
              //   }
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Product Price(tk)</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Price"
              name="price"
              //   value={userData?.product_price}
              //   onChange={(e) =>
              //     setUserData({ ...userData, product_price: e.target.value })
              //   }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Product Quantity</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Quantity"
              name="quantity"
              //   value={userData?.availavle}
              //   onChange={(e) =>
              //     setUserData({ ...userData, availavle: e.target.value })
              //   }
            />
          </Form.Group>
        </div>
        <div className=" mt-4">
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              as="textarea"
              //   value={userData?.description}
              //   onChange={(e) =>
              //     setUserData({ ...userData, description: e.target.value })
              //   }
              name="description"
              rows={3}
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Brand"
              name="brand"
              //   value={userData?.brand}
              //   onChange={(e) =>
              //     setUserData({ ...userData, brand: e.target.value })
              //   }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Product Fabric</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Fabric"
              name="fabric"
              //   value={userData?.fabric}
              //   onChange={(e) =>
              //     setUserData({ ...userData, fabric: e.target.value })
              //   }
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Status</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Status"
              name="status"
              //   value={userData?.stock}
              //   onChange={(e) =>
              //     setUserData({ ...userData, stock: e.target.value })
              //   }
            />
          </Form.Group>
          <button className="add-staf--btn" variant="primary" type="submit">
            UPDATE PRODUCT INFORMATION
          </button>
        </div>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordAddProduct;
