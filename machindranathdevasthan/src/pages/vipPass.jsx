import React, { useState, useEffect } from "react";
import TextField from "../components/muiTextfiled";
import Button from "../components/muiButton";
import "../style.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CollectionName, DataBaseConstant, DonationType } from "../constants";
import { getDocFromId, getLastDocumentFromDb } from "../firebase/dbFunctions";
import { vipPassCreation } from "../api/firebaseApi";
import { toast } from "react-toastify";
import LoaderOverlay from "../components/loaderOverlay";
import DonationReceipt from "../components/reciept";


const VipPass = () => {
  const { t } = useTranslation();

  const [passAmount, setPassAmount] = useState(DataBaseConstant.vipPassAmt);
  // 🔥 Dynamic Members State
  const [mobileNumber, setMobileNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState(0);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [receiptData, setReceiptData] = useState();
  const [vipPassStartDate , setVipPassStartDate] = useState(null);
  const [vipPassEndDate, setVipPassEndDate] = useState(null);

  useEffect(() => {
    /**This will be remove after payment gateway intigreat */
    alert(t("commingSoon1"));

    async function fetchData() {
      await getVipPassAmtAndDate()
    }
    fetchData();
  }, []);


  /** get vip pass amount and date from db */
  const getVipPassAmtAndDate = async () =>{
    const vipPassStartDetails =  await getDocFromId(CollectionName.eventManage,CollectionName.vipPassDateDocId);
   
    setVipPassStartDate(vipPassStartDetails?.[DataBaseConstant.startDate].toDate().toLocaleString())
    setVipPassEndDate(vipPassStartDetails?.[DataBaseConstant.endDate].toDate().toLocaleString())
    setPassAmount(vipPassStartDetails?.[DataBaseConstant.vipPassAmount]);
  }


  // 🔥 Handle Input Change

  const handleNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

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
  const handleRegister = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      const lastReceiptData = await getLastDocumentFromDb(
        CollectionName.vipPass,
      );

      const receiptNo = lastReceiptData && lastReceiptData[DataBaseConstant.receiptNo]
        ? lastReceiptData[DataBaseConstant.receiptNo] + 1
        : 1;
      const passData = {
        [DataBaseConstant.name]: fullName,
        [DataBaseConstant.mobileNumber]: mobileNumber,
        [DataBaseConstant.address]: address,
        [DataBaseConstant.age]: age,
        [DataBaseConstant.receiptNo]: receiptNo,
        [DataBaseConstant.donationType]: DonationType.vipPass,
        
      };

      const responce = await vipPassCreation(passData);
      if (responce.success) {
        toast.success(t("passRegisterToast"));
        const dataForReciept = {
          ...passData,
          [DataBaseConstant.vipPassAmount]:passAmount,
          [DataBaseConstant.startDate] : vipPassStartDate,
          [DataBaseConstant.endDate] : vipPassEndDate
        }
        setReceiptData(dataForReciept)
      } else {
        toast.error(t("passRegisterErrToast"));
      }
      
      console.log("Final Data:", passData);
    } catch (error) {
      toast.error(t("passRegisterErrToast"));
      console.error("error in vipPass creation-->", error);
    } finally {
      setIsLoading(false);
    }


    // alert(t("commingSoon1"));

    // handleCancel();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.4 }}
    >
      <LoaderOverlay isLoading={isLoading} />

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
        {receiptData && <DonationReceipt data={receiptData} />}

      </div>
    </motion.div>
  );
};

export default VipPass;
