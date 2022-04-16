import { SubmitFormButton } from "../src/components/Button";
import { FormInputField } from "../src/components/InputField";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { gql, TypedDocumentNode, useMutation } from "urql";
import { Registration, UserIdentity } from "arrigt-backend/src/model";
import { AddRegistrationInput } from "arrigt-backend/src/graphql/schema/resolvers/RegistrationResolver";
import { FormErrors } from "../src/components/FormErrors";
import { PrivacyPolicy } from "../src/components/PrivacyPolicy";
import { DataPrivacyAgreement } from "arrigt-backend/src/model/privacypolicy";

const EMAIL_REGEX = /[a-zA-Z]([_.-]?[a-zA-Z])*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/;
const NAME_REGEX = /[^"]+\s"[^"]+"\s[^"]+/;

const ADD_REGISTRATION: TypedDocumentNode<
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

function RegistrationForm() {
  type FormType = Pick<UserIdentity, "name" | "email"> & { gdpr: boolean };

  function parseName(name: string) {
    const [firstName, nickname, lastName] = name.split('"');
    return {
      nickname: nickname.trim(),
      name: `${firstName.trim()} ${lastName.trim()}`,
    };
  }

  async function onSubmit({ name, email, gdpr }: FormType) {
    await executeMutation({
      eventId: "kursenkatsfika",
      userIdentity: {
        email,
        ...parseName(name),
      },
      userData: {
        gdpr: {
          agreement,
          accepted: gdpr,
        },
      },
    });
    window.location.href = "/registered";
  }

  const agreement: DataPrivacyAgreement = {
    dataGathered: [
      {
        description: "Your email",
        usage: "To send you a confirmation email.",
      },
      {
        description: "Your name",
        usage: "To know who you are.",
      }
    ],
    sharedWith: [
      {
        name: "ArmIT",
        email: "armit@chalmers.it"
      }
    ],
    lastDeletion: new Date(),
    responsible: {
      name: "SnIT",
      email: "snit@chalmers.it",
    },
    purpose:
      "The data is collected so that we can know who is participating, in order to prepare for the event.",
  };

  const [, executeMutation] = useMutation(ADD_REGISTRATION);

  const { register, handleSubmit, formState, reset } = useForm<FormType>({
    mode: "onTouched",
  });

  const formProps = {
    register,
    state: formState,
  };

  const { errors } = formState;

  useEffect(() => reset(), []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div className="col-span-2 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <FormInputField
            {...formProps}
            label="Mejl"
            name="email"
            options={{
              pattern: {
                value: EMAIL_REGEX,
                message: "Felaktig mejladress.",
              },
              required: {
                value: true,
                message: "Du måste ange en mejladress.",
              },
            }}
            className="w-full grow"
          />
          <FormInputField
            {...formProps}
            label={`Förnamn "Nick" Efternamn`}
            name="name"
            options={{
              pattern: {
                value: NAME_REGEX,
                message:
                  "Namn måste vara i formatet 'Förnamn \"Nick\" Efternamn'.",
              },
              required: {
                value: true,
                message: "Du måste ange ditt namn.",
              },
            }}
            className="w-full grow"
          />
        </div>
        <div className="col-span-2 flex flex-col gap-8">
          <PrivacyPolicy {...formProps} agreement={agreement} />
          <div className="flex flex-col gap-8">
            <SubmitFormButton
              value="Anmäl mig!"
              disabled={!formState.isValid}
            />
            <FormErrors errors={errors} />
          </div>
        </div>
      </div>
    </form>
  );
}
