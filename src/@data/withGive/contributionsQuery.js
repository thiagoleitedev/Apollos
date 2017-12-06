import gql from 'graphql-tag';

export default gql`
  query Give {
    contributions @client {
      contributions
      frequencyId
      startDate
      firstName
      lastName
      email
      campusId
    }
  }
`;
