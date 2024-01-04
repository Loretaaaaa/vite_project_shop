import { Box, Image, Heading, Text, Button } from '@chakra-ui/react';

type Props = {
  title: string;
  description?: string;
  imageUrl: string;
  price: number;
};

export function Product({ imageUrl, price, title, description }: Props) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={imageUrl} alt={title} maxWidth="100%" maxHeight="500px" />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Heading size="xl">{title}</Heading>
        </Box>

        <Box>
          <Text mt="2" color="gray.500">
            {description}
          </Text>
          <Box display="flex" mt="2" alignItems="center">
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              ${price}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
