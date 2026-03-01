const admin = require("firebase-admin");

// App is initialized in functions/index.js. Reuse that instance here.
const db = admin.firestore();
const auth = admin.auth();

module.exports = {admin, db, auth};
