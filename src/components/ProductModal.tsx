import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
  Box,
  Text,
  HStack,
  Circle,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ProductType } from './ProductCard';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  product: ProductType;
};

const ProductModal = ({ isOpen, onClose, product }: Props) => {
  const [selectedColor, setSelectedColor] = useState('');

  const colors = ['black', 'white', 'red', 'grey'];

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };
  const handleAddToBag = () => {
    console.log('Added to bag');
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{
        base: 'full',
        md: '2xl',
      }}
    >
      <ModalOverlay />
      <ModalContent p="2">
        <ModalHeader>{product.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box flex={'1 1 0%'} mr={'2'}>
              <Image
                src={product.images[0]}
                alt={product.title}
                maxWidth="100%"
                maxHeight="350px"
              />
            </Box>
            <Box flex={'1 1 0%'} ml={'2'}>
              <Text textAlign={'start'} mt="2" color="gray.500">
                {product.description}
              </Text>
              <Text textAlign={'start'} mt="2" color="gray.500">
                ${product.price}
              </Text>
              <Text fontSize="md" color="gray.600" mb="2">
                Color:
              </Text>
              <HStack spacing="2" mb="2">
                {colors.map(color => (
                  <Circle
                    key={color}
                    size="30px"
                    bg={color}
                    borderWidth={selectedColor === color ? '2px' : '1px'}
                    borderColor={selectedColor === color ? 'teal.500' : 'gray.300'}
                    onClick={() => handleColorChange(color)}
                    cursor="pointer"
                  />
                ))}
              </HStack>
              {/* <Text fontSize="md" color="gray.600" mb="2">
                Size:
              </Text>
              <SimpleGrid columns={3} mt={6} spacing={'10px'}>
                {['xxs', 'xs', 's', 'm', 'l', 'xl'].map((size: Size) => (
                  <Text
                    key={size}
                    p={2}
                    _disabled={{ bg: 'gray.100', color: 'gray.500', cursor: 'not-allowed' }}
                    aria-disabled={product.sizes.includes(size) ? false : true}
                    bg={selectedSize === size ? 'teal.500' : 'gray.200'}
                    color={selectedSize === size ? 'white' : 'black'}
                    onClick={() => handleSizeChange(size)}
                    cursor="pointer"
                    textAlign="center"
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Text>
                ))}
              </SimpleGrid> */}
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleAddToBag}>
            Add to bag
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ProductModal;
