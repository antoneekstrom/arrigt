import { FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { RegistrationService } from "../../../services/registration.service";
import { EventObjectType } from "../types/Event";
import { RegistrationObjectType } from "../types/Registration";

/**
 * Resolves the event object type.
 */
@Service()
@Resolver((of) => EventObjectType)
export class EventResolver {
  constructor(private readonly registrationService: RegistrationService) {}

  /**
   * Returns a list of all events.
   *
   * Finds all events which there are registrations for.
   *
   * @returns the events
   */
  @Query((returns) => [EventObjectType], {
    description: "Returns all events which there are registrations for.",
  })
  async events() {
    const result = await this.registrationService.getAllRegistrations();

    // Add eventIds from the registrations to a set, to remove duplicates
    const eventIds = new Set(result.map(({ eventId }) => eventId));

    // Map the ids to event object types
    const events: Partial<EventObjectType>[] = [...eventIds].map((id) => ({
      id,
    }));

    return events;
  }

  /**
   * Resolves the registrations field for the event object type.
   *
   * Returns all registrations for the given event.
   *
   * @param event the given event
   * @returns the registrations
   */
  @FieldResolver((returns) => [RegistrationObjectType], {
    description: "Returns all registrations for the given event.",
  })
  async registrations(@Root() event: EventObjectType) {
    return await this.registrationService.getRegistrationsByEventId(event.id);
  }
}
