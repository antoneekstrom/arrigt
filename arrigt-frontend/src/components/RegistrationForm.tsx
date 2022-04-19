import { SubmitFormButton } from "./Button";
import { FormInputField, FormInputFieldProps } from "./InputField";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useMutation } from "urql";
import { UserIdentity } from "arrigt-backend/src/model";
import { FormErrors } from "./FormErrors";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { DataPrivacyAgreement } from "arrigt-backend/src/model/privacypolicy";
import { WithLabel } from "./Label";
import { ADD_REGISTRATION } from "../graphql/queries";

export function RegistrationForm() {
  async function onSubmit({ name, email, gdpr }: RegistrationFormType) {
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

  function EmailField() {
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

  function parseName(name: string) {
    const [firstName, nickname, lastName] = name.split('"');
    return {
      nickname: nickname.trim(),
      name: `${firstName.trim()} ${lastName.trim()}`,
    };
  }

  const [, executeMutation] = useMutation(ADD_REGISTRATION);

  const formContext = useForm<RegistrationFormType>({
    mode: "onTouched",
  });

  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = formContext;

  useEffect(() => reset(), []);

  return (
    <FormProvider {...formContext}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-8">
          <div className="col-span-2 flex flex-col gap-8 sm:flex-col lg:col-span-1 lg:row-span-2 3xl:col-span-2">
            <div className="flex flex-col gap-8 xl:flex-row">
              <NameField />
              <EmailField />
            </div>
            <div className="hidden grid-cols-1 gap-8 lg:grid xl:grid-cols-2">
              <SubmitFormButton value="Anmäl mig!" disabled={!isValid} />
              <div className="hidden overflow-y-auto lg:block 3xl:h-[8rem]">
                <FormErrors />
              </div>
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-8 lg:col-span-1 lg:row-span-2 3xl:col-span-2">
            <WithLabel label="GDPR*">
              <PrivacyPolicy agreement={agreement} />
            </WithLabel>
          </div>
        </div>
        <div className="col-span-2 mt-8 lg:hidden">
          <SubmitFormButton value="Anmäl mig!" disabled={!isValid} />
          <div className="mt-8">
            <FormErrors />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export type RegistrationFormType = Pick<UserIdentity, "name" | "email"> & {
  gdpr: boolean;
};

export const EMAIL_REGEX =
  /[a-zA-Z]([_.-]?[a-zA-Z])*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/;
export const NAME_REGEX = /[^"]+\s"[^"]+"\s[^"]+/;

const agreement: DataPrivacyAgreement = {
  dataGathered: [
    {
      description: "Your email",
      usage: "To send you a confirmation email.",
    },
    {
      description: "Your name",
      usage: "To know who you are.",
    },
  ],
  sharedWith: [
    {
      name: "ArmIT",
      email: "armit@chalmers.it",
    },
    {
      name: "StyrIT",
      email: "styrit@chalmers.it",
    },
  ],
  lastDeletion: new Date(),
  responsible: {
    name: "SnIT",
    email: "snit@chalmers.it",
  },
  purpose:
    "The data is collected so that we can know who is participating, in order to prepare for the event.",
};
