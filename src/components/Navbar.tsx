import { Button, HStack, useColorMode } from '@chakra-ui/react';

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack mb="10" justifyContent="space-between">

      <Button onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button>
    </HStack>
  );
};
