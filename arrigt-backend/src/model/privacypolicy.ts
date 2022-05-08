/**
 *
 */
export type GDPR = {
  accepted: boolean;
  agreement: DataPrivacyAgreement;
};

/**
 * Agreement to the data privacy policy.
 */
export type DataPrivacyAgreement = {
  /**
   * Why the data is collected.
   */
  purpose: string;
  /**
   * The data that may be saved.
   */
  dataGathered: CollectedData[];
  /**
   * If statistics will be saved.
   */
  collectStatistics?: boolean;
  /**
   * Whom the data may be shared with.
   */
  sharedWith?: Party[];
  /**
   * The responsible party.
   */
  responsible: Party;
  /**
   * The date which the data will definitely be deleted.
   */
  lastDeletion: Date;
};

/**
 * A type of data which is collected.
 */
export type CollectedData = {
  description: string;
  usage: string;
};

/**
 * A party to whom the data may be shared.
 */
export type Party = {
  name: string;
  email: string;
  phone?: string;
  adress?: string;
};
