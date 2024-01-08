import { Link, useParams } from 'react-router-dom';
import { Button, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getProduct, IProduct } from '../api/Products';

export const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = parseInt(productId, 10);

        const fetchedProduct = await getProduct(id);

        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      }
    };

    fetchData();
  }, [productId]);

  console.log(product);
  if (!product) {
    return <div>Product not found</div>;
  }
  const { title, price, description, images } = product;
  return (
    <Flex>
      <Image src={images[0]} alt={title} maxWidth="50%" maxHeight="350px" />
      <VStack p="6" align="start" spacing={4}>
        <Heading overflow={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} size="sm">
          {title}
        </Heading>
        <Text color="gray.600" fontSize="sm">
          Price: ${price}
        </Text>
        <Text color="gray.500">Description: {description}</Text>
        <Link to="/products">
          <Button>Go back</Button>
        </Link>
      </VStack>
    </Flex>
  );
};
