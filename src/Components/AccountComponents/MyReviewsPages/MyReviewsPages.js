import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { Form } from "react-bootstrap";
import Loading from "../../../CommonComponents/Loading/Loading";
import "./MyReviewsPages.css";
import Rating from "react-rating-stars-component";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
const MyReviewsPages = () => {
  const { user, userlogout } = useContext(AuthContext);
  const [orders, setorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentpage, setcurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(5);
  const [count, setcount] = useState(0);
  const page = Math.ceil(count / datasize);
  console.log("My Review Page");
  const { data: productall = [], refetch } = useQuery({
    queryKey: [
      "myreviews",
      {
        email: user?.email,
        page: currentpage,
        size: datasize,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/myreviews?email=${user?.email}&page=${currentpage}&size=${datasize}`,
        {
          headers: {
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
        }
      )
        .then((req) => req.json())
        .then((data) => {
          setorders(data.product);
          setcount(data.count);
          setLoading(false);
          return data;
        }),
  });
  const handlesearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    fetch(
      `${process.env.REACT_APP_URL}/idodrders?email=${user?.email}&page=${currentpage}&size=${datasize}&search=${search}`,
      {
        headers: {
          authorization: `Beare ${localStorage.getItem("garments-token")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return userlogout();
        }
        return res.json();
      })
      .then((jsonData) => {
        setorders(jsonData.product);
        setcount(jsonData.count);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      });
  };
  const handledelateRevier = (review) => {
    Swal.fire({
      title: "Are you sure ??",
      text: "You want to delate the review !!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELATE",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_URL}/delete_review?id=${review?._id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
          body: JSON.stringify(review),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.deletedCount > 0) {
              toast("Review delete sucessfully !!!", {
                position: "top-center",
                autoClose: 1000,
              });
              refetch();
            }
          });
      }
    });
  };
  return (
    <div className="my-orders-continer">
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="order-quenty-con">
            <select
              onChange={(e) => setdatasize(e.target.value)}
              className="select1 select-bordered "
            >
              <option value="2" selected>
                2
              </option>
              <option value="5" selected>
                5
              </option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <Form onSubmit={handlesearch} className="search-con">
              <input name="search" placeholder="Search by order id" />
              <button type="submit">Search</button>
            </Form>
          </div>

          {orders?.map((order) => (
            <div className="shop-order-manage">
              <div className="shop-order-manage-title">
                <div>
                  <h6 className="review_priduct_name">
                    Product {order?.product_name}
                  </h6>
                  <h6>Placed on {order?.review_date}</h6>
                </div>
                <div>
                  <button
                    className="review_delate_btn"
                    onClick={() => handledelateRevier(order)}
                  >
                    Delate Review
                  </button>
                </div>
              </div>

              <div className="shop-order-product-manage" id="review_info_con">
                <p>{order?.review}</p>
                <Rating value={order?.userRating} size={30} edit={false} />
              </div>
            </div>
          ))}
          <div className="pagination-con">
            {[...Array(page).keys()].map((number) => (
              <button
                key={number}
                className={currentpage === number && "selected-page-btn"}
                id="paginationbtn"
                onClick={() => setcurrentpage(number)}
              >
                {number}
              </button>
            ))}
          </div>
        </>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default MyReviewsPages;
