import React, { useEffect } from 'react';
import { Button, Group, Text, NumberInput, Stack, Select, Title, Modal, Center, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';

import { formatVND } from 'helpers/formatCurrencyVND';
import { useWalletSlice } from 'store/app/wallet';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading } from 'store/app/wallet/selector';
import { useTranslation } from 'react-i18next';
import { GetPaymentMethodList } from './data/paymentMethod';
import { useProjectSlice } from 'store/app/project';
import { selectInvestShares, selectInvestSharesESOP, selectListProject } from 'store/app/project/selector';
import { DataProject } from 'store/app/project/types';
import { InvestShares } from 'store/app/project/types';

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
export interface filterValueForm {
  projectId: string | null;
  paymentMethods: number;
  quantity: number;
}
export interface formValue {
  projectId: string | null;
  paymentMethods: number;
  quantity: number;
  price: number;
}

export const FormTrade = (props: Props) => {
  const projectSlice = useProjectSlice();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [openPoppupError, setOpenPoppupError] = React.useState<boolean>(false);
  const [openPoppupErrorMaximum, setOpenPoppupErrorMaximum] = React.useState<boolean>(false);
  const [projectId, setProjectId] = React.useState<number>(props.projectId ? Number(props.projectId) : 0);
  const [paymentMethods, setPaymentMethods] = React.useState<number>(0);
  const inputNumberRef = React.useRef<HTMLInputElement>(null);
  const errorWallet = useSelector(selectError);
  const walletSlice = useWalletSlice();
  const loading = useSelector(selectLoading);
  const listProject = useSelector(selectListProject);
  const listInvestShares = useSelector(selectInvestShares);
  const listInvestSharesESOP = useSelector(selectInvestSharesESOP);
  const maximum = GetMaximumShare(projectId, paymentMethods, listInvestShares, listInvestSharesESOP);

  const form = useForm({
    initialValues: {
      projectId: props.projectId ? props.projectId : '',
      paymentMethods: 0,
      quantity: 0,
      price: props.projectId ? listProject[Number(props.projectId) - 1].pricePerShare : 0,
    },

    validate: {
      projectId: project => (project !== '' ? null : t('Trade.error.can_select_project')),
      quantity: quantity => (quantity > 0 ? null : 'quantity larger than 0'),
      price: price => (price > 0 ? null : 'price larger than 0'),
    },
  });

  const handleBuyShares = (values: formValue) => {
    const paymentBalance = 0;
    const paymentESOP = 1;
    const maximumShare = maximum;

    if (maximumShare <= 0) {
      setOpenPoppupErrorMaximum(true);
    } else if (
      (values.price * values.quantity < props.wallet.balance && values.paymentMethods === paymentBalance) ||
      (values.price * values.quantity < props.wallet.esop && values.paymentMethods === paymentESOP)
    ) {
      dispatch(walletSlice.actions.requestBuyShares(values));
    } else {
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
                setProjectId(Number(value));
                form.setFieldValue('price', listProject[Number(value) - 1].pricePerShare);
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
              max={maximum}
              step={10}
              onChange={value => form.setFieldValue('quantity', value ? value : 0)}
              onBlurCapture={e => {
                if (Number(e.currentTarget.value) > maximum) {
                  e.currentTarget.value = String(maximum);
                }
              }}
              ref={inputNumberRef}
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
              onChange={value => {
                setPaymentMethods(Number(value));
                form.setFieldValue('paymentMethods', Number(value));
              }}
            />
          </Group>
          <Group>
            <Text fw={500} w={100}>
              {t('Trade.formTrade.maximum')}
            </Text>
            <Text fw={500}>{maximum}</Text>
          </Group>
          <Group>
            <Text fw={500} w={100}>
              {t('Trade.formTrade.price')}
            </Text>
            <Text fw={500}>{formatVND(Number(form.values.price))}</Text>
          </Group>
          <Group>
            <Text fw={500} w={100}>
              {t('Trade.formTrade.value')}
            </Text>
            <Text fw={500}>{formatVND(form.values.quantity * form.values.price)}</Text>
          </Group>
          {form.errors?.project && <Text c={'red'}>{form.errors.project}</Text>}
          {form.errors?.quantity && maximum > 0 && !form.errors?.project && <Text c={'red'}>{form.errors.quantity}</Text>}
          <Button loading={loading} type="submit" w={130} ml={115} disabled={form.values.quantity === 0 ? true : false}>
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
          dispatch(projectSlice.actions.requestUpdateInvestShares());
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
            <Text fw={500}>{form.values.projectId ? listProject[Number(form.values.projectId) - 1].nameProject : null}</Text>
          </Group>
          <Divider />
          <Group>
            <Text w={105}>{t('Trade.formTrade.paymentMethods')}</Text>
            <Text fw={500}>{form.values.paymentMethods === 0 ? 'Balance' : 'ESOP'}</Text>
          </Group>
          <Divider />
          <Group>
            <Text w={105}>{t('Trade.formTrade.quantity')}</Text>
            <Text fw={500}>{form.values.quantity}</Text>
          </Group>
          <Divider />
          <Group>
            <Text w={105}>{t('Trade.formTrade.price_per_stock')}</Text>
            <Text fw={500}>{form.values.price}</Text>
          </Group>
          <Divider />
          <Group>
            <Text w={105}>{t('Trade.formTrade.total_value')}</Text>
            <Text fw={500}>{formatVND(Number(form.values.price) * Number(form.values.quantity))}</Text>
          </Group>
          <Center>
            <Button
              onClick={() => {
                dispatch(walletSlice.actions.resetResponse());
                dispatch(projectSlice.actions.requestUpdateInvestShares());
              }}
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
          <Title>{t('Popup.error.exceeding')}</Title>
        </Center>
      </Modal>

      {/* when bought all the shares that can be owned*/}
      <Modal
        opened={openPoppupErrorMaximum}
        centered
        onClose={() => {
          setOpenPoppupErrorMaximum(false);
        }}
      >
        <Center>
          <Title>{t('Popup.error.maximum')}</Title>
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
export function getProjectData(projectId: number, dataProject: DataProject[]): DataProject | undefined {
  for (let i = 0; i < dataProject.length; i++) {
    if (dataProject[i].projectId === projectId) {
      return dataProject[i];
    }
  }
  return undefined;
}

export const GetMaximumShare = (
  projectId: number,
  paymentMethod: number,
  investData: InvestShares[],
  investESOPData: InvestShares[],
): number => {
  if (paymentMethod === 0) {
    for (let project of investData) {
      if (project.id === projectId) return project.canBuyShare;
    }
    return 0;
  } else {
    for (let project of investESOPData) {
      if (project.id === projectId) return project.canBuyShare;
    }
    return 0;
  }
};
