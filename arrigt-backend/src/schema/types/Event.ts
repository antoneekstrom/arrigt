import { Field, ObjectType } from "type-graphql";
import { Event } from "../../model/types";
import { DataPrivacyAgreementObjectType } from "./DataPrivacyAgreement";
import { EventResponsibleObjectType } from "./EventResponsible";
import { RegistrationObjectType } from "./Registration";

@ObjectType()
export class EventObjectType implements Event {
  @Field()
  id!: string;

  @Field()
  title!: string;

  @Field((type) => [String])
  description!: string[];

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field()
  date!: Date;

  @Field((type) => EventResponsibleObjectType)
  responsible!: EventResponsibleObjectType;

  @Field((type) => DataPrivacyAgreementObjectType)
  agreement!: DataPrivacyAgreementObjectType;

  @Field((returns) => [RegistrationObjectType])
  registrations!: RegistrationObjectType;
}
