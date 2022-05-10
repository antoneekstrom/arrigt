import { Event } from "arrigt-backend/src/schema/types/Event";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { gql, TypedDocumentNode, useMutation, useQuery } from "urql";
import { FormInputField } from "../../../src/components/forms/FormInputField";
import { SubmitFormButton } from "../../../src/components/forms/SubmitFormButton";
import { Card } from "../../../src/components/layout/Card";
import { SubTitle } from "../../../src/components/typography/Subtitle";
import { Title } from "../../../src/components/typography/Title";

type GetEventQueryReturn = {
  event: Pick<Event, "title" | "description" | "id" | "registrations">;
};

const GET_EVENT_QUERY: TypedDocumentNode<GetEventQueryReturn> = gql`
  query ($eventId: String!) {
    event(id: $eventId) {
      title
      description
      id
      registrations {
        user {
          name
          email
        }
      }
    }
  }
`;

export default function EventEditPage() {
  const eventId = useEventId();
  const { data: eventData } = useGetEventQuery();

  const [, editEventMutation] = useMutation(gql`
    mutation ($title: String!, $id: String!) {
      updateEvent(input: { title: $title }, id: $id) {
        id
        title
      }
    }
  `);

  const formContext = useForm();

  return (
    <div>
      <Title>{eventData?.event.title}</Title>
      <FormProvider {...formContext}>
        <form
          className="flex w-1/2 flex-col gap-8 mt-8"
          onSubmit={formContext.handleSubmit(({ title }) =>
            editEventMutation({ title, id: eventId })
          )}>
          <FormInputField name="title" label="Title" />
          <SubmitFormButton value="Update" />
        </form>
      </FormProvider>
      <div className="mt-16 flex flex-col gap-8">
        <SubTitle>Registrations</SubTitle>
        {eventData?.event.registrations?.map(({ user }) => (
          <Card classNameInFront="p-4 flex flex-col" key={user?.id}>
            <span>{user?.name}</span>
            <span>{user?.email}</span>
          </Card>
        ))}
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
    return useRouter().query.id;
  }
}
