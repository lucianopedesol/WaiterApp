import {Modal, Platform, TouchableOpacity} from 'react-native';
import {Form, Header, Input, ModalBody, Overlay} from './styles';
import {Text} from '../Text';
import {Close} from '../Icons/Close';
import {Button} from '../Button';
import {useState} from 'react';
import {StatusBar} from 'expo-status-bar';

interface TableModalProps {
  visible: boolean;
  onClose(): void;
  onSave(table: string): void;
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState('');

  function handleSaveTable() {
    setTable('');
    onSave(table);
  }

  return (
    <Modal visible={visible} transparent animationType='fade'>
      <StatusBar hidden={true} />

      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight="600">Informe o Cliente</Text>
            <TouchableOpacity onPress={() => onClose()}>
              <Close color='#666' />
            </TouchableOpacity>
          </Header>
          <Form>
            <Input
              placeholder='Nome do Cliente'
              placeholderTextColor='#666'
              keyboardType="default"
              onChangeText={setTable}
            />
            <Button onPress={() => handleSaveTable()} disabled={table.length === 0}>Salvar</Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
