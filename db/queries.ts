"use strict";
import { ObjectID } from "mongodb";

async function buildQueries(database) {
  return {
    async getOne(collection, id){
      try {

        const request = await database
          .collection(collection)
          .findOne({ "_id": ObjectID(id)});
        
        return request;
        
      } catch (error) {
        return error;
      }
    },
    async getWhere(collection, field, value) {
      try {
        const query = {};
        query[field] = value;

        const request = await database
          .collection(collection)
          .find(query)
          .sort({ class: 1, level : 1 })
          .toArray();

        return request;
        
      } catch (error) {
        return error;
      }
    },
    async getWhereClassAndLevel(collection, value, int) {
      try {
        const request = await database 
          .collection(collection)
          .find({
            classes: value,
            level: { $lte: int }
          })
          .sort({ level : 1 })
          .toArray();

        return request;
        
      } catch (error) {
        return error;
      }
    },
    async getQuery(collection, query) {
      try {
        const request = await database 
          .collection(collection)
          .find(query)
          .sort({ class: 1, level : 1 })
          .toArray();

        return request;
        
      } catch (error) {
        return error;
      }
    },
    async getMany(collection) {
      try {

        const request = await database 
          .collection(collection)
          .find({})
          .toArray();

        return request;
        
      } catch (error) {
        return error;
      }
    },
    async postOne(collection, content){
      try {

        const request = await database
          .collection(collection)
          .insertOne(content);

        return { ...content, id: request.insertedId};
        
      } catch (error) {
        return error;
      }
    },
    // posts an array to the mongodb instance. Content must be an array. 
    async postMany(collection, content) {
      try {

        const request = await database
          .collection(collection)
          .insertMany(content);

        return content.length;
        
      } catch (error) {
        return error;
      }
    }, 
    async updateOne(collection, id, content){
      try {
        const request = await database 
          .collection(collection)
          .findOneAndUpdate(
            {"_id": ObjectID(id)},
            {$set: content},
            {
              // enables us to return the updated doc
              returnOriginal: false
            }
          );
        return request.value;
        
      } catch (error) {
        return error;
      }
    },
    async deleteOne(collection, id){
      try {

        const request = await database
          .collection(collection)
          .findOneAndDelete(
            {"_id": ObjectID(id)},
            {
              returnOriginal: true
            }
          );
        
        return request;
        
      } catch (error) {
        return error;
      }
    }, 
    // async deleteMany(collection) {},
    async flushall(collection) {
      // easy there tiger
      // for here there be monsters
      if (process.env.ENVIRONMENT === "sandbox") {
        const request = await database
          .collection(collection)
          .deleteMany({});

        return request;
      } else {
        return `cannot flushall collection when not connected to sandbox environment.`
      }
    }
  }
}

export default buildQueries;
