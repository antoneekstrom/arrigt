import { Event } from "arrigt-backend/src/model";
import { useRouter } from "next/router";
import { gql, TypedDocumentNode, useQuery } from "urql";
import { EventDetails } from "../../src/components/EventDetails";
import { RegistrationForm } from "../../src/components/RegistrationForm";
import { SubTitle } from "../../src/components/Subtitle";

type GetEventQueryReturn = {
  event: Partial<Event>;
};

const GET_EVENT_QUERY: TypedDocumentNode<GetEventQueryReturn> = gql`
  query ($eventId: String!) {
    event(id: $eventId) {
      title
      description
      imageUrl
    }
  }
`;

/**
 * A page that shows the event information.
 */
export default function EventPage() {
  const { id: eventId } = useRouter().query;
  const [{ data, fetching }] = useQuery({
    query: GET_EVENT_QUERY,
    variables: { eventId },
  });

  if (fetching) {
    return <h1>loading</h1>;
  }

  if (!data) {
    return <h1>not found</h1>;
  }

  return (
    <div className="flex flex-col gap-16 3xl:grid 3xl:grid-cols-3 3xl:gap-32">
      <div className="col-span-2">
        <EventDetails event={data.event} />
      </div>
      <div>
        <SubTitle>Anmälan</SubTitle>
        <RegistrationForm />
      </div>
    </div>
  );
}
