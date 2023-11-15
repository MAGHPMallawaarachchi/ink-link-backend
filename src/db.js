import { MongoClient } from "mongodb";

let db;

async function connectToDb(callback){
    const Client = new MongoClient('mongodb://127.0.0.1:27017');
    await Client.connect();
    db = Client.db('ink-link-db');
    callback();
}

export {
    db,
    connectToDb,
}