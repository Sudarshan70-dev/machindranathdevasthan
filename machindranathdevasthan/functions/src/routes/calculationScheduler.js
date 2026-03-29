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
const analyticsCollectionRef = db.collection(CollectionName.analytics);
const analyticsSummaryRef = analyticsCollectionRef.doc(
  CollectionName.lastRunDocId,
);
// const timeStamp = FieldValue.serverTimestamp();

const aggregateDailyAnalyticsHandler = async () => {
  logger.info("Starting aggregateDailyAnalyticsHandler");

  try {
    const metaRef = analyticsCollectionRef.doc(CollectionName.lastRunDocId);
    const metaDoc = await metaRef.get();

    const lastProcessedAt = metaDoc.exists ? metaDoc.data().lastProcessedAt : null;
    logger.info("lastProcessedAt is ----> ", lastProcessedAt);

    /** ------------ cash flow ---------------- */
    let cashDonationDocs = db
      .collection(CollectionName.cashDonation)
      .orderBy(DataBaseConstant.createDate);

    if (lastProcessedAt) {
      cashDonationDocs = cashDonationDocs.where(
        DataBaseConstant.createDate,
        ">",
        lastProcessedAt,
      );
    }

    const cashDonationDocsSnapshot = await cashDonationDocs.get();


    if (cashDonationDocsSnapshot.empty) {
      logger.info("No new cash donation transactions found");
    }

    /** ------------------------  cashless flow ------------------- */
    let cashlessDonationDocs = db
      .collection(CollectionName.cashlessDonation)
      .orderBy(DataBaseConstant.createDate);

    if (lastProcessedAt) {
      cashlessDonationDocs = cashlessDonationDocs.where(
        DataBaseConstant.createDate,
        ">",
        lastProcessedAt,
      );
    }

    const cashlessDonationDocsSnapshot = await cashlessDonationDocs.get();

    if (cashlessDonationDocsSnapshot.empty) {
      logger.info("No new cashless donation transactions found");
    }
    if (cashDonationDocsSnapshot.empty && cashlessDonationDocsSnapshot.empty) {
      logger.info("No new donation transactions found");
      return null;
    }

    const batch = db.batch();
    let latestTimestamp = lastProcessedAt;
    let processedTransactions = 0;
    let skippedTransactions = 0;

    cashDonationDocsSnapshot.forEach((doc) => {
      const data = doc.data();
      const amount = data?.[DataBaseConstant.ammount];
      const createdAt = data?.[DataBaseConstant.createDate];
      const numericAmount = Number(amount);

      if (!createdAt || typeof createdAt.toDate !== "function") {
        skippedTransactions += 1;
        logger.warn("Skipping donation without valid created_date", {
          donationId: doc.id,
        });
        return;
      }

      if (Number.isNaN(numericAmount)) {
        skippedTransactions += 1;
        logger.warn("Skipping donation with invalid amount", {
          donationId: doc.id,
          amount,
        });
        if (
          !latestTimestamp ||
          createdAt.toMillis() > latestTimestamp.toMillis()
        ) {
          latestTimestamp = createdAt;
        }
        return;
      }

      const date = createdAt.toDate();

      const dayKey = date.toISOString().split("T")[0];
      const monthKey = dayKey.substring(0, 7);


      const dailyRef = analyticsSummaryRef
        .collection(CollectionName.daily)
        .doc(dayKey);
      const monthlyRef = analyticsSummaryRef
        .collection(CollectionName.monthly)
        .doc(monthKey);

      batch.set(
        dailyRef,
        {
          [DataBaseConstant.totalCashAmt]: FieldValue.increment(numericAmount),
          [DataBaseConstant.totalCashTransaction]: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );

      batch.set(
        monthlyRef,
        {
          [DataBaseConstant.totalCashAmt]: FieldValue.increment(numericAmount),
          [DataBaseConstant.totalCashTransaction]: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );

      processedTransactions += 1;

      if (
        !latestTimestamp ||
        createdAt.toMillis() > latestTimestamp.toMillis()
      ) {
        latestTimestamp = createdAt;
      }
    });
    cashlessDonationDocsSnapshot.forEach((doc) => {
      const data = doc.data();
      const amount = data?.[DataBaseConstant.ammount];
      const createdAt = data?.[DataBaseConstant.createDate];
      const numericAmount = Number(amount);

      if (!createdAt || typeof createdAt.toDate !== "function") {
        skippedTransactions += 1;
        logger.warn("Skipping donation without valid created_date", {
          donationId: doc.id,
        });
        return;
      }

      if (Number.isNaN(numericAmount)) {
        skippedTransactions += 1;
        logger.warn("Skipping donation with invalid amount", {
          donationId: doc.id,
          amount,
        });
        if (
          !latestTimestamp ||
          createdAt.toMillis() > latestTimestamp.toMillis()
        ) {
          latestTimestamp = createdAt;
        }
        return;
      }

      const date = createdAt.toDate();

      const dayKey = date.toISOString().split("T")[0];
      const monthKey = dayKey.substring(0, 7);

      const dailyRef = analyticsSummaryRef
        .collection(CollectionName.daily)
        .doc(dayKey);
      const monthlyRef = analyticsSummaryRef
        .collection(CollectionName.monthly)
        .doc(monthKey);

      batch.set(
        dailyRef,
        {
          [DataBaseConstant.totalCashlessAmt]:
            FieldValue.increment(numericAmount),
          [DataBaseConstant.totalCashlessTransaction]: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );

      batch.set(
        monthlyRef,
        {
          [DataBaseConstant.totalCashlessAmt]:
            FieldValue.increment(numericAmount),
          [DataBaseConstant.totalCashlessTransaction]: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );

      processedTransactions += 1;

      if (
        !latestTimestamp ||
        createdAt.toMillis() > latestTimestamp.toMillis()
      ) {
        latestTimestamp = createdAt;
      }
    });

    await batch.commit();

    await metaRef.set({
      lastProcessedAt: latestTimestamp,
    });

    logger.info("Analytics updated successfully", {
      processedTransactions,
      skippedTransactions,
    });

    return null;
  } catch (error) {
    logger.error("Error in aggregateDailyAnalyticsHandler", {
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
};

module.exports = {
  aggregateDailyAnalyticsHandler,
};
