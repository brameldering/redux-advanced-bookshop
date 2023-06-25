import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "../UI/Card/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { cartActions } from "../../store/cart-slice";

const Cart = (props) => {
  const dispatch = useDispatch();
  const cartUser = useSelector((state) => state.cart.user);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    console.count("---> Cart - UseEffect");
    if (cartUser) {
      // dispatch(cartActions.loadCartData(cartUser));
      console.log("--> Cart - after dispatch loadCartData");
    }
  }, [cartUser, dispatch]);

  return (
    <Card className={classes.cart}>
      <h2>{cartUser}'s Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              total: item.totalPrice,
              price: item.price,
              user: cartUser,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
