import { Card, Text, ActionIcon, Flex, Center } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons';
import * as React from 'react';

export interface PageTitleProps {
  text: string;
  back?: () => void;
}

export function PageTitle(props: PageTitleProps) {
  return (
    <Card shadow="sm" p="md" radius="md" withBorder bg={'dark'}>
      <Center>
        {props.back ? (
          <ActionIcon size="lg" variant="transparent" onClick={props.back}>
            <IconChevronLeft color="white" />
          </ActionIcon>
        ) : null}
        <Text m="auto" fw={700} fz={20} color="white">
          {props.text}
        </Text>
        <ActionIcon
          size="lg"
          variant="transparent"
          onClick={props.back}
        ></ActionIcon>
      </Center>
    </Card>
  );
}
