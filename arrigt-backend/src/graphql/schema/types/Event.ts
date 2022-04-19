import { Field, ObjectType } from "type-graphql";
import { Event } from "../../../model";
import { RegistrationObjectType } from "./Registration";

@ObjectType()
export class EventObjectType implements Event {
  @Field()
  id!: string;

  @Field((returns) => [RegistrationObjectType])
  registrations!: RegistrationObjectType;
}
