const { MongoClient } = require("mongodb");

const mongoDbUri = process.env.MONGO_DB_URI;
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getMongoConnection = async () => {
    const client = new MongoClient(mongoDbUri, mongoOptions);
    await client.connect();
    const db = client.db(process.env.MONGO_DB)
    return ({ client, db })
}
module.exports = getMongoConnection;