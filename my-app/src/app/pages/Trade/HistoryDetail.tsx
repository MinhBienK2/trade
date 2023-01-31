import React from 'react';
import { Card, Center, Divider, Group, Paper, Stack, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { selectLanguage } from 'store/app/user/selector';
import { selectHistoryTransaction, selectHistoryTransactionESOP } from 'store/app/wallet/selector';
import convertDate from 'helpers/formatDate';
import { PageTitle } from '../Account/Information/Components/PageTitle';
import { HistoryTransaction } from 'store/app/wallet/response';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { formatVND } from 'helpers/formatCurrencyVND';

const RenderChildDetail = (props: { data: HistoryTransaction }) => {
  const { t } = useTranslation();

  return (
    <Card shadow="sm" p="md" radius="xs" withBorder>
      <Stack>
        <Group>
          <Text w={100}>{t('Trade.historyDetail.id')}</Text>
          <Text fw={500}>{props.data.id}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Trade.historyDetail.project')}</Text>
          <Text fw={500}>{props.data.project}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Trade.historyDetail.quantity')}</Text>
          <Text fw={500}>{numberWithCommas(props.data.boughtShares)}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Trade.historyDetail.pricePerShare')}</Text>
          <Text fw={500}>{numberWithCommas(props.data.pricePerShare)}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Trade.historyDetail.totalValue')}</Text>
          <Text fw={500}>{formatVND(Number(props.data.priceTotal))}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Trade.historyDetail.time')}</Text>
          <Text fw={500}>
            {convertDate.GetDDMMYY_HHMMSS(convertDate.createNewDate(Math.floor(props.data.transactionTime / 1000)))}
          </Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Trade.historyDetail.detail')}</Text>
          <Text fw={500}>{props.data.detail}</Text>
        </Group>
      </Stack>
    </Card>
  );
};

export const HistoryDetail = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const { historyId } = useParams();
  const location = useLocation();

  const dataHistoryESOP = useSelector(selectHistoryTransactionESOP);
  const dataHistory = useSelector(selectHistoryTransaction);
  const userLanguage = useSelector(selectLanguage);
  const detail = getTransaction(Number(historyId), dataHistory);
  const detailESOP = getTransaction(Number(historyId), dataHistoryESOP);

  const moveToHistoryPage = () => {
    navigation('/history');
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
          {/history-esop/.test(location.pathname) ? (
            <>
              <PageTitle
                text={t('Trade.historyDetail.title_transaction_detail')}
                back={moveToHistoryPage}
                selectLanguage={userLanguage}
              />
              <RenderChildDetail data={detailESOP} />
            </>
          ) : (
            <>
              <PageTitle text={t('Trade.historyDetail.detail_trade')} back={moveToHistoryPage} selectLanguage={userLanguage} />
              <RenderChildDetail data={detail} />
            </>
          )}
        </Stack>
      </Paper>
    </Center>
  );
};

const getTransaction: any = (projectId: number, data: HistoryTransaction[]) => {
  return data.find((element: HistoryTransaction) => element.id === projectId);
};
