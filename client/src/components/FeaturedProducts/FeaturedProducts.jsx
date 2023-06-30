import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../Card/Card";
import "./index.scss";
// import axios from "axios";

const FeaturedProducts = ({ type }) => {

  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );

  // Old code
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(          // ?populate=* is very important for img rendering
  //         process.env.REACT_APP_API_URL + `/products?populate=*&[filters][type][$eq]=${type}`,
  //         {     // check strappi docs => about filters basically return a request, base on what type it is ex. "trending => created in strappi"
  //           headers: {
  //             // Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
  //             Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
  //           }
  //         }
  //       )
  //       setData(res.data.data);
  //       // console.log(res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, [])
  
  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas.
        </p>
      </div>
      <div className="bottom">
        {error ? "Something went wrong!"    // created a error handler in the future
          : loading
          ? "loading"
          : data?.map((item) => (
            <Card item={item} key={item.id} />
          ))}

          {/* {data.map((item) => (
            <Card 
              key={item.id}
              item={item}
            />
          ))} */}
      </div>
    </div>
  );
};

export default FeaturedProducts;
