const admin = require("./initialize");

const authRoute = async (req, res, next) => {
  if (req.headers?.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      // verify user token
      const decodedUser = await admin.auth().verifyIdToken(token);
      const email = decodedUser.email
      const userId = decodedUser.uid
      if (!email) {
        throw new Error("No email found in decoded user");
      } if (!userId) {
        throw new Error("No userId found in decoded user");
      }
      req.headers.user = {
        email,
        userId
      }
      next();
    } catch (err) {
      return res.status(403).send({ error: "Not Authorized", message: err.message });
    }
  } else {
    return res.status(401).send({
      error: "Not Authorized",
      message: "No auth header found"
    });
  }
};
module.exports = authRoute;
