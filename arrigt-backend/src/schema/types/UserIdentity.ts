import { Field, ObjectType } from "type-graphql";

/**
 * The credentials of a user who has registered to an event.
 */
@ObjectType()
export class UserIdentityObjectType {
  @Field()
  email!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  nickname?: string;

  /**
   * Identifies the user across several registrations.
   */
  @Field({ nullable: true })
  id?: string;
}
