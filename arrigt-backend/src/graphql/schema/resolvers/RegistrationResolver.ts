import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { RegistrationService } from "../../../services/registration.service";
import { RegistrationObjectType } from "../types/Registration";
import { AddRegistrationInput } from "../inputs";

/**
 *
 * Resolves the registration object type.
 */
@Service()
@Resolver((of) => RegistrationObjectType)
export class RegistrationResolver {
  constructor(private readonly registrationService: RegistrationService) {}

  /**
   * Returns all registrations for the given event.
   *
   * @param eventId id of the event
   * @returns the registrations
   */
  @Query((returns) => [RegistrationObjectType], {
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
  @Mutation((returns) => RegistrationObjectType, {
    description: "Adds a registration to the database.",
  })
  async addRegistration(
    @Arg("input")
    input: AddRegistrationInput
  ) {
    await this.registrationService.addRegistration(input);
    return input;
  }
}
