import { SubmitFormButton } from "./Button";
import { FormInputField, FormInputFieldProps } from "./InputField";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useMutation } from "urql";
import { UserIdentity } from "arrigt-backend/src/model";
import { FormErrors } from "./FormErrors";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { DataPrivacyAgreement } from "arrigt-backend/src/model/privacypolicy";
import { ADD_REGISTRATION, EMAIL_REGEX, NAME_REGEX } from "../../pages/index";
import { WithLabel } from "./Label";

export type RegistrationFormType = Pick<UserIdentity, "name" | "email"> & {
  gdpr: boolean;
};

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

  const [, executeMutation] = useMutation(ADD_REGISTRATION);

  const { register, handleSubmit, formState, reset } =
    useForm<RegistrationFormType>({
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
        <div className="hidden col-span-2">
          <FormErrors errors={errors} />
        </div>
        <div className="col-span-2 flex flex-col gap-8 sm:flex-col lg:col-span-1 lg:row-span-2">
          <div className="flex flex-col xl:flex-row gap-8">
            <NameField {...formProps} />
            <EmailField {...formProps} />
          </div>
          <div className="flex flex-col gap-8 xl:w-1/2">
            <SubmitFormButton
              value="Anmäl mig!"
              disabled={!formState.isValid}
            />
            <div className="hidden lg:block">
              <FormErrors errors={errors} />
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-8 lg:col-span-1 lg:row-span-2">
          <WithLabel label="GDPR*">
            <PrivacyPolicy {...formProps} agreement={agreement} />
          </WithLabel>
        </div>
      </div>
    </form>
  );
}

function EmailField(props: Pick<FormInputFieldProps, "register" | "state">) {
  return (
    <FormInputField
      {...props}
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

function NameField(props: Pick<FormInputFieldProps, "register" | "state">) {
  return (
    <FormInputField
      {...props}
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
  ],
  lastDeletion: new Date(),
  responsible: {
    name: "SnIT",
    email: "snit@chalmers.it",
  },
  purpose:
    "The data is collected so that we can know who is participating, in order to prepare for the event.",
};
