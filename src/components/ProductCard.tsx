import { Box, Image, Heading, HStack, Button } from '@chakra-ui/react';
import { useState } from 'react';
import ProductModal from './ProductModal';

export type ProductType = {
  id: number;
  title: string;
  description?: string;
  price: number;
  images: string[];
};

// is the same as the type below
// export interface ProductCardProps extends ProductType {
//   onClick: () => void;
// }
export type ProductCardProps = ProductType & {
  onClick?: () => void;
};

export function ProductCard({ id, price, title, description, onClick, images }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <>
      <Box
        onClick={() => {
          // shrothand for this line
          // if (onClick) onClick();
          onClick?.();
        }}
        data-group
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
      >
        <Box position={'relative'}>
          <Image src={images[0]} alt={title} maxWidth="100%" maxHeight="350px" />
          <Button
            colorScheme={'blue'}
            position={'absolute'}
            bottom={'10px'}
            left={'50%'}
            transform={'translateX(-50%)'}
            opacity={0}
            _groupHover={{ opacity: 1 }}
            onClick={e => {
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
        </Box>
      </Box>
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={{ id, title, price, description, images }}
      />
    </>
  );
}
