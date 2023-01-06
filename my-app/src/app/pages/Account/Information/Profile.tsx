import {
  Blockquote,
  Card,
  Center,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { IconUserCircle, IconPigMoney, IconId } from '@tabler/icons';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useProfileSlice } from 'store/app/profile';
import {
  selectInvestorType,
  selectName,
  selectPosition,
} from 'store/app/profile/selector';
import { PageQuote } from './Components/PageQuote';
import { PageRow } from './Components/PageRow';
import { PageTitle } from './Components/PageTitle';
export function Profile() {
  useProfileSlice();
  const { t } = useTranslation();
  const navitation = useNavigate();

  const name = useSelector(selectName);
  const position = useSelector(selectPosition);
  const investorType = useSelector(selectInvestorType);

  const moveToGeneralPage = () => {
    navitation('/account/general');
  };

  const renderInvestorType = (investorType: 1 | 2 | 3): string => {
    const STRATEGY_INVESTOR = 1;
    const FINANCE_INVESTOR = 2;
    const TEAM = 3;

    if (investorType === STRATEGY_INVESTOR)
      return 'Account.profile.strategy_investor';
    else if (investorType === FINANCE_INVESTOR)
      return 'Account.profile.finance_investor';
    else if (investorType === TEAM) return 'Account.profile.team';

    return '';
  };

  const renderPosition = (position: 1 | 2 | 3) => {
    const INVESTOR = 1;
    const TECH = 2;
    const BA = 3;

    if (position === INVESTOR) return 'Account.profile.position_investor';
    else if (position === TECH) return 'Account.profile.position_tech';
    else if (position === BA)
      return 'Account.profile.position_business_analyst';

    return '';
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
          <PageTitle text="Profile" back={moveToGeneralPage} />
          <PageRow leftIcon={<IconUserCircle />} text={name} />
          <PageRow
            leftIcon={<IconPigMoney />}
            text={t(renderInvestorType(investorType))}
          />
          <PageRow leftIcon={<IconId />} text={t(renderPosition(position))} />
          <PageQuote />
        </Stack>
      </Paper>
    </Center>
  );
}
