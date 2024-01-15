import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery';
import { ProductCard } from './ProductCard';
import { Button, HStack, Input, VStack, Text, Flex } from '@chakra-ui/react';
import { Pagination } from './Pagination';
import { getProducts } from '../api/Products';
import { getCategories } from '../api/Categories';

export const ProductsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();


  const page = Number(searchParams.get('page')) || 1;
  const title = searchParams.get('title') || '';
  const categoryId = Number(searchParams.get('category')) || undefined

  window['searchParams'] = searchParams;

  const { data: products } = useQuery(() => getProducts({ page, title, categoryId }), [page, title, categoryId]);
  const { data: categories } = useQuery(() => getCategories(), []);
  const navigate = useNavigate();

  return (
    <VStack>
      <Input
        type="text"
        placeholder="Filter by title"
        value={title}
        onChange={e => {
          setSearchParams(searchParams => {
            if (e.target.value === '') searchParams.delete('title');
            else searchParams.set('title', e.target.value);
            return searchParams;
          });
        }}
      />

      <Flex gap={'10'}>
        <VStack
          borderRight={'1px'}
          borderRightColor={'gray.100'}
          w="15vw"
          justifyContent="start"
          alignItems="start"
        >
          <Text fontWeight={'bold'}>Categories</Text>
          <HStack flexWrap={'wrap'} justifyContent="start" alignItems="start">
            {categories?.map(category => (
              <Button
                bg={searchParams.get('category') === category.id.toString() ? 'gray.100' : 'white'}
                key={category.id}
                onClick={() => {
                  setSearchParams(searchParams => {
                    searchParams.set('category', category.id.toString());
                    return searchParams;
                  });
                }}
              >
                {category.name}
              </Button>
            ))}
          </HStack>
        </VStack>
        <VStack flex={1}>
          <HStack justifyContent={'center'}>
            <HStack
              flexWrap={'wrap'}
              margin={'auto'}
              gap={{ base: '20px', xl: '40px', '2xl': '64px' }}
            >
              {products?.map(product => (
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

          <Pagination
            currentPage={page}
            totalPages={10}
            onChange={page =>
              setSearchParams(searchParams => {
                searchParams.set('page', page.toString());
                return searchParams;
              })
            }
          />
        </VStack>
      </Flex>
    </VStack>
  );
};
