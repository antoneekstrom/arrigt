import {
  Arg,
  FieldResolver,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { Service } from "typedi";
import {
  applyDefaultEventDetails,
  mapRegistrationsToEvents,
} from "../../model/events";
import { EventService } from "../../services/event.service";
import { RegistrationService } from "../../services/registration.service";
import { AddEventInput, UpdateEventInput } from "../inputs";
import { Event } from "../types/Event";
import { Registration } from "../types/Registration";

type EventChangedPayload = {
  event: Event;
  id: string;
};

/**
 * Resolves the event object type.
 */
@Service()
@Resolver((of) => Event)
export class EventResolver {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly eventService: EventService
  ) {}

  @Subscription((type) => Event, {
    topics: "eventChanged",
    filter: ({ payload, args }) => payload.id === args.id,
  })
  async eventChanged(
    @Root() payload: EventChangedPayload,
    @Arg("id") _: string
  ) {
    return payload.event;
  }

  @Subscription((type) => Event, {
    topics: "eventAdded",
  })
  async eventAdded(@Root() payload: Event) {
    return payload;
  }

  /**
   * Updates an event.
   *
   * @param id the id of the event to update
   * @param input the input to update the event with
   */
  @Mutation((event) => Event)
  async updateEvent(
    @Arg("id") id: string,
    @Arg("input") input: UpdateEventInput,
    @PubSub() pubSub: PubSubEngine
  ) {
    await this.eventService.updateEvent(
      id,
      Object.fromEntries(
        Object.entries(input).filter(([, value]) => value !== undefined)
      )
    );
    await pubSub.publish("eventChanged", { event: await this.event(id), id });
    return await this.eventService.getEvent(id);
  }

  /**
   * Adds an event to the database.
   *
   * @returns the event that was added
   */
  @Mutation((event) => Event, {
    description: "Adds an event to the database.",
  })
  async addEvent(
    @Arg("input") input: AddEventInput,
    @PubSub() pubSub: PubSubEngine
  ) {
    const event = applyDefaultEventDetails(input, input.responsible);
    const result = await this.eventService.addEvent(event);
    const eventWithId = { ...event, id: result.insertedId.toString() };
    await pubSub.publish("eventAdded", eventWithId);
    return eventWithId;
  }

  /**
   *
   * @param id
   * @returns
   */
  @Query((of) => Event)
  async event(@Arg("id") id: string) {
    return await this.eventService.getEvent(id);
  }

  /**
   * Returns a list of all events.
   *
   * Finds all events which there are registrations for.
   *
   * @returns the events
   */
  @Query((returns) => [Event], {
    description: "Returns all events which there are registrations for.",
  })
  async events() {
    return await this.eventService.getEvents();
  }

  /**
   * Returns a list of all events.
   *
   * Finds all events which there are registrations for.
   *
   * @returns the events
   */
  @Query((returns) => [Event], {
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
  @FieldResolver((returns) => [Registration], {
    description: "Returns all registrations for the given event.",
  })
  async registrations(@Root() event: Event) {
    return await this.registrationService.getRegistrationsByEventId(event.id);
  }
}
