import { Field, ObjectType } from "type-graphql";
import { MealPreference, UserData } from "../../../model";
import { MealPreferenceObjectType } from "./MealPreference";

@ObjectType()
export class UserDataObjectType implements UserData {
  
  @Field((type) => [MealPreferenceObjectType])
  mealPreferences!: MealPreference[];
  
  @Field()
  gdpr!: boolean;
}
