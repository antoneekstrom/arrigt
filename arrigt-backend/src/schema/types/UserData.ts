import { Field, ObjectType } from "type-graphql";
import { MealPreference } from "./MealPreference";

/**
 * The data of a user who has registered to a certain event.
 */
@ObjectType()
export class UserData {
  @Field((type) => [MealPreference], { nullable: true })
  mealPreferences?: MealPreference[];
}
