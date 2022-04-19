import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { RegistrationService } from "../../../services/registration.service";
import { RegistrationObjectType } from "../types/Registration";
import { UserIdentityObjectType } from "../types/UserIdentity";
import { UserDataObjectType } from "../types/UserData";
import {
  CollectedDataObjectType,
  DataPrivacyAgreementObjectType,
  GDPRObjectType,
  PartyObjectType,
} from "../types/DataPrivacyAgreement";
import { MealPreferenceObjectType } from "../types/MealPreference";
import { Equals, ValidateNested } from "class-validator";

@InputType()
export class PartyInput implements PartyObjectType {
  @Field()
  name!: string;

  @Field()
  email!: string;
}

@InputType()
export class CollectedDataInput implements CollectedDataObjectType {
  @Field()
  description!: string;

  @Field()
  usage!: string;
}

@InputType()
export class DataPrivacyAgreementInput
  implements DataPrivacyAgreementObjectType
{
  @Field()
  purpose!: string;

  @Field((type) => [CollectedDataInput])
  dataGathered!: CollectedDataInput[];

  @Field((type) => PartyInput)
  responsible!: PartyInput;

  @Field()
  lastDeletion!: Date;
}

@InputType()
export class GdprInput implements GDPRObjectType {
  @Field()
  @Equals(true, { message: "You must accept the data privacy agreement" })
  accepted!: boolean;

  @Field((type) => DataPrivacyAgreementInput)
  @ValidateNested()
  agreement!: DataPrivacyAgreementInput;
}

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
export class UserDataInput implements UserDataObjectType {
  mealPreferences?: MealPreferenceObjectType[];

  @Field((type) => GdprInput)
  @ValidateNested()
  gdpr!: GdprInput;
}

/**
 * Input type for the addRegistration mutation.
 */
@InputType()
export class AddRegistrationInput implements RegistrationObjectType {
  @Field()
  eventId!: string;

  @Field((type) => UserIdentityInput)
  userIdentity!: UserIdentityInput;

  @Field((type) => UserDataInput, { nullable: true })
  @ValidateNested()
  userData?: UserDataInput;
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
