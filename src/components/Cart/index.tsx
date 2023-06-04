import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

import { removeFromCart } from '../../store/cartSlice';
import { Dispatch } from 'redux';

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<Dispatch>();

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart({ productId }));
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.product.id}>
            <h4>{item.product.name}</h4>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleRemoveFromCart(item.product.id)}>
              Remove from Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
