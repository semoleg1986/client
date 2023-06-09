import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { RootState } from '../../store';
import { CREATE_ORDER } from '../../graphql/mutation/order';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../store/cartSlice';


const Order = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const [createOrder] = useMutation(CREATE_ORDER);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();


  const navigate = useNavigate();


  const handlePlaceOrder = () => {
    const productIds = cartItems.map((item) => item.product.id);
    const quantities = cartItems.map((item) => item.quantity);
    
    createOrder({
      variables: {
        name: name,
        surname: surname,
        phoneNumber: phoneNumber,
        address: address,
        email: email,
        productIds: productIds,
        quantities: quantities,
      },
    })
      .then((response) => {
        // Handle successful response, e.g., display success message or navigate to a success page
      })
      .catch((error) => {
        // Handle error, e.g., display error message
      });
      dispatch(clearCart());
      navigate('/order-details');
  };

  const getTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0);
  };

  return (
    <div>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.product.id}>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>${item.product.price}</td>
                <td>${item.quantity * item.product.price}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Total:</td>
              <td>${getTotalCost()}</td>
            </tr>
          </tfoot>
        </table>
      <h2>Order</h2>
      {/* Form inputs for name, surname, phone number, address, email */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        placeholder="Surname"
      />
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handlePlaceOrder}>Place Order</button>
      </div>
  );
};

export default Order;
