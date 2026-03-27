/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable keyword-spacing */
/* eslint-disable space-before-blocks */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
const firestore = require("../config/admin");
const { DataBaseConstant, CollectionName } = require("./constant");
const { FieldValue } = require("firebase-admin/firestore");
const logger = require("firebase-functions/logger");

const db = firestore.db;

exports.addOnlineDonations = async (req, res) => {
  logger.info("Incoming request", { body: req.body });

  try {
    const name = req.body?.[DataBaseConstant.name];
    const mobileNumber = req.body?.[DataBaseConstant.mobileNumber];
    const address = req.body?.[DataBaseConstant.address];
    const donationType = req.body?.[DataBaseConstant.donationType];
    const amount = req.body?.[DataBaseConstant.ammount];
    const noOfStones = req.body?.[DataBaseConstant.noOfStones];
    const isForStone = req.body.isForStone || false;

    // ---------------- VALIDATIONS ----------------

    if (!name || !address || !amount) {
      logger.warn("Missing required fields", { name, address, amount });
      return res.status(400).json({ message: "Missing fields" });
    }

    if (mobileNumber && mobileNumber.length !== 10) {
      logger.warn("Invalid mobile number", { mobileNumber });
      return res.status(400).json({ message: "Mobile number is invalid" });
    }

    if (!donationType) {
      logger.warn("Donation type missing");
      return res.status(400).json({ message: "Donation type is missing." });
    }

    if (isForStone && !noOfStones) {
      logger.warn("Missing number of stones");
      return res.status(400).json({ message: "Number of stones are missing." });
    }

    // ---------------- DATA ----------------

    const data = {
      ...req.body,
      [DataBaseConstant.createDate]: FieldValue.serverTimestamp(),
    };

    logger.info("Saving donation", {
      donationType,
      amount,
      isForStone,
    });

    // ---------------- DB ----------------

    await db.collection(CollectionName.cashlessDonation).add(data);

    logger.info("Donation saved successfully");

    return res.status(200).json({
      success: true,
      message: "Cashless donation data saved",
    });

  } catch (error) {
    logger.error("Error in addOnlineDonations", {
      error: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
