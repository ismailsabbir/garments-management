import React from "react";
import { LuImport } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { FaSearchPlus } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import NotFound from "../../../CommonComponents/NotFound/NotFound";
import Loading from "../../../CommonComponents/Loading/Loading";
import { Form } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { servcontext } from "../../../App";
import Swal from "sweetalert2";
const DashbordCustomizedProduct = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [search, setsearch] = useState("");
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [cuscurrentpage, setcuscurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(20);
  const [cuscount, setcuscount] = useState(0);
  const custompage = Math.ceil(cuscount / datasize);
  const [category, setcategory] = useState();
  const [allcategory, setallcategory] = useState([]);
  const alldata = useContext(servcontext);
  console.log("Dashbord Customized Product");
  useEffect(() => {
    setallcategory(alldata?.category);
  }, []);
  const [reset, setreset] = useState(false);
  const [status, setstatus] = useState("");
  const { data: productall = [], refetch } = useQuery({
    queryKey: [
      "customized-color-product-all",
      {
        category: category,
        search: search,
        page: cuscurrentpage,
        size: datasize,
        reset: reset,
        status: status,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/customized-color-product-all?page=${cuscurrentpage}&size=${datasize}&search=${search}&category=${category}&reset=${reset}&status=${status}`,
        {
          headers: {
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
        }
      )
        .then((req) => req.json())
        .then((data) => {
          setproducts(data?.category);
          setcuscount(data?.count);
          setloading(false);
          return data;
        }),
  });

  const handleFileUpload = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const fileContents = JSON.parse(e.target.result);
          for (let i = 0; i < fileContents.length; i++) {
            fetch(`${process.env.REACT_APP_URL}/customized-pproduct`, {
              method: "POST",
              body: JSON.stringify(fileContents[i]),
              headers: {
                "Content-type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((data) => {
                toast("Product add sucessfully !!!", {
                  position: "top-center",
                  autoClose: 1000,
                });
                refetch();
              })
              .catch((err) => {});
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
  const handleOptionClick = (product) => {
    const isSelected = selectedOptions.includes(product);
    if (isSelected) {
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((option) => option !== product)
      );
    } else {
      setSelectedOptions((prevOptions) => [...prevOptions, product]);
    }
  };
  const isDeleteButtonDisabled = selectedOptions?.length === 0;
  const productid = selectedOptions.map((item) => item._id);
  const handledeleteproduct = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delate the product",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELATE",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_URL}/delete-customized-products`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },

          body: JSON.stringify(productid),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.deletedCount > 0) {
              toast("Product delete sucessfully !!!", {
                position: "top-center",
                autoClose: 1000,
              });
            }
            refetch();
          });
      }
    });
  };
  const handledeletecategory = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delate the product",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELATE",
    }).then((result) => {
      if (result.isConfirmed) {
        const productid = [product?._id];
        fetch(
          `${process.env.REACT_APP_URL}/delete-single-custom-product?product_category=${product?.category_id}&product_color=${product?.color_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
              authorization: `Beare ${localStorage.getItem("garments-token")}`,
            },

            body: JSON.stringify(productid),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data?.deletedCount > 0) {
              toast("product delete sucessfully !!!", {
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
    const serchvalue = e.target.searchproduct.value;
    setcategory("");
    setreset(false);
    setsearch(serchvalue);
  };
  const handlecategory = (e) => {
    const category = e.target.value;
    setreset(false);
    setcategory(category);
  };
  const sortProductsByPrice = (e) => {
    if (e === "norm") {
      setproducts(products);
    } else if (e === "sell") {
      setstatus(e);
    } else if (e === "IN STOCK") {
      setreset(false);
      setsearch("");
      setcategory("");
      setstatus(e);
    } else if (e === "STOCK OUT") {
      setreset(false);
      setsearch("");
      setcategory("");
      setstatus(e);
    } else if (e === "assc") {
      const sortedProducts = [...products].sort(
        (a, b) => parseInt(a.default_price) - parseInt(b.default_price)
      );
      setproducts(sortedProducts);
    } else {
      const sortedProducts = [...products].sort(
        (a, b) => parseInt(b.default_price) - parseInt(a.default_price)
      );
      setproducts(sortedProducts);
    }
  };
  const handlereset = () => {
    setsearch(false);
    setreset(true);
  };
  return (
    <div className="dashbord-shop-product-con">
      <h5>Customized Products</h5>

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
          <button
            onClick={handledeleteproduct}
            id={isDeleteButtonDisabled ? "disablecss" : "pro-delete-btn"}
            disabled={isDeleteButtonDisabled}
          >
            <RiDeleteBinLine className="bulk-icon"></RiDeleteBinLine>Delete
            Product
          </button>
          <Link
            to="/dashbord/custom-product-add"
            state={cuscount}
            className="add-product-link"
          >
            <button id="add-product-btn">
              <IoMdAdd className="bulk-icon"></IoMdAdd> Add Producat
            </button>
          </Link>
        </div>
      </div>

      <div className="product-search-con">
        <Form onSubmit={handleproductsearch} className="serch-form">
          <input
            className="product-search"
            type="text"
            placeholder="Search Product"
            name="searchproduct"
          />
        </Form>

        <select
          onChange={handlecategory}
          className="product-category-search"
          id="cars"
          placeholder="Category"
          name="categoryname"
          value={category}
        >
          <option value="" selected>
            Category
          </option>
          {allcategory?.map((category) => (
            <option value={category?.name}>{category?.name}</option>
          ))}
        </select>

        <select
          className="product-category-search"
          id="cars"
          onChange={(e) => sortProductsByPrice(e.target.value)}
        >
          <option value="norm" selected>
            Sorting by price
          </option>
          <option value="assc">Sort by Price:Low to High</option>
          <option value="desc">Sort by Price:High to Low</option>
          <option value="IN STOCK">Status-Selling</option>
          <option value="STOCK OUT">Status-Out Of Stock</option>
        </select>
        <button onClick={handlereset} className="product-reset">
          ReSet
        </button>
      </div>

      {loading ? (
        <>
          <Loading></Loading>
        </>
      ) : (
        <>
          {products?.length < 1 ? (
            <>
              <NotFound></NotFound>
            </>
          ) : (
            <>
              <div className="all-product-con">
                <div className="overflow-x-auto">
                  <div className="overflow-x-auto">
                    <table className="table recent-order-table">
                      <tr className="recent-order-tr">
                        <th>Select</th>
                        <th className="recent-order-hed">PRODUCT NAME</th>
                        <th className="recent-order-hed">CATEGORY</th>
                        <th className="recent-order-hed">DEFAULT PRICE</th>
                        <th className="recent-order-hed">CUSTOMIZED PRICE</th>
                        <th className="recent-order-hed">STOCK</th>
                        <th className="recent-order-hed">STATUS</th>
                        <th className="recent-order-hed">VIEW</th>
                        <th className="recent-order-hed">ACTIONS</th>
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
                              <span className="dashbord-product-image">
                                <img
                                  className="dashbord-product border border-gray-500 p-1"
                                  src={order?.image}
                                  alt="not"
                                />
                                {order?.name}
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>{order?.name}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>Tk: {order?.default_price}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>Tk: {order?.custom_price}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>{order?.availavle}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>
                                <p className="product-sell">Selling</p>
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>
                                <Link
                                  to="/dashbord/custom-product-view"
                                  state={order}
                                >
                                  <FaSearchPlus className="printlogo"></FaSearchPlus>
                                </Link>
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <div className="print-serach">
                                <Link
                                  to="/dashbord/custom-product-edit"
                                  state={order}
                                >
                                  <FiEdit className="printlogo"></FiEdit>
                                </Link>

                                <RiDeleteBinLine
                                  onClick={() => handledeletecategory(order)}
                                  className="printlogo"
                                ></RiDeleteBinLine>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="pagination-con">
                      {[...Array(custompage).keys()].map((number) => (
                        <button
                          key={number}
                          className={
                            cuscurrentpage === number && "selected-page-btn"
                          }
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
            </>
          )}
        </>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordCustomizedProduct;
