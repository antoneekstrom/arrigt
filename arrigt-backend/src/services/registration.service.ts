import { InsertOneResult } from "mongodb";
import { Service } from "typedi";
import { Registration } from "../model";
import { MongoDbService } from "./mongodb.service";

/**
 * Provides access to the registrations collection.
 */
@Service()
export class RegistrationService {
  constructor(private dbService: MongoDbService) {}

  async getAllRegistrations(): Promise<Registration[]> {
    return this.dbService.useCollection<Registration, Registration[]>(
      "registrations",
      async (collection) => {
        return await collection.find().toArray();
      }
    );
  }

  async getRegistrationsByEventId(eventId: string): Promise<Registration[]> {
    return this.dbService.useCollection<Registration, Registration[]>(
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
    return this.dbService.useCollection<
      Registration,
      InsertOneResult<Registration>
    >("registrations", async (collection) => {
      return await collection.insertOne(registration);
    });
  }
}
