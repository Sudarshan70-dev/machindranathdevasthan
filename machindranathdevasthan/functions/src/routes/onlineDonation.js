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

exports.addOnlineDonations = async (req, res)=>{
 console.log("request is in cf ---> ", req.body);
    const name = req.body?.[DataBaseConstant.name];
    const mobileNumber = req.body?.[DataBaseConstant.mobileNumber];
    const address = req.body?.[DataBaseConstant.address];
    const donationType = req.body?.[DataBaseConstant.donationType];
    const ammount = req.body?.[DataBaseConstant.ammount];
    const noOfStones = req.body?.[DataBaseConstant.noOfStones];
    const isForStone = req.body.isForStone || false;
   

    if (!name || !address || !ammount) {
        return res.status(400).json({ message: "Missing fields" });
    }
    if (mobileNumber && mobileNumber.length !== 10) {
        return res.status(400).json({ message: "Mobile number is invalid" });
    }
    if (!donationType) {
            return res.status(400).json({ message: "Donation type is missing." });
    }
        if(!ammount){
        return res.status(400).json({ message: "Amount is missing" });
        }


    if(isForStone && !noOfStones){
        return res.status(400).json({message: "Number of stones are missing."});
    }


    /** !!TODO payment gateway flow is to add here */
    /** !!TODO after payment success its transaction details must hav to be add in data to add in db */
    const data = {
        ...req.body,
        [DataBaseConstant.createDate]: timeStamp,
    };

    console.log("donation type is ----> ", donationType);
    try {
       
            await db.collection(CollectionName.cashlessDonation).add(data);
            res.status(200).json({
                success: true,
                message: "Cashless donation data save",
            });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

};
