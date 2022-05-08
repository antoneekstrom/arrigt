import { Field, ObjectType } from "type-graphql";
import { Registration, UserIdentity } from "../../model/types";
import { UserDataObjectType } from "./UserData";
import { UserIdentityObjectType } from "./UserIdentity";

@ObjectType()
export class RegistrationObjectType implements Registration {
  @Field()
  eventId!: string;

  @Field((type) => UserDataObjectType, { nullable: true })
  userData?: UserDataObjectType;

  @Field((type) => UserIdentityObjectType, { nullable: true })
  userIdentity?: UserIdentity;
}
