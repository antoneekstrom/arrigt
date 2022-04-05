import { PrimaryButton } from "../src/components/PrimaryButton";

export default function Main() {
  const Title = () => (
    <h1 className="text-3xl font-semibold leading-none mb-8">Kursenkätsfika</h1>
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
      className="rounded-lg w-full max-w-screen-sm md:max-h-full"
    />
  );

  const RegisterButton = () => (
    <div className="my-8">
      <a href="/registered">
        <PrimaryButton>Anmäl mig</PrimaryButton>
      </a>
    </div>
  );
  return (
    <div className="flex flex-col justify-between lg:flex-row gap-12">
      <div className="grow basis-0">
        <Title />
        <Description />
        <RegisterButton />
      </div>
      <div className="grow basis-0">
        <Poster />
      </div>
    </div>
  );
}
