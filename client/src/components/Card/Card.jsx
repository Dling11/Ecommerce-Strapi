import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

const Card = ({ item }) => {    //item is from => FeaturedProducts.jsx
  // console.log(item);
  return (
    <Link className="link" to={`/product/${item.id}`}>
      <div className="card">
        <div className="image">
          {/* main image */}
          {item?.attributes.isNew && <span>New Season</span>}   {/* --> question mark is very important, so that it wont read as unidentify */}
          <img        // The idea about hovering an image is used of z-index in css
            src={
              process.env.REACT_APP_UPLOAD_URL + item.attributes?.img?.data?.attributes?.url
            }     // take note it's important to implement your strappi url || ALSO name it REACT_APP => or it wont work lel
            alt={`${item.title}-${item.id}`}
            className="mainImg"
          />
          {/* second image */}
          <img
            src={
              process.env.REACT_APP_UPLOAD_URL + item.attributes?.img2?.data?.attributes?.url
            }
            alt={`${item.title}-${item.id}`}
            className="secondImg"
          />
        </div>
        {/* Title and Prices */}
        <h2>{item?.attributes.title}</h2>
        <div className="prices">
          <h3>${item.oldPrice || item?.attributes.price + 20}</h3>    {/* ==> +20 for presentation */}
          <h3>${item?.attributes.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
