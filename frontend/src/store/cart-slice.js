import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    user: "",
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      console.log("cart-slice -> addItemToCart");
      const user = action.payload.user;
      const newItem = action.payload.item;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.user = user;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      console.log("cart-slice -> removeItemFromCart");
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const sendCartData = (cartUser, cartItems) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Saving...",
        message: "Saving cart data",
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
        }),
      });
      if (!response.ok) {
        console.warn(response);
        throw new Error(`Sending cart data failed! (${response.status} - ${response.statusText})`);
      }
    };

    try {
      await sendRequest();
      await new Promise((r) => setTimeout(r, 1000));
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Saved cart data succesfully",
        })
      );
    } catch (error) {
      console.error("Error in writeCart: " + error.message);
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: error.message,
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
