import React from 'react';
import {
  Button,
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

import { formatVND } from 'helpers/formatCurrencyVND';
import { useWalletSlice } from 'store/app/wallet';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading } from 'store/app/wallet/selector';
import { useTranslation } from 'react-i18next';
import { GetPaymentMethodList } from './data/paymentMethod';
import { useProjectSlice } from 'store/app/project';
import { selectListProject } from 'store/app/project/selector';
import { DataProject } from 'store/app/project/types';

interface Props {
  projectId?: string | undefined;
  wallet: {
    balance: number;
    esop: number;
  };
}
export interface ValueSelectForm {
  value: string;
  label: string;
}
export interface formValue {
  projectId: string | null;
  paymentMethods: number;
  quality: number;
  price: number;
}

export const FormTrade = (props: Props) => {
  useProjectSlice();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [openPoppupError, setOpenPoppupError] = React.useState<boolean>(false);
  const errorWallet = useSelector(selectError);
  const walletSlice = useWalletSlice();
  const loading = useSelector(selectLoading);
  const listProject = useSelector(selectListProject);

  const form = useForm({
    initialValues: {
      projectId: props.projectId ? props.projectId : '',
      paymentMethods: 0,
      quality: 0,
      price: props.projectId
        ? listProject[Number(props.projectId)].pricePerShare
        : 0,
    },

    validate: {
      projectId: project =>
        project !== '' ? null : t('Trade.error.can_select_project'),
      quality: quality => (quality > 0 ? null : 'quality larger than 0'),
      price: price => (price > 0 ? null : 'price larger than 0'),
    },
  });

  const handleBuyShares = (values: formValue) => {
    if (
      (values.price * values.quality < props.wallet.balance &&
        values.paymentMethods === 0) ||
      (values.price * values.quality < props.wallet.esop &&
        values.paymentMethods === 1)
    )
      dispatch(walletSlice.actions.requestBuyShares(values));
    else {
      setOpenPoppupError(true);
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(values => handleBuyShares(values))}>
        <Stack>
          <Group>
            <Text fw={500} w={100}>
              {t('Account.detailCard.project')}
            </Text>
            <Select
              w={130}
              defaultValue={form.values.projectId}
              data={getNameProjectList(listProject)}
              placeholder={t('Trade.formTrade.select_Project')}
              onChange={value => {
                form.setFieldValue(
                  'price',
                  listProject[Number(value)].pricePerShare,
                );
                form.setFieldValue('projectId', String(value));
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
              {t('Trade.formTrade.paymentMethods')}
            </Text>
            <Select
              w={130}
              data={GetPaymentMethodList()}
              defaultValue={String(form.values.paymentMethods)}
              onChange={value =>
                form.setFieldValue('paymentMethods', Number(value))
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
          {form.errors?.project && <Text c={'red'}>{form.errors.project}</Text>}
          {form.errors?.quality && !form.errors?.project && (
            <Text c={'red'}>{form.errors.quality}</Text>
          )}
          <Button loading={loading} type="submit" w={130} ml={115}>
            {t('Trade.formTrade.buy')}
          </Button>
        </Stack>
      </form>

      {/*  popup */}
      <Modal
        opened={errorWallet === 0}
        centered
        onClose={() => {
          dispatch(walletSlice.actions.resetResponse());
        }}
      >
        <Stack align={'left'}>
          <Title>{t('Poppup.success.successful_transaction')}</Title>
          <Group>
            <Text w={105}>ID</Text>
            <Text fw={500}>{form.values.projectId}</Text>
          </Group>
          <Divider />
          <Group>
            <Text w={105}>{t('Trade.formTrade.project')}</Text>
            <Text fw={500}>
              {form.values.projectId
                ? listProject[form.values.projectId].nameProject
                : null}
            </Text>
          </Group>
          <Divider />
          <Group>
            <Text w={105}>{t('Trade.formTrade.paymentMethods')}</Text>
            <Text fw={500}>
              {form.values.paymentMethods === 0 ? 'Balance' : 'ESOP'}
            </Text>
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

      {/* when exceeding the allowed amount*/}
      <Modal
        opened={openPoppupError}
        centered
        onClose={() => {
          setOpenPoppupError(false);
        }}
      >
        <Center>
          <Title>Tiền của bạn không đủ</Title>
        </Center>
      </Modal>
    </>
  );
};

export function getNameProjectList(projectData): ValueSelectForm[] {
  let data = new Array<ValueSelectForm>();
  for (let i = 0; i < projectData.length; i++) {
    data.push({
      value: String(projectData[i].projectId),
      label: projectData[i].nameProject,
    });
  }
  return data;
}
export function getProjectData(
  projectId: number,
  dataProject: DataProject[],
): DataProject | undefined {
  for (let i = 0; i < dataProject.length; i++) {
    if (dataProject[i].projectId === projectId) {
      return dataProject[i];
    }
  }
  return undefined;
}
