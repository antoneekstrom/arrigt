import { Event } from "arrigt-backend/src/model";
import { gql, TypedDocumentNode, useQuery } from "urql";
import { EventListItem } from "../src/components/EventListItem";
import { LoadingBox } from "../src/components/LoadingBox";

type GetEventsQueryReturn = {
  events: (Partial<Event> & Required<Pick<Event, "id">>)[];
};

const GET_EVENTS_QUERY: TypedDocumentNode<GetEventsQueryReturn> = gql`
  query {
    events {
      id
      title
      imageUrl
      description
      date
      responsible {
        name
        iconUrl
      }
    }
  }
`;

export default function Events() {
  const [{ data, fetching }] = useQuery({
    query: GET_EVENTS_QUERY,
  });

  return (
    <div>
      <ul className="flex flex-col gap-8">
        {fetching ? (
          <>
            <div className="h-[200px] w-full">
              <LoadingBox />
            </div>
            <div className="h-[200px] w-full">
              <LoadingBox />
            </div>
            <div className="h-[200px] w-full">
              <LoadingBox />
            </div>
          </>
        ) : (
          data?.events.map((event) => (
            <li key={event.id}>
              <EventListItem event={event} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
