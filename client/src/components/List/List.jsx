import React from "react";
import "./List.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";

const List = ({ subCats, maxPrice, sort, catId }) => {

  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(    // ==> map()
      (item) => `&[filters][sub_categories][id][$eq]=${item}`               //check on strappi docs filtering to understand more
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  );

  // &[filters][price][$lte]=${maxPrice} //==> this is a params() method from strappi 

  return (
    <div className="list">
      {loading
        ? <div className="loading">
            <h1>Loading...</h1>
          </div>
        : data?.map((item) => (
          <Card 
            item={item} 
            key={item.id} 
          />
        ))}
    </div>
  );
};

export default List;