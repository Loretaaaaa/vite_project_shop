import { Button, HStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export const Pagination = ({ currentPage, totalPages, onChange }: PaginationProps) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    setPages(pages);
  }, [totalPages]);

  return (
    <HStack gap={'5'}>
      {pages.map(page => (
        <Button
          key={page}
          aria-selected={currentPage === page}
          _selected={{
            bg: 'blue.500',
          }}
          onClick={() => onChange(page)}
        >
          {page}
        </Button>
      ))}
    </HStack>
  );
};
