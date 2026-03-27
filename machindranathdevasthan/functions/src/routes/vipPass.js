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
const timeStamp = FieldValue.serverTimestamp();

exports.vipPassCreation = async (req, res) => {
  logger.info("Incoming request", { body: req.body });
  const name = req.body?.[DataBaseConstant.name];
  const mobileNumber = req.body?.[DataBaseConstant.mobileNumber];
  const address = req.body?.[DataBaseConstant.address];
  const age = req.body?.[DataBaseConstant.age];

  if (!name || !address || !mobileNumber || !age) {
    logger.warn("Missing required fields", {
      name,
      address,
      mobileNumber,
      age,
    });
    return res.status(400).json({ message: "Missing fields" });
  }
  if (mobileNumber.length !== 10) {
    logger.warn("Invalid mobile number", { mobileNumber });
    return res.status(400).json({ message: "Mobile number is invalid" });
  }

  /** !TODO payment integration will be here */

  /** pass data add into db */
  const data = {
    ...req.body,
    [DataBaseConstant.createDate]: timeStamp,
  };

  try {
    logger.info("Saving VIP pass request", {
      mobileNumber,
      age,
    });
    await db.collection(CollectionName.vipPass).add(data);
    logger.info("VIP pass created successfully");
    return res.status(200).json({
      success: true,
      message: "vip pass create successfully",
    });
  } catch (error) {
    logger.error("Error in vipPassCreation", {
      error: error.message,
      stack: error.stack,
    });
    return res.status(400).json({ message: error.message });
  }
};
