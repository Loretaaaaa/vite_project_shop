import { useNavigate } from 'react-router-dom';
import { getProducts } from '../api/Products';
import { useQuery } from '../hooks/useQuery';
import { ProductCard } from './ProductCard';
import { HStack, VStack } from '@chakra-ui/react';
import { Pagination } from './Pagination';
import { useState } from 'react';

export const ProductsList = () => {
  const [page, setPage] = useState(0)
  const { data } = useQuery(() => getProducts({ page }), [page]);
  const navigate = useNavigate();
  return (

    <VStack>
      <Pagination currentPage={page || 1} totalPages={10} onChange={page => setPage(page)} />
      <HStack justifyContent={'center'}>
        <HStack flexWrap={'wrap'} margin={'auto'} gap={{ base: '20px', xl: '40px', '2xl': '64px' }}>
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
      </HStack>
    </VStack>
  );
};
