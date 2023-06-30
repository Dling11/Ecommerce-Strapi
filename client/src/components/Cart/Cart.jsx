import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { makeRequest } from "../../hooks/makeRequest";
import { loadStripe } from "@stripe/stripe-js";     //npm install --save @stripe/react-stripe-js @stripe/stripe-js
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React from "react";
import "./Cart.scss";

// import data from "./data";

const Cart = () => {

  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  // calculate total price
  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);    //to fiFixed fix neccesary decimals will only show only two
  };

  const stripePromise = loadStripe('pk_test_51NOKALIS1nEgas7SK9FrQlSY2UKPpo97bZfwB1dfT68KucqLwVHMj9VniPmgwf5muxn3XM3Se4VGAcrKFYUL2nZo00xDEZjmGR');  //Publishable key || stripe

  // handle payment
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makeRequest.post("/orders", {
        products,
      });
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cart">
     <h1>Products in your cart</h1>
      {products.map(item => (
        <div
          className="item"
          key={item.id}
        >
          <img 
            src={process.env.REACT_APP_UPLOAD_URL + item.img}
            alt={`${item.title} - ${item.id}`} 
          />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.desc.substring(0, 100)}</p>    {/* New knowldge => js method, main concept of it is that it only show 0-100 characters*/}
            {/* quantity & price */}
            <div className="price">
              {item.quantity} x {item.price}      
            </div>
          </div>
          <DeleteOutlinedIcon
            className="delete"
            onClick={() => dispatch(removeItem(item.id))}
          />
        </div>
      ))}
      {/* Total Prices*/}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>${totalPrice()}</span>
      </div>
      <button 
        onClick={handlePayment}
      >
        PROCEED TO CHECKOUT
      </button>
      <span 
        className="reset" 
        onClick={() => dispatch(resetCart())}
      >
        Reset Cart
      </span>
    </div> 
  )
}

export default Cart