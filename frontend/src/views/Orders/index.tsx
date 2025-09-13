import {Container} from './styles';
import {OrdersBoard} from '../../components/OrdersBoard';
import {Order} from '../../Types/Order';
import {useEffect, useState} from 'react';
import {api} from '../../server/api';
import socket, { io } from 'socket.io-client';

export function Orders() {
  const [orders, setOrders] = useState<Order[] | []>([]);

  useEffect(() => {
    api.get('orders').then(({ data }) => setOrders(data));
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    socket.on("order@new", (order) =>
      setOrders((prev) => prev.concat(order))
    );

    // cleanup (unmount)
    return () => {
      socket.off("order@new"); // remove listener
      socket.disconnect(); // encerra a conexão
    };
  }, []);


  function sortByCreatedAt(list: Order[]) {
    return [...list].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  const waiting = sortByCreatedAt(orders.filter(({ status }) => status === 'WAITING'));
  const inProduction = sortByCreatedAt(orders.filter(({ status }) => status === 'IN_PRODUCTION'));
  const done = sortByCreatedAt(orders.filter(({ status }) => status === 'DONE'));
  const delivered = sortByCreatedAt(orders.filter(({ status }) => status === 'DELIVERED'));

  function handleCancelOrder(orderId: string) {
    setOrders((prev) => prev.filter(({_id}) => _id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prev) => prev.map((order) => {
       return order._id === orderId ? { ...order, status } : order;
    }));
  }

  return (
    <Container>
      <OrdersBoard
        icon="🕑"
        title="Fila de espera"
        nextStatus='IN_PRODUCTION'
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="👩‍🍳"
        title="Em preparação"
        nextStatus='DONE'
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="👍"
        title="Pronto!"
        orders={done}
        nextStatus='DELIVERED'
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="✅"
        title="Entregue!"
        orders={delivered}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
    </Container>
  );
}
