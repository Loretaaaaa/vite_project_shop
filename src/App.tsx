import './App.css';

import { ChakraProvider } from '@chakra-ui/react';
import { ProductsList } from './components/ProductsList';

function App() {
  return (
    <ChakraProvider>
      <ProductsList />
    </ChakraProvider>
  );
}

export default App;
