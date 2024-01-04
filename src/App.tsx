import "./App.css";
import { Product } from "./components/Product";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Product
        title={"title"}
        imageUrl={
          "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
        }
        price={10}
      />
    </ChakraProvider>
  );
}

export default App;
