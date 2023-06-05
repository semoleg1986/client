import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CartTable, TableBody, TableCell, TableHead, TableHeader, TableRow, TotalCell, TotalRow } from '../../components/Cart/Cart.styled';
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const cartItems = useSelector((state: RootState) => state.cart);
    const navigate = useNavigate();

    const getTotalCost = () => {
        return cartItems.reduce(
          (total, item) => total + item.quantity * item.product.price,
          0
        );
      };
      

    const handleBackToStock = () => {
        navigate('/stock')
    }

    return (
    <div>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          <h3>Order Summary</h3>
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
                {item.quantity}
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
      <button onClick={handleBackToStock}>Back to Stock</button>
          <h3>Order Form</h3> {/*надо добавить автозаполнение из авторизации?*/}
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />

            <label htmlFor="surname">Surname:</label>
            <input type="text" id="surname" name="surname" />

            <button type="submit">Place Order</button>
          </form>
        </div>
      )}
    </div>
  );
};


export default Order;