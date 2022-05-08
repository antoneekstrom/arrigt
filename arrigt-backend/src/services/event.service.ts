import { InsertOneResult, ObjectId, UpdateResult, WithId } from "mongodb";
import { Service } from "typedi";
import { Event } from "../model/types";
import { MongoDbService } from "./mongodb.service";

@Service()
export class EventService {
  constructor(private db: MongoDbService) {}

  async updateEvent(id: string, event: Partial<Event>) {
    return this.db.useCollection<Omit<Event, "id">, UpdateResult>(
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
    return this.db.useCollection<Omit<Event, "id">, Event | null>(
      "events",
      async (collection) => {
        const event = await collection.findOne({ _id: new ObjectId(id) });
        return event && this.replaceId(event);
      }
    );
  }

  async addEvent(event: Omit<Event, "id">) {
    return this.db.useCollection<Omit<Event, "id">, InsertOneResult<Event>>(
      "events",
      (collection) => {
        return collection.insertOne(event);
      }
    );
  }

  async getEvents() {
    return this.db.useCollection<Omit<Event, "id">, Event[]>(
      "events",
      async (collection) => {
        return (await collection.find().toArray()).map<Event>(this.replaceId);
      }
    );
  }

  private replaceId(event: WithId<Omit<Event, "id">>): Event {
    return { ...event, id: event._id.toString() };
  }
}
