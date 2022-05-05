import { Field, ObjectType } from "type-graphql";
import { EventResponsible } from "../../../model";
import { PartyObjectType } from "./DataPrivacyAgreement";

@ObjectType()
export class EventResponsibleObjectType
  extends PartyObjectType
  implements EventResponsible
{
  @Field()
  iconUrl!: string;
}
