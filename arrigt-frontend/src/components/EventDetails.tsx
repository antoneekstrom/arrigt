import { Event } from "arrigt-backend/src/model";
import { Title } from "./Title";

const event: Event = {
  id: "kursenkatsfika",
  name: "Kursenkätsfika",
};

const description = [
  "Hej SnITisar!",
  `Lite dålig framförhållning men imorgon den 31/3 är det återigen dags för
  kursenkätsfika! Tagga!! Kom förbi Hubben under lunchtid (12-13) och
  avnjut lite fika samtidigt som ni fyller i era kursenkäter.`,
  `Utöver detta har ni också chansen att vara med i en utlottning på 500 kr
  på Store! (Lottningen går du med i genom att under arrangemanget visa
  upp bevis på att du svarat på enkäten)`,
  `Vi syns där!`,
];

const imagePath = "poster-snit.png";

/**
 * Shows the event information.
 */
export function EventDetails() {
  return (
    <div>
      <div className="flex flex-col gap-y-16 gap-x-16 lg:flex-row lg:gap-y-4 xl:gap-x-32">
        <div className="grow basis-0">
          <Title>{event.name}</Title>
          <Description />
        </div>
        <div className="flex flex-row justify-center">
          <Poster />
        </div>
      </div>
    </div>
  );
}

function Poster() {
  return (
    <div>
      <img
        src={imagePath}
        className="max-h-[90vh] rounded-lg lg:max-h-[40rem] lg:max-w-screen-sm"
      />
    </div>
  );
}

function Description() {
  return (
    <div className="flex flex-col gap-y-8">
      {description.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  );
}
