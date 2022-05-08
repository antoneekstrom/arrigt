import { InsertOneResult, ObjectId, UpdateResult, WithId } from "mongodb";
import { Service } from "typedi";
import { EventObjectType } from "../schema/types/Event";
import { MongoDbService } from "./mongodb.service";

@Service()
export class EventService {
  constructor(private db: MongoDbService) {}

  async updateEvent(id: string, event: Partial<EventObjectType>) {
    return this.db.useCollection<Omit<EventObjectType, "id">, UpdateResult>(
      "events",
      async (collection) => {
        return collection.updateOne({ _id: new ObjectId(id) }, [
          {
            $addFields: event,
          },
        ]);
      }
    );
  }

  async getEvent(id: string) {
    return this.db.useCollection<
      Omit<EventObjectType, "id">,
      EventObjectType | null
    >("events", async (collection) => {
      const event = await collection.findOne({ _id: new ObjectId(id) });
      return event && this.replaceId(event);
    });
  }

  async addEvent(event: Omit<EventObjectType, "id">) {
    return this.db.useCollection<
      Omit<EventObjectType, "id">,
      InsertOneResult<EventObjectType>
    >("events", (collection) => {
      return collection.insertOne(event);
    });
  }

  async getEvents() {
    return this.db.useCollection<
      Omit<EventObjectType, "id">,
      EventObjectType[]
    >("events", async (collection) => {
      return (await collection.find().toArray()).map<EventObjectType>(
        this.replaceId
      );
    });
  }

  private replaceId(
    event: WithId<Omit<EventObjectType, "id">>
  ): EventObjectType {
    return { ...event, id: event._id.toString() };
  }
}
