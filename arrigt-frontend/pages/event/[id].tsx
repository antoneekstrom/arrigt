import { Event } from "arrigt-backend/src/schema/types/Event";
import Head from "next/head";
import { useRouter } from "next/router";
import { gql, TypedDocumentNode, useQuery } from "urql";
import { Shimmer, ShimmerList } from "../../src/components/layout/Shimmer";
import { EventDetails } from "../../src/components/pages/event/EventDetails";
import { RegistrationForm } from "../../src/components/pages/event/RegistrationForm";
import { SubTitle } from "../../src/components/typography/Subtitle";

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

  const event = data?.event;

  return (
    <div className="flex flex-col gap-16">
      <Head>
        <title>{event?.title && `${event.title} -`} arrIgT</title>
      </Head>
      <div className="col-span-2">
        {event && <EventDetails event={event} />}
        {fetching && (
          <div className="grid h-[40rem] grid-cols-3 gap-16">
            <div className="col-span-2 flex flex-col gap-4">
              <ShimmerList count={4} className="h-16" />
            </div>
            <Shimmer />
          </div>
        )}
      </div>
      <div>
        {event && (
          <div>
            <SubTitle>Anmälan</SubTitle>
            <RegistrationForm event={event} />
          </div>
        )}
        {fetching && (
          <div className="flex flex-col gap-8">
            <Shimmer className="h-[50px] w-1/2" />
            <Shimmer className="h-[300px] w-full" />
          </div>
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
