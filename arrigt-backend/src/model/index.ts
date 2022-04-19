import { GDPR } from "./privacypolicy";

/**
 * An event.
 */
export type Event = {
  id: string;
  name?: string;
  date?: Date;
};

/**
 * A registration to an event.
 */
export type Registration = {
  eventId: string;
  userData?: UserData;
  userIdentity?: UserIdentity;
};

/**
 * The credentials of a user who has registered to an event.
 */
export type UserIdentity = {
  email: string;
  name: string;
  nickname?: string;
  /**
   * Identifies the user across several registrations.
   */
  id?: string;
};

/**
 * The data of a user who has registered to a certain event.
 */
export type UserData = {
  mealPreferences?: MealPreference[];
  gdpr: GDPR;
};

/**
 * The preferences of a user for a certain event.
 */
export type MealPreference = {
  preference: string;
  type: PreferenceType;
};

/**
 * The type of a preference.
 */
export type PreferenceType = "alergic" | "dislike" | "prefer" | "neutral";
