import React from 'react';
import { Menu, createStyles, Button } from '@mantine/core';
import { useSelector } from 'react-redux';

import { useUserSlice } from 'store/app/user';
import { selectLanguage } from 'store/app/user/selector';
import { ListMenu } from './ListMenu';
import { dataLanguage } from './data';

import { ReactComponent as Vn } from 'assets/icons/vn.svg';
import { ReactComponent as En } from 'assets/icons/en.svg';
import { ReactComponent as Arrow } from 'assets/icons/arrow-bottom.svg';

interface LanguageProps {
  userLanguage: string;
}

export const Language = (props: LanguageProps) => {
  // useUserSlice();
  // const language = useSelector(selectLanguage);
  const { classes } = useStyles();

  return (
    <Menu withArrow>
      <Menu.Target>
        <Button
          className={classes.button}
          leftIcon={props.userLanguage === 'vi' ? <Vn /> : <En />}
          rightIcon={<Arrow />}
          fs={'12px'}
          fw={500}
          style={{ color: '#000000', fontFamily: 'Poppins Medium' }}
        >
          {props.userLanguage === 'vi' ? 'Vie' : 'Eng'}
        </Button>
      </Menu.Target>
      <ListMenu dataLanguage={dataLanguage} />
    </Menu>
  );
};

const useStyles = createStyles(theme => ({
  button: {
    background: theme.colors.blue[1],
    borderRadius: '27px',
    color: theme.black,
    height: '32px',
  },
}));
