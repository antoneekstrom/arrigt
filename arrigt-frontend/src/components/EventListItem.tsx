import { Event } from "arrigt-backend/src/schema/types/Event";

export type EventListItemProps = {
  event: Partial<Event>;
};

export function EventListItem({
  event: { title, description, id, imageUrl, date, responsible },
}: EventListItemProps) {
  return (
    <div className="flex flex-col gap-12 rounded-lg bg-gray-0 px-8 py-8 lg:flex-row">
      <a
        href={`/event/${id}`}
        className="flex flex-col place-items-center lg:h-[200px] lg:w-[300px]">
        <img
          src={imageUrl}
          alt="Image of the event."
          height={300}
          width={300}
          className="h-full w-auto max-w-[50vw] lg:max-h-[300px] lg:max-w-[300px]"
        />
      </a>
      <div className="flex grow-[10] basis-0 flex-col gap-2">
        <a href={`/event/${id}`}>
          <h1 className="text-lg font-semibold">{title}</h1>
        </a>
        <div className="flex place-items-center gap-2">
          <div className="flex flex-row place-items-center gap-2">
            {responsible?.iconUrl && (
              <img
                src={responsible?.iconUrl}
                alt="Responsible party icon."
                className="h-8 w-8"
                width={32}
                height={32}
              />
            )}
            <span className="font-medium">{responsible?.name}</span>
          </div>
          {date && <span>{new Date(date)?.toLocaleString()}</span>}
        </div>
        <p className="max-w-screen-lg">{description?.[1]}</p>
      </div>
    </div>
  );
}
