import React, { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import LoadingIndicator from "../UI/LoadingIndicator/LoadingIndicator";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  const [booksCatalog, setBooksCatalog] = useState([]);

  const { isLoading, errorFetching, sendRequest: fetchBooks } = useHttp();
  useEffect(() => {
    console.log("Products - useEffect called");
    const transformBooks = (BookObj) => {
      console.log(BookObj);
      const loadedBooks = [];
      for (const book in BookObj) {
        loadedBooks.push({ ...BookObj[book], date: new Date(BookObj[book].date) });
      }
      setBooksCatalog(loadedBooks);
    };
    const requestConfig = {
      url: "http://localhost:8000/api/books",
    };
    fetchBooks(requestConfig, transformBooks);
  }, [fetchBooks]);

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
          {booksCatalog.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
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
