
// middleware function to require JWR with secret (of unknown provenance) in order to access resources. 
 
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

const authModule = (function createAuthModule() {
  try {
    "use strict";

    const createUser = async function(password, user, db) {
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log(err);
          return err;
        }
        user.hash = hash;
        await db.postOne("users", user);
        return true;
      });
    }

    const isCorrect = async function(password, hash) {
      const match = await bcrypt.compare(password, hash);
      return match;
    }

    return {
      // uses jwt package to determine if the token was signed with our secret. If it wasn't, you can f right off. 
      authenticateJWT: function authenticate(req, res, next) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
          const token = authHeader.split(" ")[1];
          jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
              return res.sendStatus(403)
            } else {
              req.user = user;
              next();
            }
          })
        } else {
          res.sendStatus(401);
        }
      },
      createToken: async function(req, res, next, db) {
        try {
          console.log("welcome to your nightmare")
          const { clientID, clientSecret } = req.body;
          // improperly formatted body
          if (!clientID || !clientSecret) {
            res.status(400)
              .send({
                message: "You endeavored to make a deception roll but you rolled a nat 1. Try again."
              })
          } else {
            // make a db call to get the user at client id. 
            const call = await db.getWhere("users", "clientID", clientID);
            const user = call[0];
            // grab their hashed pass
            const { hash } = user;
            // returns T / F
            const isAuthed = await isCorrect(clientSecret, hash);
            if (isAuthed === true) {
              // sign and generate the token with our secret;
              const accessToken = jwt.sign({
                username: clientID,
                role: "admin",
              }, process.env.SECRET);
              res.json({ accessToken });
              console.log("You're in")
            } else {
              res.status(401)
                .send({
                  message: "You endeavored to make a deception roll, and you rolled a 10. That ain't gonna cut it."
                })
            }
          }
        } catch(error) {
          console.log(error)
          res.sendStatus(500)
        }
      },
      register: async function(req, res, next, db) {
        try {
          const { body } = req;
          const { clientID, clientSecret } = body; 
          const newUser = {
            clientID: clientID,
            roles: ["readonly"]
          }
          // make a db call to create a new user
          await createUser(clientSecret, newUser, db)
          res.status(201).send({
            message: "Registered."
          });
        } catch (error) {
          console.log(error);
          res.sendStatus(error)
        }
      }
    }
  } catch(error) {
    console.log(error)
  }
})();

export default authModule;