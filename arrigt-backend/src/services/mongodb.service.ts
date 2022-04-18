import { Collection, MongoClient } from "mongodb";
import { Service } from "typedi";

/**
 * Provides a MongoDB connection.
 */
@Service()
export class MongoDbService {
  constructor(private client = MongoDbService.createClient()) {}

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
    let result;
    try {
      await this.client.connect();
      const db = this.client.db("plupp");
      const collection = db.collection<T>(collectionName);
      result = await fn(collection);
    } finally {
      await this.client.close();
    }
    return result;
  }

  getClient() {
    return this.client;
  }
}
