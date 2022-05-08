import { Field, InputType } from "type-graphql";
import { User } from "../types/User";
import {
  CollectedData,
  DataPrivacyAgreement,
  DataPrivacyConsent,
} from "../types/DataPrivacyAgreement";
import { Party } from "../types/Party";
import { Equals, ValidateNested } from "class-validator";
import { Event } from "../types/Event";

@InputType()
export class EventResponsibleInput {
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
export class AddEventInput implements Partial<Event> {
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
export class UpdateEventInput implements Partial<Event> {
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
export class PartyInput implements Party {
  @Field()
  name!: string;

  @Field()
  email!: string;
}

@InputType()
export class CollectedDataInput implements CollectedData {
  @Field()
  description!: string;

  @Field()
  usage!: string;
}

@InputType()
export class DataPrivacyAgreementInput implements DataPrivacyAgreement {
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
export class GdprInput implements Partial<DataPrivacyConsent> {
  @Field()
  @Equals(true, { message: "You must accept the data privacy agreement." })
  accepted!: boolean;
}

/**
 * Input type for the addRegistration mutation.
 */
@InputType()
export class UserInput implements User {
  @Field()
  email!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  nickname?: string;
}

/**
 * Input type for the addRegistration mutation.
 */
@InputType()
export class UserDataInput {
  @Field((type) => GdprInput)
  @ValidateNested()
  gdpr!: GdprInput;

  // mealPreferences?: MealPreferenceObjectType[];
}

/**
 * Input type for the addRegistration mutation.
 */
@InputType()
export class AddRegistrationInput {
  @Field()
  eventId!: string;

  @Field((type) => UserInput)
  user!: UserInput;

  @Field((type) => UserDataInput)
  @ValidateNested()
  userData!: UserDataInput;
}
