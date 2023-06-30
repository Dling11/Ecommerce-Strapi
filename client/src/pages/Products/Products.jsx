import List from "../../components/List/List";
import { useParams } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import "./Products.scss";

const Products = () => {

  // const param = useParams();      // useParams returns the, params of the url :id ( Currently ) || console to check it
  // // console.log(param);
  const catId = parseInt(useParams().id); //converting it to Int, also getting now the id of the product or item
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState("asc");
  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const { data, loading, error } = useFetch(
    `/sub-categories?[filters][categories][id][$eq]=${catId}`
  );

  // trigger on change
  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  // Hey Rowell read me //==> the problem between this application, is that the filtering price is that reccomended, later on if your product will increase you will have difficulties on dealing with this

  return (
    <div className='products'>
      <div className="left">

        {/* Product Categories */}
        {data?.map((item) => (
          <div 
            className="inputItem" 
            key={item.id}
          >
            <input
              className="checkBoxInput"
              type="checkbox"
              id={item.id}
              value={item.id}
              onChange={handleChange}     // handle's the sequence between triggers
            />
            <label 
              className="checkBoxLabel"
              htmlFor={item.id}>
                {item.attributes.title}</label>
          </div>
        ))}

        {/* Filter By price */}
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span className="numberRangeFirst">0</span>
            <input 
              className="inputRange"
              type="range"
              min={0}
              max={1000}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span className="numberRangeSecond">{maxPrice}</span>
          </div>
        </div>

        {/* Sort by */}
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input 
              type="radio" 
              name="price" 
              value="asc" 
              id="asc" 
              onChange={(e) => setSort("asc")}
            />
            <label htmlFor="asc"> Price (Lowest first) </label>
          </div>
          <div className="inputItem">
            <input 
              type="radio" 
              name="price" 
              value="dsc" 
              id="dsc" 
              onChange={(e) => setSort("desc")}
            />
            <label htmlFor="dsc"> Price (Highest first) </label>
          </div>
        </div>
      </div>
      {/* Right div */}
      <div className="right">
        <img
          className="catImg"
          src="https://img.freepik.com/free-vector/night-ocean-landscape-full-moon-stars-shine_107791-7397.jpg?w=1380&t=st=1687529798~exp=1687530398~hmac=7928fb3edd0fa32b46e03c2c31be89a07fcd4915b1fdb96b3c2fb3c6405e0bca"
          alt=""
        />
        {/* Sending to it to list, all necessary Data */}
        <List 
          catId={catId} 
          maxPrice={maxPrice} 
          sort={sort} 
          subCats={selectedSubCats}
        />
      </div>
    </div>
  )
}

export default Products