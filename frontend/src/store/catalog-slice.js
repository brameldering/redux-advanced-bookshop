import { createSlice } from "@reduxjs/toolkit";

const catalogSlice = createSlice({
  name: "catalog",
  initialState: {
    productCatalog: [],
  },
  reducers: {
    loadCatalog(state, action) {
      console.log("catalogSlice.loadCart -> action data");
      console.log(action);
      state.productCatalog = action.payload;
    },
  },
});

export const catalogActions = catalogSlice.actions;

export default catalogSlice;
