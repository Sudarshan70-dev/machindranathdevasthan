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

const db = firestore.db;
const timeStamp = FieldValue.serverTimestamp();

exports.addCashItemDonation = async (req, res) => {

    console.log("request is in cf ---> ", req.body);
    const name = req.body[DataBaseConstant.name];
    const mobileNumber = req.body[DataBaseConstant.mobileNumber];
    const address = req.body[DataBaseConstant.address];
    const donationType = req.body[DataBaseConstant.donationType];
    const ammount = req.body[DataBaseConstant.ammount];
    const itemName = req.body[DataBaseConstant.itemName];
    const itemQty = req.body[DataBaseConstant.itemQty];

    if (!name || !address || !donationType) {
        return res.status(400).json({ message: "Missing fields" });
    }
    if (mobileNumber && mobileNumber.length !== 10) {
        return res.status(400).json({ message: "Mobile number is invalid" });
    }
    if (donationType === "Items Donation") {
        if(!itemName || !itemQty){
            return res.status(400).json({ message: "Add Item name or Item Quntity" });
        }
    }else{
        if(!ammount){
        return res.status(400).json({ message: "Add amount" });
        }
    }

    const data = {
        ...req.body,
        [DataBaseConstant.createDate]: timeStamp,
    };

    console.log("donation type is ----> ", donationType);
    try {
        if(donationType === "Items Donation"){
            await db.collection(CollectionName.itemDonation).add(data);
            res.status(200).json({ 
                success: true, 
                message: "Item donation data save",
            });
        }else{
            await db.collection(CollectionName.cashDonation).add(data);
            res.status(200).json({
                success: true,
                message: "Cash donation data save",
            });
        }

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

};

