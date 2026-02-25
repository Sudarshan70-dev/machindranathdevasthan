import React, { useState } from "react";
import TextField from "../components/muiTextfiled";
import Button from "../components/muiButton";
import "../style.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { DataBaseConstant } from "../constants";

const VipPass = () => {
  const { t } = useTranslation();

  const [passAmount, setPassAmount] = useState(DataBaseConstant.vipPassAmt);
  // 🔥 Dynamic Members State
 const [mobileNumber, setMobileNumber] = useState("");
     const [fullName, setFullName] = useState("");
     const [address, setAddress] = useState("");
     const [age, setAge] = useState(0);
  const [errors, setErrors] = useState({});

  // 🔥 Handle Input Change
 
  const handleNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  }

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 10) {
      setMobileNumber(value);
    }
  };

  const handleAgeChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 3) {
      setAge(parseInt(value) || 0);
    }
  };

  

  // 🔥 Reset
  const handleCancel = () => {
   setFullName("");
    setMobileNumber("");
    setAddress("");
    setAge(0);
    setPassAmount(DataBaseConstant.vipPassAmt);

    setErrors({});
  };

  // 🔥 Validation
  const validate = () => {
    let newErrors = {};

    if (!fullName) newErrors[`name`] = "Name required";
    if (!address) newErrors[`address`] = "Address required";
    if (mobileNumber.length !== 10)
      newErrors[`mobile`] = "Valid 10 digit mobile required";
    if (!age) newErrors[`age`] = "Age required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔥 Submit
  const handleRegister = () => {
    if (!validate()) return;

    const receiptData = {
      receiptId: Date.now(),
       [DataBaseConstant.name]: fullName,
                [DataBaseConstant.mobileNumber]: mobileNumber,
                [DataBaseConstant.address]: address,
                [DataBaseConstant.age]: age,
    };

    console.log("Final Data:", receiptData);

    /*
        Example Firebase structure:

        {
          receiptId: 123456,
          totalMembers: 2,
          members: [...]
        }
    */

    // 👉 Call your database function here

    alert("VIP Pass Registered Successfully!");

    handleCancel();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h1 className="headerTextSize centerDiv headerColor">{t("vipPass")}</h1>

        <div className="centerDiv">
          <div className="donationFormContainer">
            <div className="inputField">
              <TextField
                label={t("name")}
                value={fullName}
                onChange={handleNameChange}
                error={!!errors[`name`]}
              />
            </div>

            <div className="inputField">
              <TextField
                label={t("addressField")}
                value={address}
                onChange={handleAddressChange}
                error={!!errors[`address`]}
              />
            </div>

            <div className="inputField">
              <TextField
                label={t("mobile")}
                value={mobileNumber}
                onChange={handleMobileChange}
                error={!!errors[`mobile`]}
              />
            </div>

            <div className="inputField">
              <TextField
                label={t("age")}
                value={age}
                onChange={handleAgeChange}
                error={!!errors[`age`]}
              />
            </div>

            <div className="donationActions">
              <Button onClick={handleCancel}>{t("cancle")}</Button>
              <Button onClick={handleRegister}>
                {t("payNow")} - ₹{passAmount}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VipPass;