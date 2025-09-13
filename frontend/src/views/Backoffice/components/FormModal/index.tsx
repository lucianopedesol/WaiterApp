import { ModalOverlay, ModalContent, ModalHeader, ModalTitle, Button } from "../../styles";

// Modal para Formulários
interface FormModalProps {
  title: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ title, children, onClose }) => (
  <ModalOverlay onClick={onClose}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        <Button variant="secondary" onClick={onClose} style={{ padding: '0.3rem' }}>✖</Button>
      </ModalHeader>
      {children}
    </ModalContent>
  </ModalOverlay>
);

export default FormModal;
