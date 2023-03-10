import { Center, Paper, Stack, Card, Group, Text, Divider, Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconGift, IconWallet, IconHistory } from '@tabler/icons';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { FormTrade } from './Loadable';
import { selectLanguage } from 'store/app/user/selector';
import { useWalletSlice } from 'store/app/wallet';
import { selectBalance, selectESOP, selectStock } from 'store/app/wallet/selector';
import { PageTitle } from '../Account/Information/Components/PageTitle';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { Helmet } from 'react-helmet-async';

export function TradePage() {
  const walletSlice = useWalletSlice();
  const navigation = useNavigate();
  const { t } = useTranslation();
  const param = useParams();
  const dispatch = useDispatch();

  const smallThan576 = useMediaQuery('(max-width:576px)');
  const userLanguage = useSelector(selectLanguage);
  const esop = useSelector(selectESOP);
  const balance = useSelector(selectBalance);
  const stock = useSelector(selectStock);

  // update wallet
  React.useEffect(() => {
    if (balance === 0 && esop === 0 && stock === 0) dispatch(walletSlice.actions.requestUpdateBalance());
  }, []);

  function moveToHomePage() {
    navigation('/');
  }
  function moveToHistoryTransactionPage() {
    navigation('/history');
  }

  return (
    <>
      <Helmet>
        <title>Trade</title>
        <meta name="Trade" content="Share Inverst" />
      </Helmet>

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
            <PageTitle text="Trade" back={moveToHomePage} selectLanguage={userLanguage} />
            <Card shadow="sm" p="md" radius="md" withBorder>
              <Center>
                <Group spacing={smallThan576 ? 5 : 16}>
                  <IconWallet color={'orange'} />
                  <Text color={'orange'}>{numberWithCommas(balance)}</Text>
                  <Divider orientation="vertical" />
                  <IconGift color={'cyan'} />
                  <Text color={'cyan'}>{numberWithCommas(esop)}</Text>
                  <Button variant="outline" onClick={moveToHistoryTransactionPage} leftIcon={<IconHistory />}>
                    {t('Trade.history')}
                  </Button>
                </Group>
              </Center>
              <Divider mt={20} mb={20} />
              <Center>
                <FormTrade projectId={param.project ? param.project : undefined} wallet={{ balance, esop }} />
              </Center>
            </Card>
          </Stack>
        </Paper>
      </Center>
    </>
  );
}
