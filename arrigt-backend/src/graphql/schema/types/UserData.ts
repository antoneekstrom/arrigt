import { Field, ObjectType } from "type-graphql";
import { UserData } from "../../../model";
import { GDPRObjectType } from "./DataPrivacyAgreement";
import { MealPreferenceObjectType } from "./MealPreference";

@ObjectType()
export class UserDataObjectType implements UserData {
  @Field((type) => [MealPreferenceObjectType], { nullable: true })
  mealPreferences?: MealPreferenceObjectType[];

  @Field((type) => GDPRObjectType)
  gdpr!: GDPRObjectType;
}
