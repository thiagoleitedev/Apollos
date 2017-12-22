import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';
import { ThemeProvider } from '@ui/theme';

import { PaymentConfirmationFormWithoutData } from './PaymentConfirmationForm';

const createTestData = () => ({
  isLoading: false,
  campus: 'web',
  contributions: {
    frequencyId: 'today',
    startDate: moment('10/20/2120').toDate(),
    contributions: [{
      name: 'General',
      amount: 253,
    }],
    isPaying: false,
  },
  onSubmit: jest.fn(),
});

describe('The PaymentConfirmationForm component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <PaymentConfirmationFormWithoutData {...createTestData()} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders a loading indicator', () => {
    const data = createTestData();
    data.isLoading = true;
    const tree = renderer.create(
      <ThemeProvider>
        <PaymentConfirmationFormWithoutData {...data} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('shows a paying state', () => {
    const data = createTestData();
    data.contributions.isPaying = true;
    const tree = renderer.create(
      <ThemeProvider>
        <PaymentConfirmationFormWithoutData {...data} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('shows a scheduled contribution', () => {
    const data = createTestData();
    data.contributions.frequencyId = 'monthly';
    const tree = renderer.create(
      <ThemeProvider>
        <PaymentConfirmationFormWithoutData {...data} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
