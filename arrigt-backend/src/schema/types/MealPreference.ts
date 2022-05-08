import { Field, InputType, ObjectType } from "type-graphql";
import { MealPreference, PreferenceType } from "../../model/types";

@ObjectType()
export class MealPreferenceObjectType implements MealPreference {
  @Field()
  preference!: string;

  @Field()
  type!: PreferenceType;
}
