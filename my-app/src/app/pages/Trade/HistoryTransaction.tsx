import {
  ActionIcon,
  Card,
  Center,
  Paper,
  Stack,
  Table,
  Tabs,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconSquareChevronsRight, IconWallet, IconGift } from '@tabler/icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageTitle } from '../Account/Information/Components/PageTitle';
import convertDate from 'helpers/formatDate';
import { useWalletSlice } from 'store/app/wallet';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectHistoryTransaction,
  selectHistoryTransactionESOP,
} from 'store/app/wallet/selector';
import { useTranslation } from 'react-i18next';
import { useUserSlice } from 'store/app/user';
import { selectLanguage } from 'store/app/user/selector';

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
    if (dataHistory.length === 0) {
      dispatch(
        walletSLice.actions.requestHistoryTransaction({
          typeWallet: 'balance',
        }),
      );
    }
    if (dataHistoryESOP.length === 0) {
      dispatch(
        walletSLice.actions.requestHistoryTransaction({
          typeWallet: 'esop',
        }),
      );
    }
  }, []);

  function moveToTrade() {
    navitation('/trade');
  }
  function moveToTradeESOPDetail(id) {
    navitation(`/history-esop/detail/${id}`);
  }
  function moveToTradeDetail(id) {
    navitation(`/history/detail/${id}`);
  }

  function handleClickRow(id) {
    if (value === 'invest') moveToTradeDetail(id);
    else if (value === 'investOSOP') moveToTradeESOPDetail(id);
  }

  const DislayTableData = (props: { data: any }) => {
    return props.data.map(element => (
      <tr key={element.id} onClick={() => handleClickRow(element.id)}>
        <td>{element.id}</td>
        <td>{element.project}</td>
        {largerThan576 && <td>{element.service}</td>}
        <td>{element.exchange}</td>
        {largerThan576 && <td>{element.currentBalance}</td>}
        {largerThan576 && (
          <td>
            {convertDate.GetDDMMYY_HHMMSS(
              convertDate.createNewDate(element.timestamp),
            )}
          </td>
        )}
        {largerThan576 && <td>{element.detail}</td>}
        {!largerThan576 && (
          <td>
            <ActionIcon>
              <IconSquareChevronsRight />
            </ActionIcon>
          </td>
        )}
      </tr>
    ));
  };

  const RenderTable = (props: { data: any }) => {
    return (
      <Table striped highlightOnHover withColumnBorders>
        <thead>
          <tr>
            {<th>{t('Trade.historyDetail.id')}</th>}
            {<th>{t('Trade.historyDetail.project')}</th>}
            {largerThan576 && <th>{t('Trade.historyDetail.type')}</th>}
            <th>{t('Trade.historyDetail.exchange')}</th>
            {largerThan576 && <th>{t('Trade.historyDetail.balance')}</th>}
            {largerThan576 && <th>{t('Trade.historyDetail.time')}</th>}
            {largerThan576 && <th>{t('Trade.historyDetail.detail')}</th>}
            {!largerThan576 && <th></th>}
          </tr>
        </thead>
        <tbody>
          <DislayTableData data={props.data}></DislayTableData>
        </tbody>
      </Table>
    );
  };

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
          <PageTitle
            text="History transaction"
            back={moveToTrade}
            selectLanguage={useLanguage}
          />
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
                <RenderTable data={dataHistory} />
              </Tabs.Panel>
              <Tabs.Panel value="investOSOP" pt="xs">
                <RenderTable data={dataHistoryESOP} />
              </Tabs.Panel>
            </Tabs>
          </Card>
        </Stack>
      </Paper>
    </Center>
  );
};
