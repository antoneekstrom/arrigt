import { gql, TypedDocumentNode } from "urql";
import { Registration } from "arrigt-backend/src/model";
import { AddRegistrationInput } from "arrigt-backend/src/graphql/schema/resolvers/RegistrationResolver";
import { RegistrationForm } from "../src/components/RegistrationForm";

export const EMAIL_REGEX = /[a-zA-Z]([_.-]?[a-zA-Z])*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/;
export const NAME_REGEX = /[^"]+\s"[^"]+"\s[^"]+/;

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

export default function Main() {
  const Title = () => (
    <h1 className="mb-8 text-xl font-semibold leading-none">Kursenkätsfika</h1>
  );

  const Description = () => (
    <div className="flex flex-col gap-y-6 text-base">
      <p>Hej SnITisar!</p>
      <p>
        Lite dålig framförhållning men imorgon den 31/3 är det återigen dags för
        kursenkätsfika! Tagga!! Kom förbi Hubben under lunchtid (12-13) och
        avnjut lite fika samtidigt som ni fyller i era kursenkäter.
      </p>{" "}
      <p>
        Utöver detta har ni också chansen att vara med i en utlottning på 500 kr
        på Store! (Lottningen går du med i genom att under arrangemanget visa
        upp bevis på att du svarat på enkäten)
      </p>
      <p>Vi syns där!</p>
    </div>
  );

  const Poster = () => (
    <img
      src="poster-snit.png"
      alt="snIT poster"
      className="w-full max-w-screen-sm rounded-md md:max-h-full"
    />
  );

  return (
    <div className="flex flex-col justify-between gap-24 lg:flex-row">
      <div className="max-w-screen-md grow-[3] basis-0">
        <Title />
        <Description />
        <div className="mt-16 mb-6">
          <h2 className="text-md font-semibold uppercase">Anmälan</h2>
          <p className="text-sm">Anmäl dig i formuläret nedan.</p>
          <RegistrationForm />
        </div>
      </div>
      <div className="grow-[2] basis-0">
        <Poster />
      </div>
    </div>
  );
}


