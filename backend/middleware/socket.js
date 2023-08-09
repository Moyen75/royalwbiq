const root = require("app-root-path");
const admin = require("./initialize");
const mongoConnect = require(`${root}/services/mongo-connect`);
const mongo = require(`${root}/services/mongo-crud`);

module.exports = {
    async authenticate(socket, next) {
        const { client, db } = await mongoConnect();
        try {
            const token = socket.handshake.auth.token.split(" ")[1];
            const decodedUser = await admin.auth().verifyIdToken(token);
            const email = decodedUser.email
            const userId = decodedUser.uid;
            if (!email) {
                next(new Error("No email found in decoded user"));
            } else if (!userId) {
                next(new Error("No userId found in decoded user"));
            }
            const user = await mongo.fetchOne(db, 'person', { email, uid: userId });
            if (!user) {
                next(new Error("No user found"));
            } else {
                next();
            };
        } catch (error) {
            next(error);
        } finally {
            await client.close();
        }

    }
}