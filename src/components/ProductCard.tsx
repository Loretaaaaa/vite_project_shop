import { Box, Image, Heading, HStack, Button } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
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
  const [imageIndex, setImageIndex] = useState<number>(0);
  const intervalId = useRef<number>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  window['buttonRef'] = buttonRef;

  useEffect(() => {
    return () => {
      console.log('useEffect unmount', { intervalId });
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  return (
    <>
      <Box
        onClick={() => {
          // shorthand for this line
          // if (onClick) onClick();
          onClick?.();
        }}
        data-group
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        onMouseLeave={() => {
          if (intervalId.current) {
            // setIntervalId(null);
            clearInterval(intervalId.current);
            intervalId.current = null;
          }

          setImageIndex(0);
        }}
        onMouseEnter={() => {
          // if (imageIndex + 1 > images.length - 1) setImageIndex(0);
          // else setImageIndex(imageIndex + 1);

          intervalId.current = setInterval(() => {
            setImageIndex(index => {
              if (index + 1 > images.length - 1) return 0;
              return index + 1;
            });

            console.log('setInterval Image change');
          }, 1000);

          // setIntervalId(intervalId);
        }}
      >
        <Box position={'relative'}>
          <Image src={images[imageIndex]} alt={title} maxWidth="100%" maxHeight="350px" />
          <Button
            ref={buttonRef}
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
              {/* {title} */}
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
