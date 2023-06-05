import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from '../../components/Cart';

const Order = () => {
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleBackToStock = () => {
        navigate('/stock')
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Place order logic here (e.g., sending data to a server)
    
        // Set the order placed state to true
        setOrderPlaced(true);
      };

    return (
    <div>
      <h2>Checkout</h2>
        <div>
            {orderPlaced ? (
                <div>
                    <h3>Your order placed succesfully</h3>
                    <p>Name: {name}</p>
                    <p>Surname: {surname}</p>
                    <p>Phone: {phoneNumber}</p>
                    <p>Address: {address}</p>
                    <Cart show={false} />
                </div>
            ) : (
                <div>
                    <h3>Order Summary</h3>
                    <Cart show={false}/>
                    <button onClick={handleBackToStock}>Back to Stock</button>
                    <h3>Order Form</h3> {/*надо добавить автозаполнение из авторизации?*/}
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text" 
                            placeholder="Name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                        <input 
                            type="text" 
                            placeholder="Surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)} />
                        <input 
                            type="text" 
                            placeholder="Phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)} />
                        <input 
                            type="text" 
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                        <button type="submit">Place Order</button>
                    </form>
                </div>
            )}
        </div>
    </div>
  );
};

export default Order;