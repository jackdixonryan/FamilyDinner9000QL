"use strict";

import { MongoClient } from "mongodb";
import buildQueries from "./queries";

async function connect() {
  console.log("Connecting to DB...")
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log("Connection to database successful!");
    const database = client.db("5e");
    // collection inits? 
    await database.collection("spells")
      .createIndex({
        "slug": 1
      }, {
        unique: true
      });
    console.log("Database successfully configured!");
    console.log("Building queries...")
    const queries = await buildQueries(database);
    console.log("Queries built!");
    return queries;
  } catch(error) {
    console.log("Error during Mongodb initialization! :", error);
  }
}

export default connect;