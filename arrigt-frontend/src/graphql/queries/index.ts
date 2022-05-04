import { AddRegistrationInput } from "arrigt-backend/src/graphql/schema/inputs";
import { Registration } from "arrigt-backend/src/model";
import { TypedDocumentNode, gql } from "urql";

export const ADD_REGISTRATION: TypedDocumentNode<
  Registration,
  AddRegistrationInput
> = gql`
  mutation (
    $eventId: String!
    $userIdentity: UserIdentityInput!
    $userData: UserDataInput!
  ) {
    addRegistration(
      input: {
        eventId: $eventId
        userIdentity: $userIdentity
        userData: $userData
      }
    ) {
      eventId
    }
  }
`;
