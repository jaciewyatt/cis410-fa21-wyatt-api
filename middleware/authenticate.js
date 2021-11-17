const jwt = require("jsonwebtoken");
const wyattConfig = require("../config.js");
const db = require("../dbConnectExec.js");

const auth = async (req, res, next) => {
  //   console.log("in the middleware", req.header("Authorization"));
  //   next();

  try {
    //1. decode token

    let myToken = req.header("Authorization").replace("Bearer ", "");
    // console.log("token", myToken);

    let decoded = jwt.verify(myToken, wyattConfig.JWT);
    console.log(decoded);

    let contactPK = decoded.pk;

    //2. compare token with database
    let query = `SELECT ContactPK, NameFirst, NameLast, Email
    FROM Contact
    WHERE ContactPK=${contactPK} and Token = '${myToken}'`;

    let returnedUser = await db.executeQuery(query);
    console.log("returned user", returnedUser);

    //3. save user info in the request
    if (returnedUser[0]) {
      req.contact = returnedUser[0];
      next();
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    console.log(err);
    return res.status(401).send("invalid credentials");
  }
};

module.exports = auth;
