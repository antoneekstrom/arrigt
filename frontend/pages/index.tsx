import { LayeredCard } from "../src/components/LayeredCard";
import { CardButtonBase } from "../src/components/CardButtonBase";
import { TextInput } from "../src/components/TextInput";

const EMAIL_REGEX = /[a-zA-Z]([_.-]?[a-zA-Z])*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/;
const NAME_REGEX = /[^"]+\s"[^"]+"\s[^"]+/;

export default function Main() {
  const Title = () => (
    <h1 className="mb-8 text-3xl font-semibold leading-none">Kursenkätsfika</h1>
  );

  const Description = () => (
    <div className="flex flex-col gap-y-6">
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
    <div className="my-8">
      <LayeredCard primary depress hover>
        <a href="/registered" className="px-12 py-3 inline-block outline-none">Anmäl mig!</a>
      </LayeredCard>
    </div>
  );

  return (
    <div className="flex flex-col justify-between gap-12 lg:flex-row">
      <div className="grow basis-0">
        <Title />
        <Description />
        <div className="my-8">
          <TextInput
            label="Mejl"
            validate={(value) => ({
              isValid: value.match(EMAIL_REGEX)?.[0].length === value.length,
              message: "Mejladdressen är inte giltig.",
            })}
          />
        </div>
        <div className="my-8">
          <TextInput
            label={`Namn (Förnamn "Nick" Efternamn)`}
            validate={(value) => ({
              isValid: value.match(NAME_REGEX)?.[0].length === value.length,
              message:
                'Ditt namn behöver vara i formatet: Förnamn "Nick" Efternamn.',
            })}
          />
        </div>
        <RegisterButton />
      </div>
      <div className="grow basis-0">
        <Poster />
      </div>
    </div>
  );
}
