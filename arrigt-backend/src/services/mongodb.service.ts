import { Collection, MongoClient } from "mongodb";
import { Service } from "typedi";

/**
 * Provides a MongoDB connection.
 */
@Service()
export class MongoDbService {
  constructor(private client = MongoDbService.createClient()) {
    client.connect();
  }

  static getUri() {
    return "mongodb://plupp:plupp@db:27017";
  }

  static createClient() {
    return new MongoClient(this.getUri());
  }

  async useCollection<T, R>(
    collectionName: string,
    fn: (collection: Collection<T>) => Promise<R>
  ) {
    const db = this.client.db("plupp");
    const collection = db.collection<T>(collectionName);
    return await fn(collection);
  }

  getClient() {
    return this.client;
  }
}
