import { graphql } from 'react-apollo';
import checkoutQuery from './checkoutQuery';

export default graphql(checkoutQuery, {
  options: { variables: { state: 28, country: 45 } },
  props({ data }) {
    const {
      campuses = [],
      countries = [],
      states = [],
      person,
      savedPayments,
      loading,
    } = data;

    return ({
      isLoading: loading,
      campuses,
      countries: countries.map(c => ({ label: c.description, id: c.value })),
      states: states.map(s => ({ label: s.description, id: s.value })),
      person,
      savedPayments,
    });
  },
});
