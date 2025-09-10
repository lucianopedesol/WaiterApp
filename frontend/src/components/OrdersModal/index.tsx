import { Actions, ModalBody, OrderDetails, Overlay } from './styles';
import close from '../../assets/images/close-icon.svg';
import { Order } from '../../Types/Order';
import { formatCurrency } from '../../utils/formatCurrency';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';

const PRODUCTION_STEPS = ['WAITING', 'IN_PRODUCTION'];

interface OrdersModalProps {
  visible: boolean;
  order: Order | null;
  isLoading: boolean;
  onClose(): void;
  onCancelOrder(): void;
  onOrderStatusChange(status?: Order['status']): void;
}
export function OrdersModal({ visible, order, isLoading, onClose, onCancelOrder, onOrderStatusChange }: OrdersModalProps) {
  const { authState } = useAuth();
  const { user } = authState;
  if (!visible || !order) return null;

  const total = order.products.reduce((prev, current) => {
    return prev + current.quantity * current.product.price;
  }, 0);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>
          <button type="button" onClick={() => onClose()}>
            <img src={close} alt="close icon" />
          </button>
        </header>

        <div className="status-details">
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕑'}
              {order.status === 'IN_PRODUCTION' && '👩‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em preparação'}
              {order.status === 'DONE' && 'Pronto!'}
            </strong>
          </div>

        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-itens">
            {order.products.map(({ _id, product, quantity }) => (
              <div className="item" key={_id}>
                <img
                  src={`http://192.168.0.73:5000/uploads/${product.imagePath}`}
                  alt={product.name}
                  width="58"
                  height="28.51"
                />

                <div className="quantity">{quantity}x</div>

                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          {order.status !== 'DELIVERED' && (
            <button type="button" className="primary" disabled={isLoading} onClick={() => onOrderStatusChange()}>
              <span>
                {order.status === 'WAITING' && '👩‍🍳'}
                {order.status === 'IN_PRODUCTION' && '☑️'}
                {order.status === 'DONE' && '✅'}
              </span>
              <strong>
                {order.status === 'WAITING' && 'Iniciar preparação'}
                {order.status === 'IN_PRODUCTION' && 'Concluir pedido'}
                {order.status === 'DONE' && 'Entregar pedido'}
              </strong>
            </button>
          )}
          {user?.profile === 'ADMIN' && (
            <button type="button" className="secondary" onClick={onCancelOrder} disabled={isLoading}>
              {order.status !== 'DELIVERED' ? 'Cancelar pedido' : 'Deletar pedido'}
            </button>
          )}
          {
            PRODUCTION_STEPS.includes(order.status) && (
              <button type="button" className="secondary" onClick={() => onOrderStatusChange('DELIVERED')} disabled={isLoading}>
                Entregar
              </button>
            )
          }
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
