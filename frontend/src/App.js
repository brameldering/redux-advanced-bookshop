import { useEffect } from "react";
import { useSelector } from "react-redux";

import useHttp from "./hooks/use-http";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const cartUser = cart.user;
  const cartItems = cart.items;

  // const cartUser = useSelector((state) => state.cart.user);
  // const cartItems = useSelector((state) => state.cart.items);

  const { isLoading, error, sendRequest: updateCart } = useHttp();
  console.log("--- App 1 ---");
  console.log("isUpdating: " + isLoading);

  useEffect(() => {
    console.group();
    console.log("Cart - useEffect called");
    console.log("cartUser: " + cartUser);
    console.log(cartItems);
    console.groupEnd();
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
        console.log("updateResponse");
        console.log(updateResponse);
      };

      updateCart(requestConfig, applyUpdateResponse);
      console.log("--- App 2 ---");
      console.log("isUpdating: " + isLoading);
    } catch (error) {
      console.log("ERROR updating cart " + error);

      //throw error;
    }
  }, [updateCart, cartItems, cartUser]);

  return (
    <Layout isUpdating={isLoading}>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
