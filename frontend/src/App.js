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

  const { isUpdating, errorUpdating, sendRequest: updateCart } = useHttp();

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
    } catch (error) {
      console.log("ERROR updating cart " + error);

      //throw error;
    }
  }, [updateCart, cartItems, cartUser]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
