import React from "react"; 
import { useState } from "react";
import TextField from '../components/muiTextfiled';
import Button from "../components/muiButton";
import "../style.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {DataBaseConstant} from "../constants";


const VolunteerRegistration = () => {
    const { t } = useTranslation();

        const [mobileNumber, setMobileNumber] = useState();
        const [fullName, setFullName] = useState();
        const [address, setAddress] = useState();
        const [uidNo, setUidNo] = useState();
        const recieptData = {
          name: fullName,
          mobileNumber: mobileNumber,
          address: address,
          uidNo: uidNo,
        };
    
    const handleFullName =(e)=>{
        setFullName(e.target.value);
    }
    
    const handleMobileNumber =(e)=>{
      const value = e.target.value.replace(/[^0-9]/g, "");
      if (value.length <= 10) {
        setMobileNumber(value);
      }
    }
    
    const handleAddress =(e)=>{
        setAddress(e.target.value);
    }
    
    const handleUidNo =(e)=>{
        const value = e.target.value.replace(/[^0-9]/g, "");
        setUidNo(value);
    }
    
    
    const handleCancle =()=>{
            setFullName("");
            setMobileNumber("");
            setAddress("");
        setUidNo("");
    
    }
    
    const handlePayNow =()=>{
        recieptData.name = fullName;
        recieptData.mobileNumber = mobileNumber;
        recieptData.address = address;
        recieptData.uidNo = uidNo;

        const data = {
          [DataBaseConstant.name]: fullName,
          [DataBaseConstant.mobileNumber]: mobileNumber,
          [DataBaseConstant.address]: address,
          [DataBaseConstant.uidNo]: uidNo,
        }
        console.log(data);
    
        // Logic for Database integration will be here
    }


    return(
        <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80 }}
        transition={{ duration: 0.4 }}
      >
        <div >
          <h1 className="headerTextSize centerDiv headerColor">
           {t("sevaBooking")}
          </h1>

            <div className="centerDiv">
<div className="donationFormContainer">
            <div className="headerColor">
                {t("allFieldsRequired")}
            </div>
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
                  <TextField
                    id="uidNo"
                    title={t("uidNo")}
                    label={t("uidNo")}
                    variant="outlined"
                    type="number"
                    value={uidNo}
                    onChange={handleUidNo}
                  ></TextField>
                </div>

                <div className="donationActions">
                  <Button
                  id="cancleButton"
                  onClick={handleCancle}
                  >{t("cancle")}</Button>
                  <Button
                  id="registerButton"
                  onClick={handlePayNow}
                  >{t("register")}</Button>
                </div>
            </div>

</div>

        </div>
      </motion.div>
    )
}

export default VolunteerRegistration;