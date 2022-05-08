import { Field, ObjectType } from "type-graphql";

/**
 * A person or a group, such as a committee.
 */
@ObjectType()
export class Party {
  /**
   * Name of the party.
   */
  @Field()
  name!: string;

  /**
   * Contact email address.
   */
  @Field()
  email!: string;

  /**
   * The organization which the party is belongs to.
   */
  @Field({ nullable: true })
  organisation?: string;

  /**
   * Other contact information about the party.
   */
  @Field({ nullable: true })
  contactInformation?: string;
}
