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

exports.addCashItemDonation = async (req, res) => {
    logger.info("Incoming request", { body: req.body });

    const name = req.body?.[DataBaseConstant.name];
    const mobileNumber = req.body?.[DataBaseConstant.mobileNumber];
    const address = req.body?.[DataBaseConstant.address];
    const donationType = req.body?.[DataBaseConstant.donationType];
    const ammount = req.body?.[DataBaseConstant.ammount];
    const itemName = req.body?.[DataBaseConstant.itemName];
    const itemQty = req.body?.[DataBaseConstant.itemQty];

    if (!name || !address || !donationType) {
        logger.warn("Missing required fields", {
            name,
            address,
            donationType,
        });
        return res.status(400).json({ message: "Missing fields" });
    }
    if (mobileNumber && mobileNumber.length !== 10) {
        logger.warn("Invalid mobile number", { mobileNumber });
        return res.status(400).json({ message: "Mobile number is invalid" });
    }
    if (donationType === "Items Donation") {
        if(!itemName || !itemQty){
            logger.warn("Missing item donation details", {
                itemName,
                itemQty,
            });
            return res.status(400).json({ message: "Add Item name or Item Quntity" });
        }
    }else{
        if(!ammount){
            logger.warn("Missing cash donation amount");
            return res.status(400).json({ message: "Add amount" });
        }
    }

    const data = {
        ...req.body,
        [DataBaseConstant.createDate]: timeStamp,
    };

    try {
        logger.info("Saving donation", {
            donationType,
            ammount,
            itemName,
            itemQty,
        });

        if(donationType === "Items Donation"){
            await db.collection(CollectionName.itemDonation).add(data);
            logger.info("Item donation saved successfully");
            return res.status(200).json({
                success: true, 
                message: "Item donation data save",
            });
        }else{
            await db.collection(CollectionName.cashDonation).add(data);
            logger.info("Cash donation saved successfully");
            return res.status(200).json({
                success: true,
                message: "Cash donation data save",
            });
        }

    } catch (error) {
        logger.error("Error in addCashItemDonation", {
            error: error.message,
            stack: error.stack,
        });
        return res.status(400).json({ message: error.message });
    }

};
