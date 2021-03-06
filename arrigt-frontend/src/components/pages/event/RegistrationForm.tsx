import { FormProvider, useForm } from "react-hook-form";
import { gql, TypedDocumentNode, useMutation } from "urql";
import { AddRegistrationInput } from "arrigt-backend/src/schema/inputs";
import { Event } from "arrigt-backend/src/schema/types/Event";
import { User } from "arrigt-backend/src/schema/types/User";
import { FormErrors } from "../../forms/FormErrors";
import { FormInputField } from "../../forms/FormInputField";
import { PrivacyPolicy } from "../../forms/PrivacyPolicy";
import { SubmitFormButton } from "../../forms/SubmitFormButton";
import { WithLabel, NoLabel } from "../../typography/Label";

export type RegistrationFormProps = {
  event: Pick<Event, "agreement" | "id">;
};

export type RegistrationFormType = Pick<User, "name" | "email"> & {
  gdpr: boolean;
};

type AddRegistrationMutationReturn = {
  addRegistration: Event;
};

export const ADD_REGISTRATION_MUTATION: TypedDocumentNode<
  AddRegistrationMutationReturn,
  AddRegistrationInput
> = gql`
  mutation ($eventId: String!, $user: UserInput!, $userData: UserDataInput!) {
    addRegistration(
      input: { eventId: $eventId, user: $user, userData: $userData }
    ) {
      eventId
    }
  }
`;

export function RegistrationForm({
  event: { agreement, id: eventId },
}: RegistrationFormProps) {
  const formContext = useFormContext();
  const submitRegistration = useSubmitRegistration();

  const onSubmit = async ({ name, email, gdpr }: RegistrationFormType) =>
    submitRegistration(eventId, name, email, gdpr);

  return (
    <FormProvider {...formContext}>
      <form onSubmit={formContext.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 grid-rows-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-8 lg:col-start-1">
            <NameField />
            <EmailField />
            <FormErrors className="hidden lg:block" />
          </div>
          <WithLabel label="GDPR*" className="lg:col-start-2 lg:row-start-1">
            <PrivacyPolicy agreement={agreement} />
          </WithLabel>
          <NoLabel className="flex flex-col gap-8 lg:col-start-2">
            <SubmitFormButton
              value="Anm??l mig!"
              disabled={!formContext.formState.isValid}
            />
            <FormErrors className="block lg:hidden" />
          </NoLabel>
        </div>
      </form>
    </FormProvider>
  );

  function useSubmitRegistration() {
    const addRegistrationMutation = useAddRegistrationMutation();
    return async function (
      eventId: string,
      name: string,
      email: string,
      gdpr: boolean
    ) {
      const result = await addRegistrationMutation({
        eventId,
        user: {
          email,
          ...parseName(name),
        },
        userData: {
          gdpr: {
            accepted: gdpr,
          },
        },
      });

      if (!result.error) {
        redirectToRegisteredPage();
      } else {
        console.error(result.error);
      }
    };
  }

  function redirectToRegisteredPage() {
    window.location.href = "/event/registered";
  }

  function useAddRegistrationMutation() {
    const [, executeMutation] = useMutation(ADD_REGISTRATION_MUTATION);
    return executeMutation;
  }

  function useFormContext() {
    return useForm<RegistrationFormType>({
      mode: "onTouched",
    });
  }

  function parseName(name: string) {
    const [firstName, nickname, lastName] = name.split('"');
    return {
      nickname: nickname.trim(),
      name: `${firstName.trim()} ${lastName.trim()}`,
    };
  }

  function EmailField() {
    const EMAIL_REGEX =
      /[a-zA-Z]([_.-]?[a-zA-Z])*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/;
    return (
      <FormInputField
        label="Mejl"
        name="email"
        options={{
          pattern: {
            value: EMAIL_REGEX,
            message: "Felaktig mejladress.",
          },
          required: {
            value: true,
            message: "Du m??ste ange en mejladress.",
          },
        }}
        className="w-full grow"
      />
    );
  }

  function NameField() {
    const NAME_REGEX = /[^"]+\s"[^"]+"\s[^"]+/;

    return (
      <FormInputField
        label={`F??rnamn "Nick" Efternamn`}
        name="name"
        options={{
          pattern: {
            value: NAME_REGEX,
            message: "Namn m??ste vara i formatet 'F??rnamn \"Nick\" Efternamn'.",
          },
          required: {
            value: true,
            message: "Du m??ste ange ditt namn.",
          },
        }}
        className="w-full grow"
      />
    );
  }
}
