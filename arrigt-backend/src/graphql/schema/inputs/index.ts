import { Field, InputType } from "type-graphql";
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
import { EventObjectType } from "../types/Event";
import { EventResponsibleObjectType } from "../types/EventResponsible";

@InputType()
export class EventResponsibleInput implements EventResponsibleObjectType {
  @Field()
  iconUrl!: string;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field({ nullable: true })
  organisation?: string;

  @Field({ nullable: true })
  contactInformation?: string;
}

@InputType()
export class AddEventInput implements Partial<EventObjectType> {
  @Field()
  title!: string;

  @Field((type) => [String])
  description!: string[];

  @Field({ nullable: true })
  imageUrl?: string;

  @Field()
  date!: Date;

  @Field()
  responsible!: EventResponsibleInput;

  @Field({ nullable: true })
  location?: string;
}

@InputType()
export class UpdateEventInput implements Partial<EventObjectType> {
  @Field({ nullable: true })
  title!: string;

  @Field((type) => [String], { nullable: true })
  description!: string[];

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  date!: Date;

  @Field({ nullable: true })
  responsible!: EventResponsibleInput;

  @Field({ nullable: true })
  location?: string;
}

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

  @Field((type) => [PartyInput], { nullable: true })
  sharedWith?: PartyInput[];
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
