import { Card, Text, ActionIcon, Anchor, Center } from '@mantine/core';
import { IconChevronRight, TablerIcon } from '@tabler/icons';
import * as React from 'react';

export interface PageRowProps {
  key?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  text: string;
  next?: () => void;
}

export function PageRow(props: PageRowProps) {
  return (
    <Card shadow="sm" p="md" radius="xs" withBorder onClick={props.next}>
      <Center>
        {props.leftIcon}
        {props.next ? (
          <Anchor m="auto" fw={700} fz={20} onClick={props.next}>
            {props.text}
          </Anchor>
        ) : (
          <Text m="auto" fw={700} fz={20}>
            {props.text}
          </Text>
        )}
        {props.next ? (
          <ActionIcon size="lg" color={'black'} onClick={props.next}>
            {props.rightIcon}
          </ActionIcon>
        ) : (
          <ActionIcon size="lg"></ActionIcon>
        )}
      </Center>
    </Card>
  );
}
