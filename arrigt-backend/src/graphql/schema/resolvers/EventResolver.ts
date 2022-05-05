import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import {
  applyDefaultEventDetails,
  mapRegistrationsToEvents,
} from "../../../model/events";
import { EventService } from "../../../services/event.service";
import { RegistrationService } from "../../../services/registration.service";
import { AddEventInput, UpdateEventInput } from "../inputs";
import { EventObjectType } from "../types/Event";
import { RegistrationObjectType } from "../types/Registration";

/**
 * Resolves the event object type.
 */
@Service()
@Resolver((of) => EventObjectType)
export class EventResolver {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly eventService: EventService
  ) {}

  /**
   * Updates an event.
   *
   * @param id the id of the event to update
   * @param input the input to update the event with
   */
  @Mutation((event) => EventObjectType)
  async updateEvent(
    @Arg("id") id: string,
    @Arg("input") input: UpdateEventInput
  ) {
    await this.eventService.updateEvent(
      id,
      Object.fromEntries(
        Object.entries(input).filter(([, value]) => value !== undefined)
      )
    );
    return await this.eventService.getEvent(id);
  }

  /**
   * Adds an event to the database.
   *
   * @returns the event that was added
   */
  @Mutation((event) => EventObjectType, {
    description: "Adds an event to the database.",
  })
  async addEvent(@Arg("input") input: AddEventInput) {
    const event = applyDefaultEventDetails(input, input.responsible);
    const result = await this.eventService.addEvent(event);
    return { ...event, id: result.insertedId.toString() };
  }

  /**
   *
   * @param id
   * @returns
   */
  @Query((of) => EventObjectType)
  async event(@Arg("id") id: string) {
    // timeout to simulate a slow query
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return await this.eventService.getEvent(id);
  }

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return await this.eventService.getEvents();
  }

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
  async eventsFromRegistrations() {
    const result = await this.registrationService.getAllRegistrations();
    return mapRegistrationsToEvents(result);
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
