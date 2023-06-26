import React from "react";
import { useSelector } from "react-redux";
import LoadingIndicator from "../UI/LoadingIndicator/LoadingIndicator";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  const catalogItems = useSelector((state) => state.catalog.productCatalog);
  const notification = useSelector((state) => state.ui.notification);

  let isLoading = notification && notification.status === "pending";

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
          {catalogItems.map((product) => (
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
