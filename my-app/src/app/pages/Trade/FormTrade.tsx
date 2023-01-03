import {
  Autocomplete,
  Button,
  Card,
  Group,
  Text,
  NativeSelect,
  NumberInput,
  Stack,
  Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { openConfirmModal } from '@mantine/modals';
import React, { useState } from 'react';
import { getProjectNameList } from '../Project/ProjectData';
import { sampleProjectData } from '../Project/ProjectData';

type Props = {};

export const FormTrade = (props: Props) => {
  let [price, setPrice] = useState(0);
  let [value, setValue] = useState(0);
  let [select, setSelect] = useState(0);
  const [project, setProject] = useState('');
  const form = useForm({
    initialValues: {
      project: '',
      quality: 1,
      price: 0,
    },

    validate: {
      project: project => (project !== '' ? null : 'not profject'),
      quality: quality => (quality > 0 ? null : 'quality larger than 0'),
      price: price => (price > 0 ? null : 'price larger than 0'),
    },
  });
  const buy = value => {
    openModal(value);
  };

  const openModal = value =>
    openConfirmModal({
      title: `Do you want to buy shares of ${value.project} ?`,
      labels: { confirm: 'Yes', cancel: 'No' },
      centered: true,
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log(value),
    });

  return (
    <form onSubmit={form.onSubmit(values => buy(values))}>
      <Stack>
        <Group>
          <Text fw={500} w={100}>
            Project
          </Text>
          <Select
            w={130}
            data={getProjectNameList()}
            onChange={value => {
              form.setFieldValue(
                'price',
                sampleProjectData[Number(value)].price,
              );
              form.setFieldValue(
                'project',
                sampleProjectData[Number(value)].project,
              );
            }}
          />
        </Group>
        <Group>
          <Text fw={500} w={100}>
            Amount
          </Text>
          <NumberInput
            w={130}
            defaultValue={1}
            min={1}
            placeholder="Input amount"
            onChange={value => form.setFieldValue('quality', value ? value : 0)}
          />
        </Group>
        <Group>
          <Text fw={500} w={100}>
            Price:
          </Text>
          <Text fw={500}>{form.values.price}</Text>
        </Group>
        <Group>
          <Text fw={500} w={100}>
            Value:
          </Text>
          <Text fw={500}>{form.values.quality * form.values.price}</Text>
        </Group>
        {form.errors && <Text c={'red'}>{form.errors.project}</Text>}
        <Button type="submit" w={130} ml={115}>
          BUY
        </Button>
      </Stack>
    </form>
  );
};
