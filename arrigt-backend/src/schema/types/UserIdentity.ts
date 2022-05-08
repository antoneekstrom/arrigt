import { Field, ObjectType } from "type-graphql";
import { UserIdentity } from "../../model/types";

@ObjectType()
export class UserIdentityObjectType implements UserIdentity {
  @Field()
  email!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  id?: string;
}
