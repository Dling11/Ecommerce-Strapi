import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import "./Navbar.scss"
import { useSelector } from "react-redux";

const Navbar = () => {

  const products = useSelector((state) => state.cart.products);

  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">
      {/* Wrapper */}
      <div className="wrapper">
        {/* first container */}
        <div className="left">
          <div className="item">
            <img 
              className="phFlag"
              src="https://em-content.zobj.net/thumbs/120/twitter/351/flag-philippines_1f1f5-1f1ed.png" 
              alt="" 
            />
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <span>TAG PISO</span>
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <Link className ="link" to="/products/1">Women</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/products/2">Men</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/products/3">Children</Link>
          </div>
        </div>
        {/* second container || center || Homepage */}
        <div className="center">
          <Link className ="link" to="/">Dling's Store</Link>
        </div>
        {/* Third Container */}
        <div className="right">
          <div className="item">
            <Link className ="link" to="/">Homepage</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/">About</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/">Contact</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/">Stores</Link>
          </div>
          {/* Icons */}
          <div className="icons">
            <SearchIcon
              className="cartIcon" 
            />
            <PersonOutlineOutlinedIcon
              className="cartIcon"
            />
            <FavoriteBorderOutlinedIcon
              className="cartIcon"
            />
            <div 
              className="cartIcon" 
              onClick={() => setOpen(!open)}
            >
              <ShoppingCartOutlinedIcon/>
              <span>{products.length}</span>
            </div>
          </div>
        </div>
      </div>
      {/* If open & show this */}
      {open && 
        <Cart

        />}
    </div>
  )
}

export default Navbar