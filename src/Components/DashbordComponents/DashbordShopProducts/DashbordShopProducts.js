import React, { useEffect, useState } from "react";
import { LuClipboardEdit, LuImport } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import "./DashbordShopProducts.css";
import { BiPrinter } from "react-icons/bi";
import { FaSearchPlus } from "react-icons/fa";
import Loading from "../../../CommonComponents/Loading/Loading";
import { Link, json } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
const DashbordShopProducts = () => {
  const [products, setproducts] = useState([]);
  const [cuscurrentpage, setcuscurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(20);
  const [cuscount, setcuscount] = useState(0);
  const custompage = Math.ceil(cuscount / datasize);
  const [loading, setloading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleOptionClick = (product) => {
    if (!selectedOptions.includes(product)) {
      setSelectedOptions([...selectedOptions, product]);
    } else {
      setSelectedOptions(selectedOptions.filter((item) => item !== product));
    }
  };
  console.log(selectedOptions);
  const isDeleteButtonDisabled = selectedOptions.length === 0;
  const productid = selectedOptions.map((item) => item._id);
  console.log(productid);
  const handledeleteproduct = () => {
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
        refetch();
      });
  };

  const { data: productall = [], refetch } = useQuery({
    queryKey: [
      "shopallproduct",
      {
        // search: searchvalue,
        page: cuscurrentpage,
        size: datasize,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/shopallproduct?page=${cuscurrentpage}&size=${datasize}`,
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

  // useEffect(() => {
  //   fetch(
  //     `${process.env.REACT_APP_URL}/shopallproduct?page=${cuscurrentpage}&size=${datasize}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setproducts(data?.product);
  //       setcuscount(data?.count);
  //       setloading(false);
  //     });
  // }, [cuscurrentpage, datasize]);

  console.log(products);
  const handleFileUpload = (event) => {
    console.log("click");
    const file = event.target.files[0];
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
                refetch();
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        } catch (error) {
          console.error("Invalid JSON file:", error);
        }
      };

      reader.readAsText(file);
    }
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
          <Link to="/dashbord/shop-product-add" className="add-product-link">
            <button id="add-product-btn">
              <IoMdAdd className="bulk-icon"></IoMdAdd> Add Producat
            </button>
          </Link>
          {/* <button  id="add-product-btn">
            <IoMdAdd className="bulk-icon"></IoMdAdd> Add Producat
          </button> */}
        </div>
      </div>
      <div className="product-search-con">
        <input
          className="product-search"
          type="text"
          placeholder="Search Product"
        />
        <select
          className="product-category-search"
          id="cars"
          placeholder="Category"
        >
          <option value="" disabled selected>
            Category
          </option>
          <option value="saab">Shari</option>
          <option value="vw">T-shirt</option>
          <option value="audi">Panjabi</option>
        </select>
        <select className="product-category-search" id="cars">
          <option value="" disabled selected>
            Price
          </option>
          <option value="saab">Low To High</option>
          <option value="vw">Processing</option>
          <option value="audi">Audi</option>
        </select>
        <button className="product-filter">Filter</button>
        <button className="product-reset">ReSet</button>
      </div>

      {loading ? (
        <>
          <Loading></Loading>
        </>
      ) : (
        <>
          <div className="all-product-con">
            <div className="overflow-x-auto">
              <div className="overflow-x-auto">
                <table className="table recent-order-table">
                  {/* <thead> */}
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
                  {/* </thead> */}
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
                              // onClick={() => handledelete(order)}
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
    </div>
  );
};

export default DashbordShopProducts;
