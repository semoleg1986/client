import { useQuery } from '@apollo/client';
import { GET_ORDER } from '../../graphql/mutation';

const OrderDetails = () => {

  const { loading, error, data } = useQuery(GET_ORDER);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const latestOrder = data.orders[data.orders.length - 1]; // это не правильно

  return (
    <div>
        <h3>Order Details</h3>
        <p>Receipt Number: {latestOrder.receiptNumber}</p>
        <p>Name: {latestOrder.name}</p>
        <p>Surname: {latestOrder.surname}</p>
        <p>Phone Number: {latestOrder.phoneNumber}</p>
        <p>Address: {latestOrder.address}</p>
        <p>Email: {latestOrder.email}</p>
        <p>Status: {latestOrder.status}</p>
        <h4>Ordered Products</h4>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {latestOrder.orderitemSet.map((orderItem: { product: { name: string, price: number } }) => (
              <tr key={orderItem.product.name}>
                <td>{orderItem.product.name}</td>
                <td>${orderItem.product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
};

export default OrderDetails;
