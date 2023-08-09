const root = require('app-root-path');
const mongo = require(`${root}/services/mongo-crud`);
const mongoConnect = require(`${root}/services/mongo-connect`);

const authorize = async (req, res, next) => {
    const { db, client } = await mongoConnect();
    const { email, userId } = req.headers.user;
    try {
        const user = await mongo.fetchOne(db, 'person', { email, userId });
        if (!user) {
            await client.close();
            return res.status(403).send({ error: "Not Authorized", message: 'You are not authorized!' });
        };
        const { username } = user;
        req.headers.person = {
            userId,
            email,
            username,
        }
        next();
    } catch (err) {
        res.status(403).json({ error: "Not Authorized", message: err.message })
    } finally {
        await client.close();
    }
}
module.exports = authorize;