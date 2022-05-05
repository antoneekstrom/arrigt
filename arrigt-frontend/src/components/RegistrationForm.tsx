import { SubmitFormButton } from "./Button";
import { FormInputField } from "./InputField";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useMutation } from "urql";
import { Event, UserIdentity } from "arrigt-backend/src/model";
import { FormErrors } from "./FormErrors";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { NoLabel, WithLabel } from "./Label";
import { ADD_REGISTRATION } from "../graphql/queries";

export type RegistrationFormProps = {
  event: Pick<Event, "agreement" | "id">;
};

export type RegistrationFormType = Pick<UserIdentity, "name" | "email"> & {
  gdpr: boolean;
};

export function RegistrationForm({
  event: { agreement, id: eventId },
}: RegistrationFormProps) {
  const formContext = useFormContext();
  const submitRegistration = useSubmitRegistration();

  const onSubmit = async ({ name, email, gdpr }: RegistrationFormType) =>
    submitRegistration(eventId, name, email, gdpr);

  // For debugging
  useEffect(() => formContext.reset(), [formContext]);

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
              value="Anmäl mig!"
              disabled={!formContext.formState.isValid}
            />
            <FormErrors className="block lg:hidden" />
          </NoLabel>
        </div>
      </form>
    </FormProvider>
  );
}

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
      userIdentity: {
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
    }
  };
}

function redirectToRegisteredPage() {
  window.location.href = "/registered";
}

function useAddRegistrationMutation() {
  const [, executeMutation] = useMutation(ADD_REGISTRATION);
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
          message: "Du måste ange en mejladress.",
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
      label={`Förnamn "Nick" Efternamn`}
      name="name"
      options={{
        pattern: {
          value: NAME_REGEX,
          message: "Namn måste vara i formatet 'Förnamn \"Nick\" Efternamn'.",
        },
        required: {
          value: true,
          message: "Du måste ange ditt namn.",
        },
      }}
      className="w-full grow"
    />
  );
}
