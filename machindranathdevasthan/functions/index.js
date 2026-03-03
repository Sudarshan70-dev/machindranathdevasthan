/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { setGlobalOptions } = require("firebase-functions");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const { registerVolunteer } = require("./src/routes/volunteer");
const { addCashItemDonation } = require("./src/routes/donations");
const { vipPassCreation } = require("./src/routes/vipPass");
if (!admin.apps.length) {
  admin.initializeApp();
}

exports.registerVolunteer = functions
  .region("asia-south1")
  .https.onRequest((req, res) => {
    cors(req, res, async () => {
      if (req.method === "OPTIONS") {
        return res.status(200).send("");
      }

      if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
      }

      return registerVolunteer(req, res);
    });
  });

exports.addCashItemDonation = functions
  .region("asia-south1")
  .https.onRequest((req, res) => {
    cors(req, res, async () => {
      if (req.method === "OPTIONS") {
        return res.status(200).send("");
      }

      if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
      }

      return addCashItemDonation(req, res);
    });
  });

exports.vipPassCreation = functions
  .region("asia-south1")
  .https.onRequest((req, res) => {
    cors(req, res, async () => {
      if (req.method === "OPTIONS") {
        return res.status(200).send("");
      }

      if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
      }

      return vipPassCreation(req, res);
    });
  });
