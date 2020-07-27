
// middleware function to require JWR with secret (of unknown provenance) in order to access resources. 
 
import * as jwt from "jsonwebtoken";

const authModule = (function createAuthModule() {
  try {
  "use strict";

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
    createToken: function(req, res, next) {
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
          // properly formatted & correct credentials
          if (clientID === process.env.CLIENT_ID && clientSecret === process.env.CLIENT_SECRET) {
            // sign and generate the token with our secret;
            const accessToken = jwt.sign({
              username: clientID,
              role: "admin",
            }, process.env.SECRET);
            res.json({ accessToken });
            console.log("You're in")
          } else {
            console.log('whoops')
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
    }
  }
} catch(error) {
  console.log(error)
}
})();

export default authModule;