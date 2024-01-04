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
      <Box
        onClick={e => {
          alert('clicked');
          // this onclick should not work
        }}
        data-group
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
      >
        <Box position={'relative'}>
          <Image src={imageUrl} alt={title} maxWidth="100%" maxHeight="350px" />
          <Button
            colorScheme={'blue'}
            position={'absolute'}
            bottom={'10px'}
            left={'50%'}
            transform={'translateX(-50%)'}
            opacity={0}
            _groupHover={{ opacity: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal();
            }}
          >
            Quick view
          </Button>
        </Box>

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
