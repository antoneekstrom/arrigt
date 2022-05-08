import { Field, ObjectType } from "type-graphql";
import { DataPrivacyAgreementObjectType } from "./DataPrivacyAgreement";
import { EventResponsibleObjectType } from "./EventResponsible";
import { RegistrationObjectType } from "./Registration";

/**
 * An event.
 */
@ObjectType()
export class EventObjectType {
  @Field()
  id!: string;

  @Field()
  title!: string;

  @Field((type) => [String])
  description!: string[];

  @Field({ nullable: true })
  location?: string;

  @Field()
  date!: Date;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field((type) => EventResponsibleObjectType)
  responsible!: EventResponsibleObjectType;

  @Field((type) => DataPrivacyAgreementObjectType)
  agreement!: DataPrivacyAgreementObjectType;

  @Field((returns) => [RegistrationObjectType])
  registrations?: RegistrationObjectType;
}
