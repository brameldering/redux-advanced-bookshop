import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../../store/ui-slice";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const [btnIsHiglighted, setBtnIsHiglighted] = useState(false);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  // This CSS will cause the button to bump for 300 ms.
  // The useEffect below controls the btnIsHighlighted state with a timer and a cleanup function for the timer.
  let btnClasses = `${classes.button} ${btnIsHiglighted ? classes.bump : ""}`;
  useEffect(() => {
    if (cartQuantity === 0) {
      return;
    }
    setBtnIsHiglighted(true);

    const timerId = setTimeout(() => {
      setBtnIsHiglighted(false);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [cartQuantity]);

  return (
    <button className={btnClasses} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
