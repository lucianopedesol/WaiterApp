import {Container, OrderHeader, Table} from './styles';
import {Text} from '../Text';
import {TouchableOpacity, View} from 'react-native';
import { useState } from 'react';

interface HeaderProps {
  selectedTable: string;
  onCancelOrder(): void;
}

export function Header({ selectedTable, onCancelOrder }: HeaderProps) {
  const [isRequested, setIsRequested] = useState(false);
  return (
    <Container>
      {!selectedTable && (
        <>
          <Text size={14} opacity={0.9}>Bem vindo(a) a</Text>
          <Text size={24} weight={'500'}>
            Cantina de
            <Text size={24} weight={'700'}> Canaã</Text>
          </Text>
        </>
      )}

      {selectedTable && (
        <View>
          <OrderHeader>
            <Text size={24} weight="600">Pedido</Text>
            {isRequested ? (
              <>
                <Text size={14} weight="600" color='#D73035'>Deseja cancelar o pedido?</Text>
                <TouchableOpacity onPress={() => onCancelOrder()}>
                  <Text size={14} weight="600" color='#D73035'>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsRequested(false)}>
                  <Text size={14} weight="600" color='#D73035'>Não</Text>
                </TouchableOpacity>
              </>
            ) : (

              <TouchableOpacity onPress={() => setIsRequested(true)}>
                <Text size={14} weight="600" color='#D73035'>Cancelar pedido</Text>
              </TouchableOpacity>
            )}
          </OrderHeader>
          <Table>
            <Text>Mesa {selectedTable}</Text>
          </Table>
        </View>
      )}
    </Container>
  );
}
