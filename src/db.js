import { MongoClient } from "mongodb";

let db;

async function connectToDb(callback){
    const Client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.hu6brjy.mongodb.net/`);
    await Client.connect();
    db = Client.db('ink-link-db');
    callback();
}

export {
    db,
    connectToDb,
}