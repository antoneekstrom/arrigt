import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { RegistrationService } from "../../../services/registration.service";
import { RegistrationObjectType } from "../types/Registration";
import { UserIdentityObjectType } from "../types/UserIdentity";

/**
 * Input type for the addRegistration mutation.
 */
@InputType()
export class UserIdentityInput implements UserIdentityObjectType {
  @Field()
  email!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  id?: string;
}

/**
 * Input type for the addRegistration mutation.
 */
@InputType()
export class AddRegistrationInput implements RegistrationObjectType {
  @Field()
  eventId!: string;

  @Field((type) => UserIdentityInput)
  userIdentity?: UserIdentityInput;
}

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
  @Query((returns) => [RegistrationObjectType])
  async registrations(@Arg("eventId") eventId: string) {
    return await this.registrationService.getRegistrationsByEventId(eventId);
  }

  /**
   * Adds a registration to the database.
   *
   * @param input the input data
   * @returns the input data
   */
  @Mutation((returns) => RegistrationObjectType)
  async addRegistration(
    @Arg("input")
    input: AddRegistrationInput
  ) {
    await this.registrationService.addRegistration(input);
    return input;
  }
}
