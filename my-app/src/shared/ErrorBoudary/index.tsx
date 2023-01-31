import { Center } from '@mantine/core';
import React from 'react';
import { useSystemSlice } from 'store/app/system';
import { useSelector } from 'react-redux';
import { selectErrorSystem } from 'store/app/system/selector';

export class ErrorBoundary extends React.Component<{ children: any }, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Center>
          <h1>Some thing went wrong</h1>;
        </Center>
      );
    }
    return this.props.children;
  }
}
