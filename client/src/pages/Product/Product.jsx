import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import { addToCart } from "../../redux/cartReducer";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "./Product.scss";

const Product = () => {

  const id = useParams().id;
  const dispatch = useDispatch();

  // const images = [
  //   "https://images.unsplash.com/photo-1583744999783-efe9dc5eac91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0JTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D",

  //   "https://images.unsplash.com/photo-1610948199252-995d1f449363?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8"

  // ];

  const { data, loading, error } = useFetch(`/products/${id}?populate=*`);
  
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);

  // take note that this is a single product //==> if posible used disame images for cool interfaces

  return (
    <div className='product'>
          {loading ? (
        "loading"
      ) : (
      <>
        {/* left side */}
        <div className="left">
          <div className="images">
            <img 
              src={ 
                process.env.REACT_APP_UPLOAD_URL +
                data?.attributes?.img?.data?.attributes?.url
              } 
              onClick={() => setSelectedImg("img")}
              alt="Black T shirt" 
            />
            <img 
              src={ 
                process.env.REACT_APP_UPLOAD_URL +
                data?.attributes?.img2?.data?.attributes?.url
              } 
              onClick={() => setSelectedImg("img2")}
              alt="black with glasses" 
            />
          </div>
        </div>
        {/* middle image */}
        <div className="mainImg">
          <img 
            className='middleImg'
            src={                    // show image if user click specific image
              process.env.REACT_APP_UPLOAD_URL +
              data?.attributes[selectedImg]?.data?.attributes?.url
            }
            alt="current pic"
          />
        </div>
        {/* right side */}
        <div className="right">
          <h1>{data?.attributes.title}</h1>
          <span>${data?.attributes.price}</span>
          <p>
          {data?.attributes.desc}
          </p>
          {/* quantity */}
          <div 
            className="quantity"
          >
            <button onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}> - </button>
              {quantity}
            <button onClick={() => setQuantity((prev) => prev + 1)}> + </button>
          </div>
          {/* Add to cart button */}
          <button
                className="add"
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: data.id,
                      title: data.attributes.title,
                      desc: data.attributes.desc,
                      price: data.attributes.price,
                      img: data.attributes.img.data.attributes.url,
                      quantity,             // don't forget to send to the quantity
                    })
                  )
                }
              >
                <AddShoppingCartIcon /> ADD TO CART
              </button>
            {/* Links */}
            <div className="links">
              <div className="item">
                <FavoriteBorderIcon /> ADD TO WISH LIST
              </div>
              <div className="item">
                <BalanceIcon /> ADD TO COMPARE
              </div>
            </div>
            {/* info */}
            <div className="info">
              <span>Creator: Abnoy D. Hacker</span>
              <span>Product Type: T-Shirt</span>
              <span>Tag: T-Shirt, Women, Top, Black</span>
            </div>
              <hr />
            {/* info */}
            <div className="infoLast">
              <span>DESCRIPTION</span>
              <hr />
              <span>ADDITIONAL INFORMATION</span>
              <hr />
              <span>FAQ</span>
            </div>
        </div>
      </>
      )}
    </div>
  )
}

export default Product