import { Field, ObjectType } from "type-graphql";
import { GDPRObjectType } from "./DataPrivacyAgreement";
import { MealPreferenceObjectType } from "./MealPreference";

/**
 * The data of a user who has registered to a certain event.
 */
@ObjectType()
export class UserDataObjectType {
  @Field((type) => [MealPreferenceObjectType], { nullable: true })
  mealPreferences?: MealPreferenceObjectType[];

  @Field((type) => GDPRObjectType)
  gdpr!: GDPRObjectType;
}
