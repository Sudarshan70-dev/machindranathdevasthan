import React from "react";
import { useState } from "react";
import TextField from '../components/muiTextfiled';
import Button from "../components/muiButton";
import "../style.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import TempleVideo from "../assests/TempleVideo.mp4";
import MuiDropdown from "../components/muiDropdown";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {ListOfStones,DataBaseConstant} from "../constants";

const DonationForStone = () => {
    const { t } = useTranslation();
    const stoneOptions = ListOfStones.map((stone) => ({
      value: stone.name,
      label: stone.name,
        amount: stone.amount
    }));
    const [donationType, setDonationType] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [ammount, setAmount] = useState(0);
    const [noOfStones, setNoOfStones] = useState(1);
    const [stoneAmount, setStoneAmount] = useState(0);
    const recieptData = {
        [DataBaseConstant.name]: fullName,
        [DataBaseConstant.mobileNumber]: mobileNumber,
        [DataBaseConstant.address]: address,
        [DataBaseConstant.donationType]: donationType,
        [DataBaseConstant.ammount]: ammount,
        [DataBaseConstant.noOfStones]: noOfStones
        
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


const handleTypesOfDonation =(e)=>{
    setDonationType(e.target.value);
    const selectedStone = stoneOptions.find((stone)=>stone.value === e.target.value);
    setStoneAmount(selectedStone.amount);
    setAmount(selectedStone.amount);
}

const handleCancle =()=>{
        setFullName("");
        setMobileNumber("");
        setAddress("");
    setAmount(0);
    setDonationType("");
    setNoOfStones(1);
}

const handlePayNow =()=>{
    recieptData.name = fullName;
    recieptData.mobileNumber = mobileNumber;
    recieptData.address = address;
    recieptData.donationType = donationType;
    recieptData.ammount = ammount;
    recieptData.noOfStones = noOfStones;

    // Logic for payment integration will be here
}

const handleAddStone =()=>{
    const stoneNo = noOfStones+1;
    setNoOfStones(stoneNo);
    setAmount(stoneAmount*stoneNo);
}

const handleRemoveStone =()=>{
    if(noOfStones>1){
        const stoneNo = noOfStones-1;
        setNoOfStones(stoneNo);
        setAmount(stoneAmount*stoneNo);
    }
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
            {t("stoneForMandir")}
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
                    options={stoneOptions}
                  ></MuiDropdown>
                </div>
                <div className="inputField centerDiv">
                  <RemoveCircleOutlineIcon onClick={handleRemoveStone} />

                  <TextField
                    id="noOfStone"
                    title={t("noOfStones")}
                    label={t("noOfStones")}
                    variant="outlined"
                    type="number"
                    value={noOfStones}
                    disabled
                  ></TextField>
                  <AddCircleOutlineIcon onClick={handleAddStone} />
                </div>

                <div className="inputField">
                  <TextField
                    id="amount"
                    title={t("amount")}
                    label={t("amount")}
                    variant="outlined"
                    type="number"
                    value={ammount}
                    disabled
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

export default DonationForStone;
