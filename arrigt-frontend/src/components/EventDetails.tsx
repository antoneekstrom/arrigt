import { Event } from "arrigt-backend/src/model";
import { LoadingBox } from "./LoadingBox";
import { Paragraphs } from "./Paragraphs";
import { Title } from "./Title";

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
        <LoadingBox className="h-[60px] w-full lg:w-[35vw]" />
        <LoadingBox className="h-[400px] w-full lg:w-[50vw]" />
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
      <LoadingBox className="h-[492px] w-full grow" />
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
