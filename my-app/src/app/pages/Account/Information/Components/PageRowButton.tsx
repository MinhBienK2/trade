import { Card, Text, ActionIcon, Flex, Indicator, Anchor } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons';
import * as React from 'react';

export interface PageRowProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  indicator?: boolean;
  text: string;
  next?: () => void;
}

export function PageRowButton(props: PageRowProps) {
  return (
    <Indicator
      dot
      inline
      size={props.indicator ? 20 : 0}
      offset={5}
      color="red"
      withBorder
    >
      <Card shadow="sm" p="md" radius="md" withBorder>
        <Flex align={'baseline'}>
          {props.leftIcon}
          <Anchor m="auto" fw={700} fz={20} onClick={props.next}>
            {props.text}
          </Anchor>
        </Flex>
      </Card>
    </Indicator>
  );
}
