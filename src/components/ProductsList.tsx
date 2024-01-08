import { useNavigate } from 'react-router-dom';
import { getProducts } from '../api/Products';
import { useQuery } from '../hooks/useQuery';
import { ProductCard } from './ProductCard';
import { HStack } from '@chakra-ui/react';

export const ProductsList = () => {
  const { data } = useQuery(getProducts);
  const navigate = useNavigate();

  return (
    <HStack flexWrap={'wrap'} gap={{ base: '20px', xl: '40px', '2xl': '64px' }}>
      {data?.map(product => (
        <ProductCard
          key={product.id}
          onClick={() => navigate(`/products/${product.id}`)}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
          images={product.images}
        />
      ))}
    </HStack>
  );
};
