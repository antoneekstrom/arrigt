import { Event } from "arrigt-backend/src/schema/types/Event";
import { Shimmer } from "./layout/Shimmer";
import { Paragraphs } from "./typography/Paragraphs";
import { Title } from "./typography/Title";

export type EventDetailsProps = { event: Partial<Event>; fetching?: boolean };

/**
 * Shows the event information.
 */
export function EventDetails({ event, fetching }: EventDetailsProps) {
  return (
    <div className="flex flex-col gap-y-16 gap-x-16 lg:flex-row lg:gap-y-4">
      <TextContent />
      <Poster />
    </div>
  );

  function TextContent() {
    return fetching ? (
      <div className="flex flex-col gap-8">
        <Shimmer className="h-[60px] w-full lg:w-[35vw]" />
        <Shimmer className="h-[400px] w-full lg:w-[50vw]" />
      </div>
    ) : (
      <div className="grow-[3] basis-0">
        <Title>{event?.title}</Title>
        <Paragraphs lines={event?.description ?? []} />
      </div>
    );
  }

  function Poster() {
    return fetching ? (
      <Shimmer className="h-[492px] w-full grow" />
    ) : (
      <div className="grid grow-[2] basis-0 place-items-center">
        <img
          src={`${event?.imageUrl}`}
          className="w-full rounded-lg"
          alt="Poster of the event."
        />
      </div>
    );
  }
}
