import { gql } from 'apollo-boost';

export const HUBSPOT_SUBSCRIBE = gql`
  mutation HubspotSubscribe(
    $email: String!
    $pageName: String!
    $pageUri: String!
    $hutk: String!
  ) {
    hubspotSubscribe(
      email: $email
      pageName: $pageName
      pageUri: $pageUri
      hutk: $hutk
    ) {
      status
    }
  }
`;
