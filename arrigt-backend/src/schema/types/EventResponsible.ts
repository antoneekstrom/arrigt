import { Field, ObjectType } from "type-graphql";
import { PartyObjectType } from "./Party";

@ObjectType()
export class EventResponsibleObjectType extends PartyObjectType {
  @Field()
  iconUrl!: string;
}
