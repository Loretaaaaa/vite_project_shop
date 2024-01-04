import { getProducts } from '../api/Products';
import { useQuery } from '../hooks/useQuery';
import { ProductCard } from './ProductCard';
import { HStack } from '@chakra-ui/react';

export const ProductsList = () => {
  const { data } = useQuery(getProducts);

  return (
    <HStack flexWrap={'wrap'} gap={{ base: '20px', xl: '40px', '2xl': '64px' }}>
      {data?.map(product => (
        <ProductCard
          sizes={product.sizes}
          key={product.id}
          title={product.name}
          imageUrl={product.imageSrc}
          price={product.price}
          description={product.color}
        />
      ))}
    </HStack>
  );
};
