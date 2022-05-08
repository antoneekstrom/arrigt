import { Field, ObjectType } from "type-graphql";
import { Party } from "./Party";

/**
 * A party which is responsible for an event.
 */
@ObjectType()
export class EventResponsible extends Party {
  /**
   * An icon representing the party.
   */
  @Field()
  iconUrl!: string;
}
