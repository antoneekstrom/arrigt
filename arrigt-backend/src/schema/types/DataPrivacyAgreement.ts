import { Field, ObjectType } from "type-graphql";
import { PartyObjectType } from "./Party";

/**
 * A type of data which is collected.
 */
@ObjectType()
export class CollectedDataObjectType {
  @Field()
  description!: string;

  @Field()
  usage!: string;
}

/**
 * Agreement to the data privacy policy.
 */
@ObjectType()
export class DataPrivacyAgreementObjectType {
  /**
   * Why the data is collected.
   */
  @Field()
  purpose!: string;

  /**
   * The data that may be saved.
   */
  @Field((type) => [CollectedDataObjectType])
  dataGathered!: CollectedDataObjectType[];

  /**
   * If statistics will be saved.
   */
  @Field({ nullable: true })
  collectStatistics?: boolean;

  /**
   * Whom the data may be shared with.
   */
  @Field((type) => [PartyObjectType], { nullable: true })
  sharedWith?: PartyObjectType[];

  /**
   * The responsible party.
   */
  @Field((type) => PartyObjectType)
  responsible!: PartyObjectType;

  /**
   * The date which the data will definitely be deleted.
   */
  @Field()
  lastDeletion!: Date;
}

@ObjectType()
export class GDPRObjectType {
  @Field()
  accepted!: boolean;

  @Field((type) => DataPrivacyAgreementObjectType)
  agreement!: DataPrivacyAgreementObjectType;
}
