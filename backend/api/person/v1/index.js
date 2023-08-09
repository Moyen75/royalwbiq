const router = require("express").Router();
const root = require("app-root-path");

const mongo = require(`${root}/services/mongo-crud`);
const mongoConnect = require(`${root}/services/mongo-connect`);

const authRoute = require(`${root}/middleware/authenticate`);
const authorize = require(`${root}/middleware/authorize`);

getPersonData = async (req, res, next) => {
  const { db, client } = await mongoConnect();
  try {
    const text = req.query;
    const query = [
      {
        $match: text
      },
      {
        $lookup: {
          from: 'avatars',
          localField: 'uid',
          foreignField: 'userId',
          as: 'avatar'
        }
      },
      { $unwind: { path: '$avatar' } }
    ]
    const person = await mongo.fetchWithAggregation(db, "person", query, { "avatar._id": 0 });
    res.status(200).json({ success: true, person: person[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    await client.close();
  }
};

setPersonData = async (req, res, next) => {
  const { db, client } = await mongoConnect();
  try {
    const person = await mongo.updateOne(db, "person", { uid: req.body.uid }, req.body);
    res.status(200).json({ success: true, person });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    await client.close();
  }
};
updatePersonData = async (req, res, next) => {
  const { db, client } = await mongoConnect();
  try {
    const person = await mongo.updateData(
      db,
      "person",
      {
        uid: req.params.uid,
      },
      {
        $set: {
          ...req.body,
          updatedAt: Date.now(),
        },
      }
    );
    res.status(200).json({ success: true, person });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    await client.close();
  }
};
addIntegration = async (req, res, next) => {
  const { db, client } = await mongoConnect();
  try {
    const integration = await mongo.updateOneArray(db, "person", { uid: req.body.userId }, { integrations: req.body });
    res.status(200).json({ success: !!integration, integration });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    await client.close();
  }
}
router.get("/person", getPersonData);
router.put("/person/:uid", authRoute, updatePersonData);
router.post("/person", setPersonData);
router.post("/person/integrations", authRoute, addIntegration);


module.exports = router;
