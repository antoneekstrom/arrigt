import { Event } from "arrigt-backend/src/model";
import { useRouter } from "next/router";
import { gql, TypedDocumentNode, useQuery } from "urql";
import { EventDetails } from "../../src/components/EventDetails";
import { RegistrationForm } from "../../src/components/RegistrationForm";
import { SubTitle } from "../../src/components/Subtitle";

type GetEventQueryReturn = {
  event: Pick<Event, "title" | "description" | "imageUrl" | "id" | "agreement">;
};

const GET_EVENT_QUERY: TypedDocumentNode<GetEventQueryReturn> = gql`
  query ($eventId: String!) {
    event(id: $eventId) {
      title
      description
      imageUrl
      id
      agreement {
        purpose
        collectStatistics
        lastDeletion
        dataGathered {
          description
          usage
        }
        sharedWith {
          name
          email
          organisation
          contactInformation
        }
        responsible {
          name
          email
          organisation
          contactInformation
        }
      }
    }
  }
`;

/**
 * A page that shows the event information.
 */
export default function EventPage() {
  const eventId = useEventId();
  const { data, fetching } = useGetEventQuery();

  if (fetching || !data) {
    return <h1>loading</h1>;
  }

  const { event } = data;

  return (
    <div className="flex flex-col gap-16">
      <div className="col-span-2">
        <EventDetails event={event} />
      </div>
      <div>
        <SubTitle>Anmälan</SubTitle>
        {event && event.id && event.agreement && (
          <RegistrationForm event={event} />
        )}
      </div>
    </div>
  );

  function useGetEventQuery() {
    const [{ data, fetching }] = useQuery({
      query: GET_EVENT_QUERY,
      variables: { eventId },
    });

    return { data, fetching };
  }

  function useEventId() {
    const { id } = useRouter().query;
    return id;
  }
}
