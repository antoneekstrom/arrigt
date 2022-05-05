import { gql, TypedDocumentNode, useQuery } from "urql";
import { Button } from "../src/components/Button";
import { Card } from "../src/components/Card";

type GetEventsQueryReturn = {
  events: {
    id: string;
    title: string;
  }[];
};

const GET_EVENTS_QUERY: TypedDocumentNode<GetEventsQueryReturn> = gql`
  query {
    events {
      id
      title
    }
  }
`;

export default function Events() {
  const [{ data, fetching, error }] = useQuery({
    query: GET_EVENTS_QUERY,
  });

  return (
    <div>
      <ul>
        {data?.events.map(({ title, id }) => (
          <li key={id}>
            <a href={`/event/${id}`}>
              <Button>{title}</Button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
