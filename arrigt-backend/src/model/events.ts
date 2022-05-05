import { Event, EventResponsible, Registration } from ".";
import { EventObjectType } from "../graphql/schema/types/Event";
import { DataPrivacyAgreement } from "./privacypolicy";

/**
 * Returns all events which there are registrations for.
 *
 * @param registrations the registrations
 * @returns the events
 */
export function mapRegistrationsToEvents(
  registrations: Registration[]
): Partial<EventObjectType>[] {
  // Add eventIds from the registrations to a set, to remove duplicates
  const eventIds = new Set(registrations.map(({ eventId }) => eventId));

  // Map the ids to event object types
  const events: Partial<EventObjectType>[] = [...eventIds].map((id) => ({
    id,
  }));

  return events;
}

/**
 * Adds default values to an event object that is missing these properties.
 *
 * @param event the event to apply the default details to
 * @param responsible the responsible of the event
 * @returns the event with the default details
 */
export function applyDefaultEventDetails(
  event: Omit<Event, "id" | "agreement">,
  responsible: EventResponsible
): Omit<Event, "id"> {
  return {
    ...event,
    agreement: getDefaultEventAgreement(responsible),
  };
}

/**
 * Returns the default data privacy agreement for an event.
 *
 * @param responsible the responsible of the event
 * @returns the privacy agreement
 */
function getDefaultEventAgreement(
  responsible: EventResponsible
): DataPrivacyAgreement {
  return {
    dataGathered: [
      {
        description: "Your email",
        usage: "To send you a confirmation email.",
      },
      {
        description: "Your name",
        usage: "To know who you are.",
      },
    ],
    lastDeletion: new Date(),
    responsible,
    purpose:
      "The data is collected so that we can know who is participating, in order to prepare for the event.",
  };
}
