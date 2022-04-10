import { SubmitCardButton } from "../src/components/CardButton";
import { Card } from "../src/components/Card";
import { FormCardInput } from "../src/components/TextInput";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const EMAIL_REGEX = /[a-zA-Z]([_.-]?[a-zA-Z])*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/;
const NAME_REGEX = /[^"]+\s"[^"]+"\s[^"]+/;

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

  const RegisterButton = () => (
    <div className="intent-primary my-8">
      <Card>
        <a
          href="/registered"
          className="inline-block px-12 py-3 text-intent-primary-500 outline-none">
          Anmäl mig!
        </a>
      </Card>
    </div>
  );

  return (
    <div className="flex flex-col justify-between gap-12 lg:flex-row">
      <div className="grow-[3] basis-0">
        <Title />
        <Description />
        <RegistrationForm />
      </div>
      <div className="grow-[2] basis-0">
        <Poster />
      </div>
    </div>
  );
}

function RegistrationForm() {
  type FormType = {
    name: string;
    email: string;
  };

  const { register, handleSubmit, formState, reset } = useForm<FormType>({
    mode: "onBlur",
  });

  const formProps = {
    register,
    state: formState,
  };

  useEffect(() => reset(), []);

  return (
    <form
      onSubmit={handleSubmit((data) =>
        console.log(JSON.parse(JSON.stringify(data)))
      )}>
      <div className="mt-8 flex flex-col place-items-start gap-8">
        <FormCardInput
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
        />
        <FormCardInput
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
        />
        <div
          className={formState.isValid ? "intent-primary" : "intent-disabled"}>
          <SubmitCardButton
            primary
            value="Anmäl mig!"
            disabled={!formState.isValid}
          />
        </div>
      </div>
    </form>
  );
}
