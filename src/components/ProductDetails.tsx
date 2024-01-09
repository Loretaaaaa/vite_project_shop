import { Link, useParams } from 'react-router-dom';
import { Button, Flex, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getProduct, IProduct } from '../api/Products';

export const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = parseInt(productId, 10);

        const fetchedProduct = await getProduct(id);

        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct.images[0]);
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

  const truncatedDescription = showFullDescription ? description : description.slice(0, 50);

  return (
    <Flex>
      <HStack align="start" spacing={4} ml={4}>
        <VStack align="start" spacing={2}>
          {images.map(image => (
            <Image
              key={image}
              src={image}
              alt={title}
              width="70px"
              height="70px"
              cursor={'pointer'}
              border={image === selectedImage ? '2px solid black' : 'none'}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </VStack>

        <HStack align="start">
          <Image src={selectedImage} alt={title} maxWidth="50%" maxHeight="350px" />

          <VStack p="6" align="start" spacing={4}>
            <Heading overflow={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} size="sm">
              {title}
            </Heading>
            <Text color="gray.600" fontSize="sm">
              Price: ${price}
            </Text>
            <Text color="gray.500">{truncatedDescription}</Text>
            {description.length > 50 && (
              <Button onClick={() => setShowFullDescription(!showFullDescription)}>
                {showFullDescription ? 'Less' : 'More'}
              </Button>
            )}

            <Link to="/products">
              <Button>Go back</Button>
            </Link>
          </VStack>


        </HStack>
      </HStack>
    </Flex>
  );
};
