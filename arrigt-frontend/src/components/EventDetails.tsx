import { Event } from "arrigt-backend/src/model";
import { Paragraphs } from "./Paragraphs";
import { Title } from "./Title";

export type EventDetailsProps = { event: Partial<Event> };

/**
 * Shows the event information.
 */
export function EventDetails({ event }: EventDetailsProps) {
  return (
    <div className="flex flex-col gap-y-16 gap-x-16 lg:flex-row lg:gap-y-4">
      <TextContent />
      {event.imageUrl && <Poster />}
    </div>
  );

  function TextContent() {
    return (
      <div className="grow-[3] basis-0">
        <Title>{event.title}</Title>
        <Paragraphs lines={event.description ?? []} />
      </div>
    );
  }

  function Poster() {
    return (
      <div className="grid grow-[2] basis-0 place-items-center">
        <img
          src={`${event.imageUrl}`}
          className="w-full rounded-lg"
          alt="Poster of the event."
        />
      </div>
    );
  }
}
