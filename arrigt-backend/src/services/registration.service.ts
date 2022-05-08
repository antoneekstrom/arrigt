import { InsertOneResult } from "mongodb";
import { Service } from "typedi";
import { Registration } from "../schema/types/Registration";
import { MongoDbService } from "./mongodb.service";

/**
 * Provides access to the registrations collection.
 */
@Service()
export class RegistrationService {
  constructor(private db: MongoDbService) {}

  async getAllRegistrations(): Promise<Registration[]> {
    return this.db.useCollection<Registration, Registration[]>(
      "registrations",
      async (collection) => {
        return await collection.find().toArray();
      }
    );
  }

  async getRegistrationsByEventId(eventId: string): Promise<Registration[]> {
    return this.db.useCollection<Registration, Registration[]>(
      "registrations",
      async (collection) => {
        return await collection
          .find({
            eventId: eventId,
          })
          .toArray();
      }
    );
  }

  async addRegistration(registration: Registration) {
    return this.db.useCollection<Registration, InsertOneResult<Registration>>(
      "registrations",
      async (collection) => {
        return await collection.insertOne(registration);
      }
    );
  }
}
