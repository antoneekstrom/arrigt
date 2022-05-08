import { Field, ObjectType } from "type-graphql";

export type MealPreferenceType = "allergic" | "prefers" | "dislikes";

/**
 * Meal preferences of a user for an event.
 */
@ObjectType()
export class MealPreferenceObjectType {
  /**
   * What the preference is for.
   */
  @Field()
  preference!: string;

  /**
   * The type of the preference.
   */
  @Field()
  type!: MealPreferenceType;
}
