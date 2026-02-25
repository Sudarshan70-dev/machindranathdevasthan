import React from "react";
import { useState } from "react";
import TextField from '../components/muiTextfiled';
import Button from "../components/muiButton";
import "../style.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import TempleVideo from "../assests/TempleVideo.mp4";
import MuiDropdown from "../components/muiDropdown";


const Donation = () => {
    const { t } = useTranslation();
    const [donationType, setDonationType] = useState();
    const [mobileNumber, setMobileNumber] = useState();
    const [fullName, setFullName] = useState();
    const [address, setAddress] = useState();
    const [ammount, setAmount] = useState();
    const recieptData = {
        name: fullName,
        mobileNumber: mobileNumber,
        address: address,
        donationType: donationType,
        ammount: ammount
    };

const handleFullName =(e)=>{
    setFullName(e.target.value);
}

const handleMobileNumber =(e)=>{
        const value = e.target.value.replace(/[^0-9]/g, "");
        if(value.length <= 10){
            setMobileNumber(value);
        }
}

const handleAddress =(e)=>{
    setAddress(e.target.value);
}

const handleAmount =(e)=>{
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
}

const handleTypesOfDonation =(e)=>{
    setDonationType(e.target.value);
}

const handleCancle =()=>{
        setFullName("");
        setMobileNumber("");
        setAddress("");
    setAmount("");
    setDonationType("");

}

const handlePayNow =()=>{
    recieptData.name = fullName;
    recieptData.mobileNumber = mobileNumber;
    recieptData.address = address;
    recieptData.donationType = donationType;
    recieptData.ammount = ammount;
    console.log(recieptData);

    // Logic for payment integration will be here
}

    return (
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="headerTextSize centerDiv headerColor">
            {t("donation")}
          </h1>
          <div>
            <div className="centerDiv">
              <video
                src={TempleVideo}
                controls
                loop
                autoPlay
                className="videoFrame"
              ></video>

              <div className="donationFormContainer">
                <div className="headerColor">{t("allFieldsRequired")}</div>
                <div className="inputField">
                  <TextField
                    id="fullName"
                    title={t("name")}
                    label={t("name")}
                    variant="outlined"
                    type="text"
                    value={fullName}
                    onChange={handleFullName}
                  ></TextField>
                </div>
                <div className="inputField">
                  <TextField
                    id="addressField"
                    title={t("addressField")}
                    label={t("addressField")}
                    variant="outlined"
                    type="text"
                    value={address}
                    onChange={handleAddress}
                  ></TextField>
                </div>
                <div className="inputField">
                  <TextField
                    id="mobileNumber"
                    title={t("mobile")}
                    label={t("mobile")}
                    variant="outlined"
                    type="number"
                    value={mobileNumber}
                    onChange={handleMobileNumber}
                  ></TextField>
                </div>
                <div className="inputField">
                  <MuiDropdown
                    id="typesOfDonation"
                    label={t("typesOfDonation")}
                    value={donationType}
                    handleChange={handleTypesOfDonation}
                    options={[
                      {
                        label: t("donationForMandir"),
                        value: t("donationForMandir"),
                      },
                      {
                        label: t("gowshalaDonation"),
                        value: t("gowshalaDonation"),
                      },
                      {
                        label: t("annadanDonation"),
                        value: t("annadanDonation"),
                      },
                    ]}
                  ></MuiDropdown>
                </div>
                <div className="inputField">
                  <TextField
                    id="amount"
                    title={t("amount")}
                    label={t("amount")}
                    variant="outlined"
                    type="number"
                    value={ammount}
                    onChange={handleAmount}
                  ></TextField>
                </div>

                <div className="donationActions">
                  <Button id="cancleButton" onClick={handleCancle}>
                    {t("cancle")}
                  </Button>
                  <Button id="payNowButton" onClick={handlePayNow}>
                    {t("payNow")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
}

export default Donation;
