import { Event } from "arrigt-backend/src/schema/types/Event";
import { Paragraphs } from "../../typography/Paragraphs";
import { Title } from "../../typography/Title";

export type EventDetailsProps = { event: Partial<Event> };

/**
 * Shows information about an event.
 */
export function EventDetails({ event }: EventDetailsProps) {
  return (
    <div className="flex flex-col gap-y-16 gap-x-16 lg:flex-row lg:gap-y-4">
      <div className="grow-[3] basis-0">
        <Title>{event?.title}</Title>
        <Paragraphs lines={event?.description ?? []} />
      </div>
      <div className="grid grow-[2] basis-0 place-items-center">
        <img
          src={`${event?.imageUrl}`}
          className="w-full rounded-lg"
          alt="Poster of the event."
        />
      </div>
    </div>
  );
}
