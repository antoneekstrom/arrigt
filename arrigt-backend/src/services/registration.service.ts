import { InsertOneResult } from "mongodb";
import { Service } from "typedi";
import { RegistrationObjectType } from "../schema/types/Registration";
import { MongoDbService } from "./mongodb.service";

/**
 * Provides access to the registrations collection.
 */
@Service()
export class RegistrationService {
  constructor(private db: MongoDbService) {}

  async getAllRegistrations(): Promise<RegistrationObjectType[]> {
    return this.db.useCollection<
      RegistrationObjectType,
      RegistrationObjectType[]
    >("registrations", async (collection) => {
      return await collection.find().toArray();
    });
  }

  async getRegistrationsByEventId(
    eventId: string
  ): Promise<RegistrationObjectType[]> {
    return this.db.useCollection<
      RegistrationObjectType,
      RegistrationObjectType[]
    >("registrations", async (collection) => {
      return await collection
        .find({
          eventId: eventId,
        })
        .toArray();
    });
  }

  async addRegistration(registration: RegistrationObjectType) {
    return this.db.useCollection<
      RegistrationObjectType,
      InsertOneResult<RegistrationObjectType>
    >("registrations", async (collection) => {
      return await collection.insertOne(registration);
    });
  }
}
