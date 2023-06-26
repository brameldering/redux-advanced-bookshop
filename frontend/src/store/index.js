import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import catalogSlice from "./catalog-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, catalog: catalogSlice.reducer, cart: cartSlice.reducer },
});

export default store;
