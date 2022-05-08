import { EventObjectType } from "arrigt-backend/src/schema/types/Event";
import { gql, TypedDocumentNode, useQuery, useSubscription } from "urql";
import { EventListItem } from "../src/components/EventListItem";

type GetEventsQueryReturn = {
  events: EventObjectType[];
};

type EventAddedSubcriptionPayload = {
  eventAdded: EventObjectType;
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
  const [{ data: initialEvents }] = useQuery({
    query: GET_EVENTS_QUERY,
  });

  function reduceEvents(
    events: EventObjectType[] = [],
    { eventAdded }: EventAddedSubcriptionPayload
  ): EventObjectType[] {
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
      {events?.map((event) => (
        <EventListItem event={event} key={event.id} />
      ))}
    </div>
  );
}
