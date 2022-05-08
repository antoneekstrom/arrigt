import { gql, TypedDocumentNode, useQuery, UseQueryState } from "urql";
import { Registration } from "arrigt-backend/src/model/types";
import { EventObjectType } from "arrigt-backend/src/schema/types/Event";
import { FormInputField } from "../src/components/InputField";
import { FormProvider, useForm } from "react-hook-form";

type RegistrationsData = {
  registrations: Registration[];
};

type EventsData = {
  events: EventObjectType[];
};

type FormType = {
  eventId: string;
};

const GET_REGISTRATIONS_QUERY: TypedDocumentNode<RegistrationsData> = gql`
  query ($eventId: String!) {
    registrations(eventId: $eventId) {
      eventId
      userIdentity {
        email
        name
        nickname
      }
      userData {
        gdpr {
          accepted
          agreement {
            responsible {
              name
              email
            }
          }
        }
      }
    }
  }
`;

const GET_EVENTS_QUERY: TypedDocumentNode<EventsData> = gql`
  query {
    events {
      id
    }
  }
`;

export default function Registrations() {
  const formContext = useForm<FormType>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSubmit, setValue, getValues, trigger } = formContext;

  const [{ data, fetching, error }] = useQuery({
    query: GET_EVENTS_QUERY,
  });

  const [result, reexecuteGetRegistrations] = useQuery({
    query: GET_REGISTRATIONS_QUERY,
    variables: { eventId: getValues("eventId") ?? "" },
  });

  if (fetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data) {
    return <div>Error! No data</div>;
  }

  const eventIds = data.events.map((event) => event.id);

  return (
    <div>
      <div>
        <FormProvider {...formContext}>
          <form onSubmit={handleSubmit(() => reexecuteGetRegistrations())}>
            <FormInputField
              label="Event ID"
              name="eventId"
              options={{
                validate: {
                  eventIdExists: (value) =>
                    eventIds.includes(value) || "Invalid event id",
                },
              }}
            />
          </form>
        </FormProvider>
      </div>
      <div className="mt-8">
        <RegistrationsResult
          result={result}
          eventIds={eventIds}
          onSelectEvent={(eventId) => {
            setValue("eventId", eventId, {
              shouldValidate: true,
            });
            reexecuteGetRegistrations();
            trigger("eventId");
          }}
        />
      </div>
    </div>
  );
}

function RegistrationsResult({
  result,
  eventIds,
  onSelectEvent,
}: {
  result: UseQueryState<
    RegistrationsData,
    {
      eventId: string;
    }
  >;
  eventIds: string[];
  onSelectEvent?: (eventId: string) => void;
}) {
  const { fetching, data, error } = result;

  if (fetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  const { registrations } = data;

  if (registrations.length == 0) {
    return (
      <div>
        <h1 className="text-lg">Events:</h1>
        <div className="mt-4">
          <ul className="list-disc pl-8">
            {eventIds.map((eventId) => (
              <li
                key={eventId}
                onClick={() => onSelectEvent?.(eventId)}
                className="cursor-pointer">
                <span className="text-turquoise-600 underline">{eventId}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return <pre>{JSON.stringify(registrations, null, 2)}</pre>;
}
