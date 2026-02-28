/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable keyword-spacing */
/* eslint-disable space-before-blocks */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
const firestore = require("../config/admin");
const { DataBaseConstant, CollectionName } = require("./constant");
// const admin = require("firebase-admin");
const { FieldValue } = require("firebase-admin/firestore");


const db = firestore.db;
const timeStamp = FieldValue.serverTimestamp();

exports.registerVolunteer = async (req, res) => {

    const name = req.body[DataBaseConstant.name];
    const mobileNumber = req.body[DataBaseConstant.mobileNumber];
    const address = req.body[DataBaseConstant.address];
    const uidNo = req.body[DataBaseConstant.uidNo];
    const age = req.body[DataBaseConstant.age];

    if (!name || !mobileNumber || !address || !uidNo || !age) {
        return res.status(400).json({ message: "Missing fields" });
    }
    if (mobileNumber.length !== 10) {
        return res.status(400).json({ message: "Mobile number is invalid" });
    }
    if (uidNo.length !== 12) {
        return res.status(400).json({ message: "Aadhar number is invalid" });
    }

    const data = {
        ...req.body,
        [DataBaseConstant.createDate]: timeStamp,
    };


    try {
        await db.collection(CollectionName.volunteers).add(data);
        res.status(200).json({ success: true, message: "Volunteer saved" });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

};
