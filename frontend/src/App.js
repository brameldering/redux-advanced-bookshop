import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Notification from "./components/UI/Notification";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui-slice";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cartUser = useSelector((state) => state.cart.user);
  const cartItems = useSelector((state) => state.cart.items);

  let isUpdating = notification && notification.status === "pending";

  console.count("App-start");

  useEffect(() => {
    console.count("--> App useEffect");
    const writeCart = async () => {
      console.log("writeCart");
      // setIsUpdating(true);
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Saving...",
          message: "Saving cart data",
        })
      );

      await new Promise((r) => setTimeout(r, 1000));

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
        console.warn(response);
        throw new Error(`Sending cart data failed! (${response.status} - ${response.statusText})`);
      }
      const responseData = await response.json();
      console.log("-> App - responseData");
      console.log(responseData);
      // setIsUpdating(false);
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Saved cart data succesfully",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cartUser && cartItems.length > 0) {
      writeCart().catch((error) => {
        console.error("Error in writeCart ");
        console.log(error.message);
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: error.message,
          })
        );
      });
      console.log("--> App - after writeCart");
    }
  }, [cartItems, cartUser, dispatch]);

  console.info("--> App isUpdating: " + isUpdating);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout isUpdating={isUpdating}>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
