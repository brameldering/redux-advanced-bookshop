import React, { useState, useEffect } from "react";
import useHttpGet from "../../hooks/use-http-GET";
import LoadingIndicator from "../UI/LoadingIndicator/LoadingIndicator";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  const [productCatalog, setProductCatalog] = useState([]);

  const { isLoading, errorFetching, sendRequest: fetchProducts } = useHttpGet();
  useEffect(() => {
    console.log("Products - useEffect called");
    const transformProducts = (ProductObj) => {
      console.log("ProductObj");
      console.log(ProductObj);
      const loadedProducts = [];
      for (const product in ProductObj) {
        loadedProducts.push({ ...ProductObj[product], date: new Date(ProductObj[product].date) });
      }
      setProductCatalog(loadedProducts);
    };
    const requestConfig = {
      url: "http://localhost:8000/api/products",
    };
    fetchProducts(requestConfig, transformProducts);
  }, [fetchProducts]);

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      {isLoading && (
        <div className={classes["loading-indicator"]}>
          <LoadingIndicator
            segmentWidth={10}
            segmentLength={20}
            spacing={10}
            color={{
              red: 225,
              green: 225,
              blue: 225,
              alpha: 0.85,
            }}
          />
        </div>
      )}
      {!isLoading && (
        <ul>
          {productCatalog.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Products;
