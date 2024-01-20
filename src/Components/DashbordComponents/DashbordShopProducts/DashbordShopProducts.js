import React, { useEffect, useState } from "react";
import { LuImport } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import "./DashbordShopProducts.css";
import { FaSearchPlus } from "react-icons/fa";
import Loading from "../../../CommonComponents/Loading/Loading";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import { Form } from "react-bootstrap";
import NotFound from "../../../CommonComponents/NotFound/NotFound";
import Swal from "sweetalert2";
const DashbordShopProducts = () => {
  const [products, setproducts] = useState([]);
  const [cuscurrentpage, setcuscurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(10);
  const [cuscount, setcuscount] = useState(0);
  const custompage = Math.ceil(cuscount / datasize);
  const [loading, setloading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [search, setsearch] = useState("");
  const [category, setcategory] = useState();
  const [allcategory, setallcategory] = useState([]);
  const [reset, setreset] = useState(false);
  const [status, setstatus] = useState("");
  const handleOptionClick = (product) => {
    if (!selectedOptions.includes(product)) {
      setSelectedOptions([...selectedOptions, product]);
    } else {
      setSelectedOptions(selectedOptions.filter((item) => item !== product));
    }
  };
  const isDeleteButtonDisabled = selectedOptions?.length === 0;
  const productid = selectedOptions.map((item) => item._id);
  console.log(productid);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/shopcategory`)
      .then((res) => res.json())
      .then((data) => {
        setallcategory(data);
      });
  }, []);
  const handledeleteproduct = () => {
    Swal.fire({
      title: "Are you sure ??",
      text: "You want to delate the product !!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELATE",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(selectedOptions);
        fetch(`${process.env.REACT_APP_URL}/delete-products`, {
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

  const { data: productall = [], refetch } = useQuery({
    queryKey: [
      "shopallproduct",
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
        `${process.env.REACT_APP_URL}/shopallproduct?page=${cuscurrentpage}&size=${datasize}&search=${search}&category=${category}&reset=${reset}&status=${status}`,
        {
          headers: {
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
        }
      )
        .then((req) => req.json())
        .then((data) => {
          console.log(data);
          setproducts(data?.product);
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
          console.log(fileContents);
          for (let i = 0; i < fileContents.length; i++) {
            console.log(fileContents[i]);

            fetch(`${process.env.REACT_APP_URL}/shopproduct`, {
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
    console.log(e, typeof e);
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
        (a, b) => parseInt(a.product_price) - parseInt(b.product_price)
      );
      setproducts(sortedProducts);
    } else {
      const sortedProducts = [...products].sort(
        (a, b) => parseInt(b.product_price) - parseInt(a.product_price)
      );
      setproducts(sortedProducts);
    }
  };
  const handlereset = () => {
    setsearch(false);
    setreset(true);
  };
  const handledeletecategory = (product) => {
    Swal.fire({
      title: "Are you sure ??",
      text: "You want to delate the product !!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELATE",
    }).then((result) => {
      if (result.isConfirmed) {
        const productid = [product?._id];
        fetch(`${process.env.REACT_APP_URL}/delete-single-product`, {
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
            // accept=".json"
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
            to="/dashbord/shop-product-add"
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
          // onChange={(e) => setcategory(e.target.value)}
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
            <option value={category?.category_name}>
              {category?.category_name}
            </option>
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
          {products.length < 1 ? (
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
                        <th className="recent-order-hed">PRICE</th>
                        <th className="recent-order-hed">SALE PRICE</th>
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
                                  className="dashbord-product"
                                  src={order?.Product_image}
                                  alt="not"
                                />
                                {order?.product_name}
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>{order?.category_name}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>Tk: {order?.product_price}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>Tk: {order?.product_price}</span>{" "}
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
                                  to="/dashbord/shop-product-view"
                                  state={order}
                                >
                                  <FaSearchPlus className="printlogo"></FaSearchPlus>
                                </Link>
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <div className="print-serach">
                                <Link
                                  to="/dashbord/shop-product-edit"
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

export default DashbordShopProducts;
