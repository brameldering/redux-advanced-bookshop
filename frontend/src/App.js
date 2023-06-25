import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Notification from "./components/UI/Notification";
import Products from "./components/Shop/Products";
import { sendCartData } from "./store/cart-slice";
import { cartActions } from "./store/cart-slice";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cartUser = useSelector((state) => state.cart.user);
  const cartItems = useSelector((state) => state.cart.items);

  let isUpdating = notification && notification.status === "pending";

  console.count("App-start");

  // Login
  useEffect(() => {
    console.count("--> App useEffect On Mount");
    const user = "Bram3";
    dispatch(cartActions.setUser(user));
  }, [dispatch]);

  // Save Cart
  useEffect(() => {
    console.count("--> App useEffect - [cartUser, cartItems, dispatch]");
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cartUser && cartItems.length > 0) {
      dispatch(sendCartData(cartUser, cartItems));
      console.log("--> App - after dispatch sendCartData");
    }
  }, [cartUser, cartItems, dispatch]);

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
