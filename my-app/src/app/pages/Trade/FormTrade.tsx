import {
  Autocomplete,
  Button,
  Card,
  Group,
  Text,
  NativeSelect,
  NumberInput,
  Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { getProjectNameList } from '../Project/ProjectData';

type Props = {};

export const FormTrade = (props: Props) => {
  let projectList = getProjectNameList();
  projectList.unshift('Input Project');
  let [price, setPrice] = useState(0);
  let [value, setValue] = useState(0);
  const [project, setProject] = useState('');
  const form = useForm({
    initialValues: {
      project: '',
      quality: 0,
      price: 0,
    },

    validate: {},
  });

  const buy = () => {};

  return (
    <form>
      <Stack>
        <Group>
          <Text fw={500} w={100}>
            Project
          </Text>
          <NativeSelect w={130} data={projectList} />
        </Group>
        <Group>
          <Text fw={500} w={100}>
            Amount
          </Text>
          <NumberInput w={130} defaultValue={0} placeholder="Input amount" />
        </Group>
        <Group>
          <Text fw={500} w={100}>
            Price:
          </Text>
          <Text fw={500}>{price}</Text>
        </Group>
        <Group>
          <Text fw={500} w={100}>
            Value:
          </Text>
          <Text fw={500}>{value}</Text>
        </Group>
        <Button w={130} ml={115} onClick={buy}>
          BUY
        </Button>
      </Stack>
    </form>
  );
};
