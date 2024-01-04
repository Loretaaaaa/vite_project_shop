import './App.css';

import { ChakraProvider } from '@chakra-ui/react';
import { ProductsList } from './components/ProductsList';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <ProductsList />
    </ChakraProvider>
  );
}

export default App;
