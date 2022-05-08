import { Field, ObjectType } from "type-graphql";
import { Party } from "./Party";

/**
 * A type of data which is collected.
 */
@ObjectType()
export class CollectedData {
  @Field()
  description!: string;

  @Field()
  usage!: string;
}

/**
 * Agreement to the data privacy policy.
 */
@ObjectType()
export class DataPrivacyAgreement {
  /**
   * Why the data is collected.
   */
  @Field()
  purpose!: string;

  /**
   * The data that may be saved.
   */
  @Field((type) => [CollectedData])
  dataGathered!: CollectedData[];

  /**
   * If statistics will be saved.
   */
  @Field({ nullable: true })
  collectStatistics?: boolean;

  /**
   * Whom the data may be shared with.
   */
  @Field((type) => [Party], { nullable: true })
  sharedWith?: Party[];

  /**
   * The responsible party.
   */
  @Field((type) => Party)
  responsible!: Party;

  /**
   * The date which the data will definitely be deleted.
   */
  @Field()
  lastDeletion!: Date;
}

@ObjectType()
export class DataPrivacyConsent {
  @Field()
  accepted!: boolean;

  @Field((type) => DataPrivacyAgreement)
  agreement!: DataPrivacyAgreement;
}
