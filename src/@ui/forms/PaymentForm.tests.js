import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@ui/theme';

import { PaymentFormWithoutData } from './PaymentForm';

const createTestData = () => ({
  setFieldValue: jest.fn(),
  handleSubmit: jest.fn(),
  values: {
    paymentMethod: 'creditCard',
    routingNumber: '111111111111',
    accountNumber: '22222222222',
    accountType: 'checking',
    accountName: 'My account',
    cardNumber: '4111111111111111',
    expirationDate: '10/32',
    cvv: '123',
  },
  setFieldTouched: jest.fn(),
  touched: {
    paymentMethod: false,
    routingNumber: false,
    accountNumber: false,
    accountType: false,
    accountName: false,
    cardNumber: false,
    expirationDate: false,
    cvv: false,
  },
  errors: {
    paymentMethod: null,
    routingNumber: null,
    accountNumber: null,
    accountType: null,
    accountName: null,
    cardNumber: null,
    expirationDate: null,
    cvv: null,
  },
  isSubmitting: false,
  isValid: true,
});

describe('The PaymentForm component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <PaymentFormWithoutData {...createTestData()} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders a loading indicator', () => {
    const data = createTestData();
    data.isLoading = true;
    const tree = renderer.create(
      <ThemeProvider>
        <PaymentFormWithoutData {...data} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('shows a submitting state', () => {
    const data = createTestData();
    data.isSubmitting = true;
    const tree = renderer.create(
      <ThemeProvider>
        <PaymentFormWithoutData {...data} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('shows bank account info', () => {
    const data = createTestData();
    data.values.paymentMethod = 'bankAccount';
    const tree = renderer.create(
      <ThemeProvider>
        <PaymentFormWithoutData {...data} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
