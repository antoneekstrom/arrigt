import { Field, ObjectType } from "type-graphql";

/**
 * A party to whom the data may be shared.
 */
@ObjectType()
export class PartyObjectType {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field({ nullable: true })
  organisation?: string;

  @Field({ nullable: true })
  contactInformation?: string;
}
