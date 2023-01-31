import React from 'react';
import { motion } from 'framer-motion';

type Props = {};

export const Test = (props: Props) => {
  return (
    <>
      <motion.div
        style={{ width: '200px', height: '200px', borderRadius: '50%', background: 'blue' }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      />
    </>
  );
};
