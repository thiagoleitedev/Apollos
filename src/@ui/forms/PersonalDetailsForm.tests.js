import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@ui/theme';

import { PersonalDetailsFormWithoutData } from './PersonalDetailsForm';

const createTestData = () => ({
  setFieldValue: jest.fn(),
  handleSubmit: jest.fn(),
  values: {
    campusId: 'one',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email@email.com',
  },
  setFieldTouched: jest.fn(),
  errors: {
    campusId: null,
    firstName: null,
    lastName: null,
    email: null,
  },
  touched: {
    campusId: false,
    firstName: false,
    lastName: false,
    email: false,
  },
  isSubmitting: false,
  isValid: false,
  campuses: [{
    id: 'one',
    label: 'My campus',
  }],
});

describe('The PaymentForm component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <PersonalDetailsFormWithoutData {...createTestData()} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('shows a submitting state', () => {
    const data = createTestData();
    data.isSubmitting = true;
    const tree = renderer.create(
      <ThemeProvider>
        <PersonalDetailsFormWithoutData {...data} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
