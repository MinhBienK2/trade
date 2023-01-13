import { ActionIcon, Card, Center, Paper, Stack, Table, Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconSquareChevronsRight, IconWallet, IconGift } from '@tabler/icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PageTitle } from '../Account/Information/Components/PageTitle';
import convertDate from 'helpers/formatDate';
import { useWalletSlice } from 'store/app/wallet';
import { selectHistoryTransaction, selectHistoryTransactionESOP } from 'store/app/wallet/selector';
import { useTranslation } from 'react-i18next';
import { useUserSlice } from 'store/app/user';
import { selectLanguage } from 'store/app/user/selector';
import { HistoryTransaction as HistoryTransactionResponse } from 'store/app/wallet/response';

const DislayTableData = (props: { data: HistoryTransactionResponse[]; largerThan576: boolean; value: string }) => {
  const navitation = useNavigate();

  function moveToTradeESOPDetail(id) {
    navitation(`/history-esop/detail/${id}`);
  }
  function moveToTradeDetail(id) {
    navitation(`/history/detail/${id}`);
  }

  function handleClickRow(id) {
    if (props.value === 'invest') moveToTradeDetail(id);
    else if (props.value === 'investOSOP') moveToTradeESOPDetail(id);
  }

  return (
    <>
      {props.data.map(element => (
        <tr key={element.id} onClick={() => handleClickRow(element.id)}>
          <td>{element.id}</td>
          <td>{element.project}</td>
          {<td>{element.boughtShares}</td>}
          {props.largerThan576 && <td>{element.pricePerShare}</td>}
          {props.largerThan576 && <td>{element.priceTotal}</td>}
          {props.largerThan576 && <td>{convertDate.GetDDMMYY_HHMMSS(convertDate.createNewDate(element.transactionTime))}</td>}
          {props.largerThan576 && <td>{element.detail}</td>}
          {!props.largerThan576 && (
            <td>
              <ActionIcon>
                <IconSquareChevronsRight />
              </ActionIcon>
            </td>
          )}
        </tr>
      ))}
    </>
  );
};

const RenderTable = (props: { data: HistoryTransactionResponse[]; largerThan576: boolean; value: string }) => {
  const { t } = useTranslation();

  return (
    <Table striped highlightOnHover withColumnBorders>
      <thead>
        <tr>
          {<th>{t('Trade.historyDetail.id')}</th>}
          {<th>{t('Trade.historyDetail.project')}</th>}
          {<th>{t('Trade.historyDetail.quantity')}</th>}
          {props.largerThan576 && <th>{t('Trade.historyDetail.pricePerShare')}</th>}
          {props.largerThan576 && <th>{t('Trade.historyDetail.totalValue')}</th>}
          {props.largerThan576 && <th>{t('Trade.historyDetail.time')}</th>}
          {props.largerThan576 && <th>{t('Trade.historyDetail.detail')}</th>}
          {!props.largerThan576 && <th></th>}
        </tr>
      </thead>
      <tbody>
        <DislayTableData data={props.data} largerThan576={props.largerThan576} value={props.value}></DislayTableData>
      </tbody>
    </Table>
  );
};

export const HistoryTransaction = () => {
  const walletSLice = useWalletSlice();
  useUserSlice();
  const { t } = useTranslation();
  const navitation = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState<string>('invest');
  const largerThan576 = useMediaQuery('(min-width:576px)');
  const useLanguage = useSelector(selectLanguage);
  const dataHistory = useSelector(selectHistoryTransaction);
  const dataHistoryESOP = useSelector(selectHistoryTransactionESOP);

  React.useEffect(() => {
    dispatch(
      walletSLice.actions.requestHistoryTransaction({
        typeWallet: 'balance',
      }),
    );

    dispatch(
      walletSLice.actions.requestHistoryTransaction({
        typeWallet: 'esop',
      }),
    );
  }, []);

  function moveToTrade() {
    navitation('/trade');
  }

  const handleGetValueTabs = value => {
    setValue(value);
  };

  return (
    <Center sx={{ height: '100vh' }}>
      <Paper
        withBorder
        sx={{
          height: '100%',
          width: '100%',
          minWidth: '300px',
          padding: '5px',
        }}
      >
        <Stack>
          <PageTitle text={t('Trade.title')} back={moveToTrade} selectLanguage={useLanguage} />
          <Card shadow="sm" p="md" radius="md" withBorder>
            <Tabs
              defaultValue="invest"
              onTabChange={(value: string) => {
                handleGetValueTabs(value);
              }}
            >
              <Tabs.List>
                <Tabs.Tab value="invest" icon={<IconWallet color={'orange'} />}>
                  {t('Trade.formTrade.investWallet')}
                </Tabs.Tab>
                <Tabs.Tab value="investOSOP" icon={<IconGift color={'cyan'} />}>
                  {t('Trade.formTrade.investESOPWallet')}
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="invest" pt="xs">
                <RenderTable data={dataHistory} largerThan576={largerThan576} value={value} />
              </Tabs.Panel>
              <Tabs.Panel value="investOSOP" pt="xs">
                <RenderTable data={dataHistoryESOP} largerThan576={largerThan576} value={value} />
              </Tabs.Panel>
            </Tabs>
          </Card>
        </Stack>
      </Paper>
    </Center>
  );
};
