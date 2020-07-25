"use strict";
import connect from "./db/connect";
import serve from "./server/index";

(async function begin() {
  try {
    console.log("Welcome to the 5e GraphQL server!");
    console.log("Booting up...");
    const db = await connect();
    if (db) { 
      const server = await serve(db);
    } else {
      console.log("the FD9000 API Must connect to a database before initializing.");
    }
  } catch (error) {
    console.log("Gargantuan Error duing bootup:", error);
  }
})();
