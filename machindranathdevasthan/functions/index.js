/* eslint-disable comma-dangle */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */

const { onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { setGlobalOptions } = require("firebase-functions/v2");
const logger = require("firebase-functions/logger");

const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

const { registerVolunteer } = require("./src/routes/volunteer");
const { addCashItemDonation } = require("./src/routes/donations");
const { vipPassCreation } = require("./src/routes/vipPass");
const { billBookEntry } = require("./src/routes/billBookEntry");
const { addOnlineDonations } = require("./src/routes/onlineDonation");
const {
  aggregateDailyAnalyticsHandler,
} = require("./src/routes/calculationScheduler");

if (!admin.apps.length) {
  admin.initializeApp();
}

// ✅ Global config (v2 only)
setGlobalOptions({
  region: "asia-south1",
  maxInstances: 10,
});


// ------------------ COMMON HANDLER ------------------
const handleRequest = (handler, functionName) => async (req, res) => {
  cors(req, res, async () => {
    if (req.method === "OPTIONS") {
      logger.info("Handled CORS preflight request", { functionName });
      return res.status(200).send("");
    }

    if (req.method !== "POST") {
      logger.warn("Method not allowed", {
        functionName,
        method: req.method,
      });
      return res.status(405).json({ message: "Method not allowed" });
    }

    try {
      await handler(req, res);
    } catch (error) {
      logger.error("Unhandled error in request handler", {
        functionName,
        error: error.message,
        stack: error.stack,
      });
      return res.status(500).json({ message: "Internal server error" });
    }
  });
};


// ------------------ API FUNCTIONS ------------------

exports.registerVolunteer = onRequest(
  handleRequest(registerVolunteer, "registerVolunteer")
);

exports.addCashItemDonation = onRequest(
  handleRequest(addCashItemDonation, "addCashItemDonation")
);

exports.vipPassCreation = onRequest(
  handleRequest(vipPassCreation, "vipPassCreation")
);

exports.billBookEntry = onRequest(
  handleRequest(billBookEntry, "billBookEntry")
);

exports.addOnlineDonations = onRequest(
  handleRequest(addOnlineDonations, "addOnlineDonations")
);


// ------------------ CRON JOB ------------------

exports.aggregateDailyAnalytics = onSchedule(
  {
    schedule: "5 0 * * *",
    timeZone: "Asia/Kolkata",
  },
  async () => {
    logger.info("Scheduled analytics job triggered");
    await aggregateDailyAnalyticsHandler();
    logger.info("Scheduled analytics job completed");
  }
);


// ------------------ MANUAL TRIGGER (LOCAL TEST) ------------------

exports.runAnalyticsLocally = onRequest(async (req, res) => {
  try {
    logger.info("Manual analytics trigger invoked", {
      method: req.method,
    });
    await aggregateDailyAnalyticsHandler();
    logger.info("Manual analytics trigger completed successfully");
    res.send("✅ Analytics executed manually");
  } catch (error) {
    logger.error("Error running analytics manually", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).send("❌ Error running analytics");
  }
});
