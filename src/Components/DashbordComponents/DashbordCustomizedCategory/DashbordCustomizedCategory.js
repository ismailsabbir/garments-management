import React from "react";
import "./DashbordCustomizedCategory.css";
import { useState } from "react";
import { useEffect } from "react";
import { LuClipboardEdit, LuImport } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { BiPrinter } from "react-icons/bi";
import { FaSearchPlus } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import NotFound from "../../../CommonComponents/NotFound/NotFound";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import Loading from "../../../CommonComponents/Loading/Loading";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
const DashbordCustomizedCategory = () => {
  const [products, setproducts] = useState([]);
  const [cuscurrentpage, setcuscurrentpage] = useState(0);
  const [loading, setloading] = useState(true);
  const [datasize, setdatasize] = useState(10);
  const [cuscount, setcuscount] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const custompage = Math.ceil(cuscount / datasize);
  const [search, setsearch] = useState("");
  const [reset, setreset] = useState(false);
  // customizedcategory
  const { data: productall = [], refetch } = useQuery({
    queryKey: [
      "customized-details-all",
      {
        // category: category,
        search: search,
        page: cuscurrentpage,
        size: datasize,
        reset: reset,
        // status: status,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/customized-details-all?page=${cuscurrentpage}&size=${datasize}&search=${search}&reset=${reset}`,
        {
          headers: {
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
        }
      )
        .then((req) => req.json())
        .then((data) => {
          console.log(data);
          setproducts(data?.category);
          setcuscount(data?.count);
          setloading(false);
          return data;
        }),
  });
  console.log(products);
  const handleFileUpload = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];
    console.log("file is ", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const fileContents = JSON.parse(e.target.result);
          console.log(fileContents);
          for (let i = 0; i < fileContents.length; i++) {
            console.log(fileContents[i]);

            fetch(`${process.env.REACT_APP_URL}/customizedcategory`, {
              method: "POST",
              body: JSON.stringify(fileContents[i]),
              headers: {
                "Content-type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                toast("Product add sucessfully !!!", {
                  position: "top-center",
                  autoClose: 1000,
                });
                refetch();
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        } catch (error) {
          console.error("Invalid JSON file:", error);
        } finally {
          fileInput.value = "";
        }
      };

      reader.readAsText(file);
    }
  };

  const handledeletecategory = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delate the Category",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELATE",
    }).then((result) => {
      if (result.isConfirmed) {
        const productid = [product?._id];
        fetch(`${process.env.REACT_APP_URL}/delete-customized-category`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },

          body: JSON.stringify(productid),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data?.deletedCount > 0) {
              toast("Category delete sucessfully !!!", {
                position: "top-center",
                autoClose: 1000,
              });
            }
            refetch();
          });
      }
    });
  };
  const handleOptionClick = (product) => {
    if (!selectedOptions.includes(product)) {
      setSelectedOptions([...selectedOptions, product]);
    } else {
      setSelectedOptions(selectedOptions.filter((item) => item !== product));
    }
  };
  const isDeleteButtonDisabled = selectedOptions.length === 0;
  const productid = selectedOptions.map((item) => item._id);
  console.log(productid);
  const handledeleteproduct = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delate the Category",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELATE",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(selectedOptions);
        fetch(`${process.env.REACT_APP_URL}/delete-customized-category`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },

          body: JSON.stringify(productid),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data?.deletedCount > 0) {
              toast("Category delete sucessfully !!!", {
                position: "top-center",
                autoClose: 1000,
              });
            }
            refetch();
          });
      }
    });
  };
  const handleproductsearch = (e) => {
    e.preventDefault();
    const search = e.target.searchproduct.value;
    console.log(search);
    setreset(false);
    setsearch(search);
  };
  const handlereset = () => {
    setreset(true);
  };
  return (
    <div className="dashbord-shop-product-con">
      <h5>Shop Products</h5>
      <div className="import-update-delete-btn-con">
        <label
          for="input-file1"
          id="file"
          className="select-json-btn border-dashed border-2 border-green-700"
        >
          <div className="json-input-div">
            <LuImport className="mr-4 text-2xl"></LuImport>
            <p>Select Your JSON Products File</p>
          </div>

          <input
            id="input-file1"
            className="fileinput"
            type="file"
            onChange={handleFileUpload}
          />
        </label>
        <div className="bulk-action">
          {/* <button>
            <LuClipboardEdit className="bulk-icon"></LuClipboardEdit>Bulk Action
          </button> */}
          <button
            onClick={handledeleteproduct}
            id={isDeleteButtonDisabled ? "disablecss" : "pro-delete-btn"}
            disabled={isDeleteButtonDisabled}
          >
            <RiDeleteBinLine className="bulk-icon"></RiDeleteBinLine>Delete
            Product
          </button>
          <Link
            to="/dashbord/shop-category-add"
            state={cuscount}
            className="add-product-link"
          >
            <button id="add-product-btn">
              <IoMdAdd className="bulk-icon"></IoMdAdd> Add Category
            </button>
          </Link>
        </div>
      </div>
      <div className="product-search-con">
        <Form
          onSubmit={handleproductsearch}
          className="serch-form"
          id="category-search-form"
        >
          <input
            className="product-search"
            type="text"
            placeholder="Search Category"
            name="searchproduct"
          />
          <button
            type="submit"
            id="category-filt-btn1"
            className="product-filter"
          >
            Filter
          </button>
        </Form>

        <button
          onClick={handlereset}
          id="category-filt-btn"
          className="product-reset"
        >
          ReSet
        </button>
      </div>
      <div className="all-product-con">
        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            {loading ? (
              <>
                <Loading></Loading>
              </>
            ) : (
              <>
                {products?.length > 0 ? (
                  <>
                    <table className="table recent-order-table">
                      <tr className="recent-order-tr">
                        <th>Select</th>
                        <th className="recent-order-hed">ID</th>
                        <th className="recent-order-hed">Icon</th>
                        <th className="recent-order-hed">NAME</th>
                        <th className="recent-order-hed">DESCRIPTION</th>
                        <th className="recent-order-hed">PUBLISHED</th>
                        <th className="recent-order-hed">VIEW</th>
                        <th className="recent-order-hed">ACTION</th>
                      </tr>

                      <tbody>
                        {products?.map((order) => (
                          <tr>
                            <th>
                              <label>
                                <input
                                  onClick={() => handleOptionClick(order)}
                                  type="checkbox"
                                  className="checkbox"
                                />
                              </label>
                            </th>
                            <td className="das-order-data">
                              <span>{order?.category_id}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>
                                <img
                                  className="dashbord-product"
                                  id="dash-category-img"
                                  src={order?.image}
                                  alt="not"
                                />
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>{order?.name}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>
                                <p className="category_mobile">
                                  Product category
                                </p>
                              </span>{" "}
                            </td>

                            <td className="das-order-data">
                              <span>
                                <input
                                  type="checkbox"
                                  className="toggle toggle-success"
                                  // checked={checkedStates[order.category_id]}
                                  // onChange={() =>
                                  //   handleToggle(order.category_id)
                                  // }
                                />
                              </span>
                            </td>
                            <td className="das-order-data">
                              <span>
                                <Link
                                  to="/dashbord/customized-category-view"
                                  state={order}
                                >
                                  <FaSearchPlus className="printlogo"></FaSearchPlus>
                                </Link>
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <div className="print-serach">
                                <Link
                                  to="/dashbord/customized-category-edit"
                                  state={order}
                                >
                                  <FiEdit className="printlogo"></FiEdit>
                                </Link>

                                <RiDeleteBinLine
                                  onClick={() => handledeletecategory(order)}
                                  className="printlogo"
                                  id="category-delete-btn"
                                ></RiDeleteBinLine>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <>
                    <NotFound></NotFound>
                  </>
                )}
              </>
            )}

            <div className="pagination-con">
              {[...Array(custompage).keys()].map((number) => (
                <button
                  key={number}
                  className={cuscurrentpage === number && "selected-page-btn"}
                  id="paginationbtn"
                  onClick={() => setcuscurrentpage(number)}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordCustomizedCategory;
