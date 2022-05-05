import { Event } from "arrigt-backend/src/model";
import { Title } from "./Title";

export type EventDetailsProps = { event: Partial<Event> };

/**
 * Shows the event information.
 */
export function EventDetails({ event }: EventDetailsProps) {
  return (
    <div>
      <div className="flex flex-col gap-y-16 gap-x-16 lg:flex-row lg:gap-y-4 xl:gap-x-32">
        <div className="grow basis-0">
          <Title>{event.title}</Title>
          <Description description={event.description ?? []} />
        </div>
        <div className="flex flex-row justify-center">
          {event.imageUrl && <Poster imageUrl={event.imageUrl} />}
        </div>
      </div>
    </div>
  );
}

function Poster({ imageUrl }: { imageUrl: string }) {
  return (
    <div>
      <img
        src={`${imageUrl}`}
        className="max-h-[90vh] rounded-lg lg:max-h-[40rem] lg:max-w-screen-sm"
      />
    </div>
  );
}

function Description({ description }: { description: string[] }) {
  return (
    <div className="flex flex-col gap-y-8">
      {description.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  );
}
