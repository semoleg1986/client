import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { Product } from '../../types';

import { addToCart, removeFromCart } from '../../store/cartSlice';
import { Dispatch } from 'redux';
import { ButtonP, CartTable, TableBody, TableCell, TableHead, TableHeader, TableRow, TotalCell, TotalRow } from './Cart.styled';
import { toggleCart } from '../../store/cartState';
import { Button } from '../Form/Form.styled';

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<Dispatch>();

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart({ productId }));
  };
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ product: product }));
  };

  const getTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0);
  };

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  return (
    <div>
    <h2>Cart</h2>
    {cartItems.length === 0 ? (
      <p>Cart is empty</p>
    ) : (
      <CartTable>
        <TableHead>
          <tr>
            <TableHeader>Product Name</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Total</TableHeader>
          </tr>
        </TableHead>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item.product.id}>
              <TableCell>{item.product.name}</TableCell>
              <TableCell>
                <ButtonP onClick={() => handleRemoveFromCart(item.product.id)}>-</ButtonP>
                {item.quantity}
                <ButtonP onClick={() => handleAddToCart(item.product)}>+</ButtonP>
              </TableCell>
              <TableCell>${item.product.price}</TableCell>
              <TableCell>${item.quantity * item.product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <tfoot>
          <TotalRow>
            <td colSpan={2}></td>
            <TotalCell>Total:</TotalCell>
            <TotalCell>${getTotalCost()}</TotalCell>
          </TotalRow>
        </tfoot>
      </CartTable>
    )}
    <Button onClick={handleToggleCart}>Exit</Button>
  </div>
  );
};

export default Cart;
