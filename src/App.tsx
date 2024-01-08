import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductsList } from './components/ProductsList';
import { Navbar } from './components/Navbar';
import { ProductDetails } from './components/ProductDetails';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;