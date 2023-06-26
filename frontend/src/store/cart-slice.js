import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    user: "",
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    setUser(state, action) {
      console.log("cart-slice -> setUser");
      const user = action.payload;
      state.user = user;
    },
    replaceCart(state, action) {
      console.log("cartSlice.replaceCart -> action data");
      console.log(action);
      state.user = action.payload.user;
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addItemToCart(state, action) {
      console.log("cart-slice -> addItemToCart");
      const newItem = action.payload.item;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
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
      state.changed = true;
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
      state.changed = true;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
