import { useEffect } from "react";
import { useSelector } from "react-redux";

import useHttp from "./hooks/use-http";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cartUser = useSelector((state) => state.cart.user);
  const cartItems = useSelector((state) => state.cart.items);

  const { isLoading, error, sendRequest: updateCart } = useHttp();
  console.warn("--> App - Start");
  console.count("App-start");
  console.log("isUpdating: " + isLoading);

  useEffect(() => {
    console.error("--> App - useEffect called");
    console.count("useEffect");
    let updateRe;
    // console.log(cartItems);
    try {
      const requestConfig = {
        url: "http://localhost:8000/api/carts",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          user: cartUser,
          items: cartItems,
        },
      };
      const applyUpdateResponse = (updateResponse) => {
        console.log("-> App - applyUpdateResponse");
        console.log(updateResponse);
      };

      updateCart(requestConfig, applyUpdateResponse);
      console.log("--> App - after updateCart");
      console.log("isUpdating: " + isLoading);
    } catch (error) {
      console.log("ERROR updating cart " + error);

      //throw error;
    }
  }, [updateCart, cartItems, cartUser, isLoading]);

  return (
    <Layout isUpdating={isLoading}>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
