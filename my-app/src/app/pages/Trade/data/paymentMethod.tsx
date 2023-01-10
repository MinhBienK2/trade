import React from 'react';
import { useTranslation } from 'react-i18next';

export interface ValueSelectForm {
  value: string;
  label: string;
}

export interface PaymentMethod {
  id: number;
  paymentMethods: string;
}

export const dataPaymentMethod: PaymentMethod[] = [
  { id: 0, paymentMethods: 'Trade.paymentByBalance' },
  { id: 1, paymentMethods: 'Trade.paymentByESOP' },
];

export function GetPaymentMethodList(): ValueSelectForm[] {
  const { t } = useTranslation();

  let data = new Array<ValueSelectForm>();
  for (let i = 0; i < dataPaymentMethod.length; i++) {
    data.push({
      value: String(dataPaymentMethod[i].id),
      label: t(dataPaymentMethod[i].paymentMethods),
    });
  }
  return data;
}
