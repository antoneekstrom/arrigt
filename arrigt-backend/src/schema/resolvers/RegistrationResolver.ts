import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { RegistrationService } from "../../services/registration.service";
import { Registration } from "../types/Registration";
import { AddRegistrationInput } from "../inputs";
import { EventService } from "../../services/event.service";

/**
 *
 * Resolves the registration object type.
 */
@Service()
@Resolver((of) => Registration)
export class RegistrationResolver {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly eventService: EventService
  ) {}

  /**
   * Returns all registrations for the given event.
   *
   * @param eventId id of the event
   * @returns the registrations
   */
  @Query((returns) => [Registration], {
    description: "Returns all registrations for the given event.",
  })
  async registrations(@Arg("eventId") eventId: string) {
    return await this.registrationService.getRegistrationsByEventId(eventId);
  }

  /**
   * Adds a registration to the database.
   *
   * @param input the input data
   * @returns the input data
   */
  @Mutation((returns) => Registration, {
    description: "Adds a registration to the database.",
  })
  async addRegistration(
    @Arg("input")
    input: AddRegistrationInput
  ) {
    const event = await this.eventService.getEvent(input.eventId);

    if (!event) {
      throw new Error(`Event with id ${input.eventId} does not exist.`);
    }

    await this.registrationService.addRegistration({
      ...input,
      gdpr: {
        agreement: event.agreement,
        accepted: input.userData.gdpr.accepted,
      },
      userData: {},
    });
    return input;
  }
}
