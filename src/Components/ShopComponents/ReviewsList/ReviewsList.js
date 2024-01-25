import React, { useEffect, useState } from "react";
import "./ReviewsList.css";
import Rating from "react-rating-stars-component";
const ReviewsList = ({ oneproduct }) => {
  console.log(oneproduct);
  const [reviews, setreviews] = useState([]);
  const [cuscurrentpage, setcuscurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(5);
  const [cuscount, setcuscount] = useState(0);
  const custompage = Math.ceil(cuscount / datasize);
  console.log("Review List");
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/bestreviews?category_id=${oneproduct?.category_id}&product_id=${oneproduct?.product_id}&page=${cuscurrentpage}&&size=${datasize}`
    )
      .then((res) => res.json())
      .then((data) => {
        setreviews(data.result);
        setcuscount(data?.count);
      });
  }, [
    oneproduct?.product_id,
    oneproduct?.category_id,
    cuscurrentpage,
    datasize,
  ]);
  return (
    <div className="reviews_list_con">
      <div>
        {reviews?.map((review) => (
          <div className="review_info_con">
            <div className="review_hed_con">
              <div className="review_hed_left">
                <p className="ratting_hed">Ratting: {review?.userRating}</p>
                <Rating value={review.userRating} size={30} edit={false} />
                <p className="ratting_hed1">{review?.name}</p>
              </div>
              <p>{review?.review_date}</p>
            </div>
            <p className="review_text">{review?.review}</p>
          </div>
        ))}
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
  );
};

export default ReviewsList;
