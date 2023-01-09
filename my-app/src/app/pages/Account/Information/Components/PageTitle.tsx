import {
  Card,
  Text,
  ActionIcon,
  Flex,
  Center,
  Group,
  Box,
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons';
import { Language } from 'app/components/Languages';
import * as React from 'react';

export interface PageTitleProps {
  text: string;
  back?: () => void;
  selectLanguage: string;
}

export function PageTitle(props: PageTitleProps) {
  return (
    <Card
      shadow="sm"
      p="md"
      radius="md"
      withBorder
      bg={'dark'}
      sx={{ overflow: 'initial' }}
    >
      <Center pos={'relative'}>
        {props.back ? (
          <ActionIcon size="lg" variant="transparent" onClick={props.back}>
            <IconChevronLeft color="white" />
          </ActionIcon>
        ) : null}
        <Text m="auto" fw={700} fz={20} color="white">
          {props.text}
        </Text>
        <Box pos={'absolute'} top={0} right={10}>
          <Box pos={'relative'}>
            <Language userLanguage={props.selectLanguage} />
          </Box>
        </Box>

        <ActionIcon
          size="lg"
          variant="transparent"
          onClick={props.back}
        ></ActionIcon>
      </Center>
    </Card>
  );
}
