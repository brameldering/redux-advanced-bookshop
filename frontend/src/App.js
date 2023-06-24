import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cartUser = useSelector((state) => state.cart.user);
  const cartItems = useSelector((state) => state.cart.items);

  const [isUpdating, setIsUpdating] = useState(false);

  console.count("App-start");

  useEffect(() => {
    console.warn("--> App - useEffect called");
    console.count("useEffect");
    const writeCart = async () => {
      setIsUpdating(true);
      const response = await fetch("http://localhost:8000/api/carts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: cartUser,
          items: cartItems,
        }),
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("Request failed!");
      }
      const updateResponse = await response.json();
      console.log("-> App - updateResponse");
      console.log(updateResponse);
      // await new Promise((r) => setTimeout(r, 500));
      setIsUpdating(false);
    };

    if (cartUser && cartItems.length > 0) {
      writeCart().catch((error) => {
        console.error("Error in writeCart ");
        console.log(error);
      });
      console.log("--> App - after writeCart");
    }
  }, [cartItems, cartUser]);

  return (
    <Layout isUpdating={isUpdating}>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
