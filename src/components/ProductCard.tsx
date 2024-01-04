import { Box, Image, Heading, Text, HStack, Button } from '@chakra-ui/react';
import { useState } from 'react';
import ProductModal from './ProductModal';
import { Size } from '../api/Products';

export type ProductType = {
  title: string;
  description?: string;
  imageUrl: string;
  price: number;
  sizes: Size[];
};

export function ProductCard({ imageUrl, price, title, description, sizes }: ProductType) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image src={imageUrl} alt={title} maxWidth="100%" maxHeight="350px" />

        <Box p="6">
          <HStack gap={'3'} justifyContent={'space-between'} alignItems="baseline">
            <Heading overflow={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} size="sm">
              {title}
            </Heading>
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              ${price}
            </Box>
          </HStack>

          <Text textAlign={'start'} mt="2" color="gray.500">
            {description}
          </Text>

          <Button onClick={handleOpenModal} size="sm">
            Quick view
          </Button>
        </Box>
      </Box>
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={{ title, imageUrl, price, description, sizes }}
      />
    </>
  );
}
