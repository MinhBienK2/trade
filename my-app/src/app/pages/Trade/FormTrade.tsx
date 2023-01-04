import React from 'react';
import {
  Button,
  Card,
  Group,
  Text,
  NumberInput,
  Stack,
  Select,
  Title,
  Modal,
  Center,
  Divider,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { getProjectNameList } from '../Project/ProjectData';
import { sampleProjectData } from '../Project/ProjectData';
import { formatVND } from 'utils/number';
import { useWalletSlice } from 'store/app/wallet';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading } from 'store/app/wallet/selector';

export const FormTrade = () => {
  const walletSlice = useWalletSlice();
  const errorWalet = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      project: '',
      quality: 0,
      price: 0,
    },

    validate: {
      project: project => (project !== '' ? null : 'not profject'),
      quality: quality => (quality > 0 ? null : 'quality larger than 0'),
      price: price => (price > 0 ? null : 'price larger than 0'),
    },
  });
  const buy = value => {
    // openModal(value);
    dispatch(
      walletSlice.actions.setResponseError({
        error: 0,
        message: 'success',
      }),
    );
  };

  return (
    <>
      <form onSubmit={form.onSubmit(values => buy(values))}>
        <Stack>
          <Group>
            <Text fw={500} w={100}>
              Project
            </Text>
            <Select
              w={130}
              defaultValue={form.values.project}
              data={getProjectNameList()}
              placeholder="select Project"
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
              defaultValue={0}
              min={0}
              step={10}
              onChange={value =>
                form.setFieldValue('quality', value ? value : 0)
              }
            />
          </Group>
          <Group>
            <Text fw={500} w={100}>
              Price:
            </Text>
            <Text fw={500}>{formatVND(form.values.price)}</Text>
          </Group>
          <Group>
            <Text fw={500} w={100}>
              Value:
            </Text>
            <Text fw={500}>
              {formatVND(form.values.quality * form.values.price)}
            </Text>
          </Group>
          {form.errors && <Text c={'red'}>{form.errors.project}</Text>}
          <Button loading={loading} type="submit" w={130} ml={115}>
            BUY
          </Button>
        </Stack>
      </form>

      {/*  popup */}
      <Modal
        opened={errorWalet === 0}
        centered
        onClose={() => {
          dispatch(walletSlice.actions.resetResponse());
        }}
      >
        <Stack align={'left'}>
          <Title>Successful transaction</Title>
          <Group>
            <Text w={105}>Project</Text>
            <Text fw={500}>{form.values.project}</Text>
          </Group>
          <Divider />
          <Group>
            <Text w={105}>Quality</Text>
            <Text fw={500}>{form.values.quality}</Text>
          </Group>
          <Divider />
          <Group>
            <Text w={105}>Price per Stock</Text>
            <Text fw={500}>{form.values.price}</Text>
          </Group>
          <Divider />
          <Group>
            <Text w={105}>Total value</Text>
            <Text fw={500}>
              {formatVND(form.values.price * form.values.quality)}
            </Text>
          </Group>
          <Center>
            <Button
              onClick={() => dispatch(walletSlice.actions.resetResponse())}
            >
              Confirm
            </Button>
          </Center>
        </Stack>
      </Modal>
    </>
  );
};
