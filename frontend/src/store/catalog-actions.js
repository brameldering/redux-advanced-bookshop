import { uiActions } from "./ui-slice";
import { catalogActions } from "./catalog-slice";

export const loadCatalogData = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        showHeader: false,
      })
    );
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/products");
      if (!response.ok) {
        throw new Error(
          `Loading catalog data failed! (${response.status} - ${response.statusText})`
        );
      }
      const data = await response.json();
      return data;
    };
    try {
      const catalogData = await fetchData();
      console.log("loadCatalogData catalogData:");
      console.log(catalogData);

      dispatch(catalogActions.loadCatalog(catalogData));
      dispatch(
        uiActions.showNotification({
          status: "success",
          showHeader: false,
        })
      );
    } catch (error) {
      console.error("Error in loadCatalogData: " + error.message);
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Error in loadCatalogData: " + error.message,
          showHeader: true,
        })
      );
    }
  };
};
