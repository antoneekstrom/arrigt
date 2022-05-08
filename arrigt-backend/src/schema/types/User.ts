import { Field, ObjectType } from "type-graphql";

/**
 * A user who has registered to an event.
 */
@ObjectType()
export class User {
  /**
   * Identifies the user across several registrations.
   */
  @Field({ nullable: true })
  id?: string;

  @Field()
  email!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  nickname?: string;
}
