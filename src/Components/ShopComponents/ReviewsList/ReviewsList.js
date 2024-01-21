import React, { useContext, useEffect, useState } from "react";
import "./ReviewsList.css";
import { AuthContext } from "../../../Context/UserContext";
import Rating from "react-rating-stars-component";
const ReviewsList = ({ oneproduct }) => {
  const { user } = useContext(AuthContext);
  console.log(oneproduct);
  const [reviews, setreviews] = useState([]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/bestreviews?category_id=${oneproduct?.category_id}&product_id=${oneproduct?.product_id}`
    )
      .then((res) => res.json())
      .then((data) => setreviews(data));
  }, [oneproduct?.product_id, oneproduct?.category_id]);
  console.log(reviews);
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
            <p>{review?.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
