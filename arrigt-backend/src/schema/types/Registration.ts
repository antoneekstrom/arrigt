import { Field, ObjectType } from "type-graphql";
import { UserDataObjectType } from "./UserData";
import { UserIdentityObjectType } from "./UserIdentity";

/**
 * A registration to an event.
 */
@ObjectType()
export class RegistrationObjectType {
  /**
   * Unique identifier of the registration.
   */
  @Field()
  eventId!: string;

  /**
   * The data of the user who has registered to the event.
   */
  @Field((type) => UserDataObjectType, { nullable: true })
  userData?: UserDataObjectType;

  /**
   * The identity of the user who has registered to the event.
   */
  @Field((type) => UserIdentityObjectType, { nullable: true })
  userIdentity?: UserIdentityObjectType;
}
