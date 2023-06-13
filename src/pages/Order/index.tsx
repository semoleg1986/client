import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useMutation } from '@apollo/client';
import { ORDER_BY_SELLER_ID, UPDATE_ORDER } from '../../graphql/mutation/order';
import { RootState } from '../../store';
import './order.css';
import { IOrder, IOrderItem } from '../../types';

function OrderList() {
  const sellerId = useSelector((state: RootState) => state.auth.idSeller);
  // const sellerId = 1; // проверял работоспособность
  const { loading, error, data } = useQuery(ORDER_BY_SELLER_ID, {
    variables: { sellerId },
  });

  const [showArchive, setShowArchive] = useState(false);
  const [orderDetailsVisible, setOrderDetailsVisible] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const dispatch = useDispatch();

  const [updateOrder] = useMutation(UPDATE_ORDER);

  const toggleArchive = () => {
    setShowArchive(!showArchive);
  };

  const toggleOrderDetails = (orderId: string) => {
    if (orderDetailsVisible === orderId) {
      setOrderDetailsVisible('');
    } else {
      setOrderDetailsVisible(orderId);
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>, orderId: string) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    // Make the mutation to update the order status
    updateOrder({
      variables: {
        orderId,
        status: newStatus,
      },
    })
      .then((response) => {
        // Dispatch an action to update the order status in the Redux store
        dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, newStatus } });
        console.log('Order status updated successfully');
        console.log(response);
      })
      .catch((err) => {
        console.error('Error updating order status:', err);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const orders = data.ordersBySellerId;

  if (!orders) {
    return <p>No orders available.</p>;
  }

  const archiveOrders = orders.filter((order: IOrder) => order.status === 'Выполнен');
  const activeOrders = orders.filter((order: IOrder) => order.status !== 'Выполнен');

  const renderOrderDetails = (order: IOrder) => {
    const calculateTotalAmount = (orderItems: IOrderItem[]) => {
      let total = 0;
      orderItems.forEach((item) => {
        total += item.product.price * item.quantity;
      });
      return total;
    };
    return (
      <div className="order-details">
        <h6>Items:</h6>
        <ol>
          {order.orderitemSet.map((item) => (
            <li key={item.product.name}>
              {item.product.name} - Quantity: {item.quantity} - Price: {item.product.price}
            </li>
          ))}
        </ol>
        <p>Total Amount: {calculateTotalAmount(order.orderitemSet)}</p>
      </div>
    );
  };

  // const statuses = order?.statuses || [];
  const statuses: string[] = [];

  const renderActiveOrders = () => {
    return (
      <div>
        <h4>Active Orders</h4>
        {activeOrders.map((order: IOrder) => (
          <div key={order.id} className="order-item">
            <p className="order-info">Receipt Number: {order.receiptNumber}</p>
            <p className="order-info">Name: {order.name}</p>
            <p className="order-info">Surname: {order.surname}</p>
            <p className="order-info">Phone Number: {order.phoneNumber}</p>
            <p className="order-info">Address: {order.address}</p>
            <p className="order-info">
              Status:
              <select
                value={selectedStatus}
                onChange={(event) => handleStatusChange(event, order.id)}
              >
                <option value="">{order.status}</option>
                {statuses.map((status: string) => (
                  <option key={status} value={order.status}>
                    {order.status}
                  </option>
                ))}
              </select>
            </p>
            <p className="order-info">Update Date: {order.updateDate}</p>
            <button type="button" onClick={() => toggleOrderDetails(order.id)}>
              Show Details
            </button>
            {orderDetailsVisible === order.id && renderOrderDetails(order)}
          </div>
        ))}
      </div>
    );
  };

  const renderArchiveOrders = () => {
    return (
      <div>
        <h4>Archive Orders</h4>
        {archiveOrders.map((order: IOrder) => (
          <div key={order.id} className="order-item">
            <p className="order-info">Receipt Number: {order.receiptNumber}</p>
            <p className="order-info">Name: {order.name}</p>
            <p className="order-info">Surname: {order.surname}</p>
            <p className="order-info">Phone Number: {order.phoneNumber}</p>
            <p className="order-info">Address: {order.address}</p>
            <p className="order-info">Status: {order.status}</p>
            <p className="order-info">Update Date: {order.updateDate}</p>
            <button type="button" onClick={() => toggleOrderDetails(order.id)}>
              Show Details
            </button>
            {orderDetailsVisible === order.id && renderOrderDetails(order)}
            <select
              value={selectedStatus}
              onChange={(event) => handleStatusChange(event, order.id)}
            >
              <option value="">{order.status}</option>
              {statuses.map((status: string) => (
                <option key={status} value={status}>
                  {order.status}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h3>Order List</h3>
      {activeOrders.length > 0 && !showArchive && renderActiveOrders()}
      {activeOrders.length === 0 && !showArchive && <p>No active orders available.</p>}
      {showArchive && renderArchiveOrders()}
      <button type="button" onClick={toggleArchive}>
        {showArchive ? 'View Active Orders' : 'View Archive Orders'}
      </button>
    </div>
  );
}

export default OrderList;
