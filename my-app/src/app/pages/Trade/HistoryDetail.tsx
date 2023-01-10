import {
  Card,
  Center,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUserSlice } from 'store/app/user';
import { selectLanguage } from 'store/app/user/selector';
import { useWalletSlice } from 'store/app/wallet';
import {
  selectHistoryTransaction,
  selectHistoryTransactionESOP,
} from 'store/app/wallet/selector';
import convertDate from 'helpers/formatDate';
import { PageTitle } from '../Account/Information/Components/PageTitle';

const RenderChildDetail = (props: { data: any }) => {
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
          <Text w={100}>{t('Trade.historyDetail.type')}</Text>
          <Text fw={500}>{props.data.service}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Trade.historyDetail.exchange')}</Text>
          <Text fw={500}>{props.data.exchange}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Trade.historyDetail.balance')}</Text>
          <Text fw={500}>{props.data.currentBalance}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Trade.historyDetail.time')}</Text>
          <Text fw={500}>
            {convertDate.GetDDMMYY_HHMMSS(
              convertDate.createNewDate(props.data.timestamp),
            )}
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
  useWalletSlice();
  useUserSlice();
  const { t } = useTranslation();
  const dataHistory = useSelector(selectHistoryTransaction);
  const dataHistoryESOP = useSelector(selectHistoryTransactionESOP);
  const userLanguage = useSelector(selectLanguage);
  const navitation = useNavigate();
  const { historyId } = useParams();
  const location = useLocation();
  const detail = dataHistory[historyId ? historyId : 0];
  const detailESOP = dataHistoryESOP[historyId ? historyId : 0];

  const moveToHistoryPage = () => {
    navitation('/history');
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
              <PageTitle
                text={t('Trade.historyDetail.detail_trade')}
                back={moveToHistoryPage}
                selectLanguage={userLanguage}
              />
              <RenderChildDetail data={detail} />
            </>
          )}
        </Stack>
      </Paper>
    </Center>
  );
};
