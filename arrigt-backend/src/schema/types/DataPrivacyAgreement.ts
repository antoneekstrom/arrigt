import { Field, ObjectType } from "type-graphql";
import {
  Party,
  CollectedData,
  DataPrivacyAgreement,
  GDPR,
} from "../../model/privacypolicy";

@ObjectType()
export class PartyObjectType implements Party {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field({ nullable: true })
  organisation?: string;

  @Field({ nullable: true })
  contactInformation?: string;
}

@ObjectType()
export class CollectedDataObjectType implements CollectedData {
  @Field()
  description!: string;

  @Field()
  usage!: string;
}

@ObjectType()
export class DataPrivacyAgreementObjectType implements DataPrivacyAgreement {
  @Field()
  purpose!: string;

  @Field({ nullable: true })
  collectStatistics?: boolean;

  @Field((type) => [CollectedDataObjectType])
  dataGathered!: CollectedDataObjectType[];

  @Field((type) => [PartyObjectType], { nullable: true })
  sharedWith?: PartyObjectType[];

  @Field((type) => PartyObjectType)
  responsible!: PartyObjectType;

  @Field()
  lastDeletion!: Date;
}

@ObjectType()
export class GDPRObjectType implements GDPR {
  @Field()
  accepted!: boolean;

  @Field((type) => DataPrivacyAgreementObjectType)
  agreement!: DataPrivacyAgreementObjectType;
}
