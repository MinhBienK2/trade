import { Card, Blockquote, Center } from '@mantine/core';
import * as React from 'react';
import { randomQuote } from '../../Data/QuoteData';
export interface PageQuoteProps {
  cite: string;
  content: string;
}
export function PageQuote() {
  let quote = randomQuote();
  return (
    <Card shadow="sm" p="md" radius="md" withBorder>
      <Center>
        <Blockquote cite={quote.cite}>{quote.content}</Blockquote>
      </Center>
    </Card>
  );
}
