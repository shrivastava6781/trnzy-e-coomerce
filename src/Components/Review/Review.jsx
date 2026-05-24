import React, { useState } from "react";
import "./review.css";

const reviewsData = [
  {
    rating: 4,
    name: "Sarah M. 1",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co.",
  },
  {
    rating: 4.5,
    name: "Alex K. 2",
    text: "The range of options they offer is truly remarkable.",
  },
  {
    rating: 4,
    name: "John D. 3",
    text: "Amazing quality and fast delivery. Highly recommended!",
  },
  {
    rating: 5,
    name: "Emma W. 4",
    text: "Great collection and affordable pricing. Loved it!",
  },
  {
    rating: 3,
    name: "David R. 5",
    text: "Customer service is top notch. Will shop again!",
  },
  {
    rating: 4,
    name: "Olivia P. 6",
    text: "Stylish and comfortable clothes. Perfect for daily wear.",
  },
];

const Review = () => {
  const [reviewData] = useState(reviewsData);

  return (
    <div className="review-wrapper">
      <div className="review-title">OUR HAPPY CUSTOMERS</div>

      <div className="slider-container">
        <div className="viewport">
          {reviewData.map((item, i) => (
            <div className="review-card" key={i}>
              <span className="rating">
                {"⭐ ".repeat(Math.floor(item.rating))}
              </span>

              <h4>{item.name} ✅</h4>

              <p>"{item.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;