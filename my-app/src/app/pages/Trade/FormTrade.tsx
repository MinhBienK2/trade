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
import { useTranslation } from 'react-i18next';

interface Props {
  projectId?: string | undefined;
}

export const FormTrade = (props: Props) => {
  const { t } = useTranslation();
  const walletSlice = useWalletSlice();
  const errorWalet = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      project: props.projectId ? props.projectId : '',
      quality: 0,
      price: props.projectId
        ? sampleProjectData[Number(props.projectId)].price
        : 0,
    },

    validate: {
      project: project =>
        project !== '' ? null : t('Trade.error.can_select_project'),
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
              {t('Account.detailCard.project')}
            </Text>
            <Select
              w={130}
              defaultValue={form.values.project}
              data={getProjectNameList()}
              placeholder={t('Trade.formTrade.select_Project')}
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
              {t('Trade.formTrade.amount')}
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
              {t('Trade.formTrade.price')}
            </Text>
            <Text fw={500}>{formatVND(form.values.price)}</Text>
          </Group>
          <Group>
            <Text fw={500} w={100}>
              {t('Trade.formTrade.value')}
            </Text>
            <Text fw={500}>
              {formatVND(form.values.quality * form.values.price)}
            </Text>
          </Group>
          {form.errors && <Text c={'red'}>{form.errors.project}</Text>}
          <Button loading={loading} type="submit" w={130} ml={115}>
            {t('Trade.formTrade.buy')}
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
          <Title>{t('Poppup.success.successful_transaction')}</Title>
          <Group>
            <Text w={105}>{t('Trade.formTrade.project')}</Text>
            <Text fw={500}>{form.values.project}</Text>
          </Group>
          <Divider />
          <Group>
            <Text w={105}>{t('Trade.formTrade.quality')}</Text>
            <Text fw={500}>{form.values.quality}</Text>
          </Group>
          <Divider />
          <Group>
            <Text w={105}>{t('Trade.formTrade.price_per_stock')}</Text>
            <Text fw={500}>{form.values.price}</Text>
          </Group>
          <Divider />
          <Group>
            <Text w={105}>{t('Trade.formTrade.total_value')}</Text>
            <Text fw={500}>
              {formatVND(form.values.price * form.values.quality)}
            </Text>
          </Group>
          <Center>
            <Button
              onClick={() => dispatch(walletSlice.actions.resetResponse())}
            >
              {t('Trade.formTrade.button_confirm')}
            </Button>
          </Center>
        </Stack>
      </Modal>
    </>
  );
};
