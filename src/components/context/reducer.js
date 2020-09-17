export const initialState = { cart: [], user: null };
let index = 0;

const reducer = (items, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.item;
      item.id = item.id + index;
      index++;
      return { ...items, cart: [...items.cart, action.item] };

    case "REMOVE_FROM_CART":
      // const index = items.cart.findIndex((item) => item.id === action.id);
      // let newCart = [...items.cart];

      // if (index >= 0) newCart.splice(index, 1);
      // else console.warn(`Can't remove the product as it's not in cart`);
      const newCart = items.cart.filter((item) => item.id !== action.id);

      return { ...items, cart: newCart };

    case "EMPTY_CART":
      return { ...items, cart: [] };

    case "SET_USER":
      return { ...items, user: action.user };

    default:
      return items;
  }
};

const totalPrice =
  initialState.cart.length !== 0
    ? initialState.cart.map((c) => c.price).reduce((a, c) => c + a)
    : 0;

export default reducer;
export { totalPrice };
