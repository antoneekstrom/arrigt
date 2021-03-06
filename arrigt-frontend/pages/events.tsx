import { Event } from "arrigt-backend/src/schema/types/Event";
import { gql, TypedDocumentNode, useQuery, useSubscription } from "urql";
import { EventItem } from "../src/components/EventItem";
import { ShimmerList } from "../src/components/layout/Shimmer";

type GetEventsQueryReturn = {
  events: Event[];
};

type EventAddedSubcriptionPayload = {
  eventAdded: Event;
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

const EVENTS_ADDED_SUBSCRIPTION: TypedDocumentNode<EventAddedSubcriptionPayload> = gql`
  subscription {
    eventAdded {
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
  const [{ data: initialEvents, fetching }] = useQuery({
    query: GET_EVENTS_QUERY,
  });

  function reduceEvents(
    events: Event[] = [],
    { eventAdded }: EventAddedSubcriptionPayload
  ): Event[] {
    return [...events, eventAdded];
  }

  const [{ data: eventsAdded }] = useSubscription(
    {
      query: EVENTS_ADDED_SUBSCRIPTION,
    },
    reduceEvents
  );

  const events = [...(initialEvents?.events ?? []), ...(eventsAdded ?? [])];

  return (
    <div className="flex w-full flex-col gap-8">
      {fetching && <ShimmerList className="h-72" count={3} />}
      {events?.map((event) => (
        <EventItem event={event} key={event.id} />
      ))}
    </div>
  );
}
