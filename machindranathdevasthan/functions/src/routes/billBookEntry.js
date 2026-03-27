/* eslint-disable keyword-spacing */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable space-before-blocks */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
const firestore = require("../config/admin");
const { DataBaseConstant, CollectionName } = require("./constant");
const { FieldValue, Timestamp } = require("firebase-admin/firestore");
const logger = require("firebase-functions/logger");

const db = firestore.db;
const timeStamp = FieldValue.serverTimestamp();

const normalizeDate = (value) => {
  if (!value) {
    return null;
  }

  if (typeof value.toDate === "function") {
    const date = value.toDate();
    return Number.isNaN(date.getTime()) ? null : Timestamp.fromDate(date);
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : Timestamp.fromDate(value);
  }

  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : Timestamp.fromDate(date);
  }

  if (typeof value === "object" && typeof value.seconds === "number") {
    return new Timestamp(value.seconds, value.nanoseconds || 0);
  }

  return null;
};

exports.billBookEntry = async (req, res) => {
  logger.info("Incoming request", { body: req.body });

  const counterNo = req.body?.[DataBaseConstant.counterNo];
  const startDate = normalizeDate(req.body?.[DataBaseConstant.startDate]);
  const endDate = normalizeDate(req.body?.[DataBaseConstant.endDate]);
  const billBooksArr = req.body?.[DataBaseConstant.books];
  const totalAmt = req.body?.[DataBaseConstant.totalAmt];

  if (counterNo === "" || !startDate || !endDate || !totalAmt) {
    logger.warn("Missing required fields", {
      counterNo,
      startDate,
      endDate,
      totalAmt,
    });
    return res.status(400).json({ message: "Missing fields" });
  }

  if (!Array.isArray(billBooksArr) || billBooksArr.length === 0) {
    logger.warn("Bill book array is empty or invalid", {
      billBooksCount: Array.isArray(billBooksArr) ? billBooksArr.length : null,
    });
    return res.status(400).json({ message: "Bill Book Array is empty" });
  }

  const data = {
    ...req.body,
    [DataBaseConstant.startDate]: startDate,
    [DataBaseConstant.endDate]: endDate,
    [DataBaseConstant.createDate]: timeStamp,
  };


  try {
    logger.info("Saving bill book entry", {
      counterNo,
      totalAmt,
      billBooksCount: billBooksArr.length,
    });
    await db.collection(CollectionName.writtenBillBooks).add(data);
    logger.info("Bill book entry saved successfully", {
      counterNo,
    });
    return res.status(200).json({
      success: true,
      message: "bill book entry succesfully add.",
    });
  } catch (error) {
    logger.error("Error in billBookEntry", {
      error: error.message,
      stack: error.stack,
    });
    return res.status(500).json({ message: error.message });
  }
};
