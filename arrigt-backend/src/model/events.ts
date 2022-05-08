import { DataPrivacyAgreementObjectType } from "../schema/types/DataPrivacyAgreement";
import { EventObjectType } from "../schema/types/Event";
import { EventResponsibleObjectType } from "../schema/types/EventResponsible";
import { RegistrationObjectType } from "../schema/types/Registration";

/**
 * Returns all events which there are registrations for.
 *
 * @param registrations the registrations
 * @returns the events
 */
export function mapRegistrationsToEvents(
  registrations: RegistrationObjectType[]
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
  event: Omit<EventObjectType, "id" | "agreement">,
  responsible: EventResponsibleObjectType
): Omit<EventObjectType, "id"> {
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
  responsible: EventResponsibleObjectType
): DataPrivacyAgreementObjectType {
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
