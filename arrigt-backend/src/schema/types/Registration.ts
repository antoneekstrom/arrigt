import { Field, ObjectType } from "type-graphql";
import { DataPrivacyConsent } from "./DataPrivacyAgreement";
import { UserData } from "./UserData";
import { User } from "./User";

/**
 * A registration to an event.
 */
@ObjectType()
export class Registration {
  /**
   * Unique identifier of the registration.
   */
  @Field()
  eventId!: string;

  /**
   * Consent to the data privacy agreement.
   */
  @Field((type) => DataPrivacyConsent)
  gdpr!: DataPrivacyConsent;

  /**
   * The data of the user who has registered to the event.
   */
  @Field((type) => UserData, { nullable: true })
  userData?: UserData;

  /**
   * The identity of the user who has registered to the event.
   */
  @Field((type) => User, { nullable: true })
  user?: User;
}
