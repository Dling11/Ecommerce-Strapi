import React, { useState } from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import first from "./dummy/11.jpg";
import second from "./dummy/22.jpg";
import third from "./dummy/33.jpg";
import "./Slider.scss";

const Slider = () => {

  const [currentSlide, setCurrentSlide] = useState(0);  // determined which picture is presented

  // const data = [
  //   "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1600",
  // ];
  const data = [ first, second, third ];

  // Find a way someday that the slide wont comeback instead it'll will just proceed infinite || or check old code at mern I think booking
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
  };
  
  return (
    <div className="slider">
      {/* Images */}
      <div 
        className="container"                 // currentSlide is invoke here because it requires for you to multiply it
        style={{transform:`translateX(-${currentSlide * 100}vw)`}} // very important css || take note that the container is 300vw > Slider.scss
      >
        <img src={data[0]} alt="" />
        <img src={data[1]} alt="" />
        <img src={data[2]} alt="" />
      </div>
      {/* icons */}
      <div className="icons">
        <div 
          className="icon" 
          onClick={prevSlide}
        >
          <WestOutlinedIcon />
        </div>
        <div 
          className="icon" 
          onClick={nextSlide}
        >
          <EastOutlinedIcon />
        </div>
      </div>
    </div>
  )
}

export default Slider