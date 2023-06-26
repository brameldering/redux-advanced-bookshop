import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Notification from "./components/UI/Notification";
import Products from "./components/Shop/Products";
import { loadCatalogData } from "./store/catalog-actions";
import { loadCartData, saveCartData } from "./store/cart-actions";
import { cartActions } from "./store/cart-slice";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cartUser = useSelector((state) => state.cart.user);
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartChanged = useSelector((state) => state.cart.changed);

  let isUpdating = notification && notification.status === "pending";

  console.count("App-start");

  // ===================== Login =====================
  useEffect(() => {
    console.count("--> App useEffect On Mount");
    const user = "Bram3";
    dispatch(cartActions.setUser(user));
  }, [dispatch]);

  // ===================== load catalog =====================
  useEffect(() => {
    console.count("---> App - UseEffect");
    dispatch(loadCatalogData());
    console.log("--> Cart - after dispatch loadCatalogData");
  }, [dispatch]);

  // ===================== load cart =====================
  useEffect(() => {
    console.count("---> App - UseEffect - loadCartData");
    if (cartUser) {
      dispatch(loadCartData(cartUser));
      console.log("--> Cart - after dispatch loadCartData");
    }
  }, [cartUser, dispatch]);

  // ===================== Save Cart =====================
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    // cartChanged is there to avoid the cart being saved upon replaceCart (used at initial load of card)
    // when an item is added or removed from the cart then cartChanged is set to true in cart-slice
    if (cartChanged) {
      dispatch(saveCartData(cartUser, cartItems, cartTotalQuantity));
      console.log("--> App - after dispatch sendCartData");
    }
  }, [cartChanged, cartUser, cartItems, cartTotalQuantity, dispatch]);

  return (
    <Fragment>
      {notification && notification.showHeader && (
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
