import { Field, ObjectType } from "type-graphql";
import { DataPrivacyAgreement } from "./DataPrivacyAgreement";
import { EventResponsible } from "./EventResponsible";
import { Registration } from "./Registration";

/**
 * An event.
 */
@ObjectType()
export class Event {
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

  @Field((type) => EventResponsible)
  responsible!: EventResponsible;

  @Field((type) => DataPrivacyAgreement)
  agreement!: DataPrivacyAgreement;

  @Field((returns) => [Registration])
  registrations?: Registration;
}
