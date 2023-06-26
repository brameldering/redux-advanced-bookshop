import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const loadCartData = (cartUser) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        showHeader: false,
      })
    );
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/api/carts/${cartUser}`);
      if (!response.ok) {
        throw new Error(`Loading cart data failed! (${response.status} - ${response.statusText})`);
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      console.log("loadCartData cartData:");
      console.log(cartData);
      dispatch(
        cartActions.replaceCart({
          user: cartUser,
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      console.error("Error in loadCartData: " + error.message);
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Error in loadCartData: " + error.message,
          showHeader: true,
        })
      );
    }
  };
};

export const saveCartData = (cartUser, cartItems, cartTotalQuantity) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        showHeader: false,
      })
    );
    const sendRequest = async () => {
      const response = await fetch("http://localhost:8000/api/carts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: cartUser,
          items: cartItems,
          totalQuantity: cartTotalQuantity,
        }),
      });
      if (!response.ok) {
        throw new Error(`Saving cart data failed! (${response.status} - ${response.statusText})`);
      }
    };
    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          showHeader: false,
        })
      );
    } catch (error) {
      console.error("Error in saveCartData: " + error.message);
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Error in saveCartData: " + error.message,
          showHeader: true,
        })
      );
    }
  };
};
