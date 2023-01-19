import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createStyles, Menu } from '@mantine/core';

import { useUserSlice } from 'store/app/user';
import { selectUser } from 'store/app/user/selector';
import { DataLanguageProps, lengthLanguage } from './data';

interface Props {
  dataLanguage: DataLanguageProps[];
}

const MenuLanguage = props => {
  const { classes, cx } = useStyleMenu({ id: props.id });
  const [t, i18n] = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useUserSlice();
  const user = useSelector(selectUser);

  function handleConvertLanguage() {
    if (props.value !== user.language) {
      i18n.changeLanguage(`${props.value}`);
      dispatch(actions.requestLanguage(props.value));
    }
  }

  return (
    <Menu.Item className={cx(classes.menuItem, classes.item)} icon={props.icon} onClick={() => handleConvertLanguage()}>
      {props.title}
    </Menu.Item>
  );
};

const ListLanguage = (props: { dataLanguage: DataLanguageProps[] }): any => {
  return props.dataLanguage.map(ele => {
    return <MenuLanguage key={ele.id} title={ele.title} value={ele.value} icon={ele.icon} id={ele.id} />;
  });
};

export const ListMenu = (props: Props) => {
  return (
    <Menu.Dropdown style={{ background: '#d0ebff' }} p={0}>
      <ListLanguage dataLanguage={props.dataLanguage} />
    </Menu.Dropdown>
  );
};

const useStyleMenu = createStyles((theme, params: { id: number }) => {
  return {
    menuItem: {
      borderBottom: params.id !== lengthLanguage ? `0.4px solid ${theme.colors.blue[1]}` : 'none',
      fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
    },
    item: {
      width: '150px',
    },
  };
});
