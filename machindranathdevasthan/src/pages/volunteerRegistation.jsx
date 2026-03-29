import React from "react";
import { useState } from "react";
import TextField from '../components/muiTextfiled';
import Button from "../components/muiButton";
import "../style.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { DataBaseConstant } from "../constants";
import { submitVolunteer } from "../api/firebaseApi"
import { toast } from "react-toastify";
import LoaderOverlay from "../components/loaderOverlay";


const VolunteerRegistration = () => {
  const { t } = useTranslation();

  const [mobileNumber, setMobileNumber] = useState();
  const [fullName, setFullName] = useState();
  const [address, setAddress] = useState();
  const [uidNo, setUidNo] = useState();
  const [age, setAge] = useState();
  const [isLoading, setIsLoading] = useState(false);


  const handleFullName = (e) => {
    setFullName(e.target.value);
  }

  const handleMobileNumber = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 10) {
      setMobileNumber(value);
    }
  }

  const handleAddress = (e) => {
    setAddress(e.target.value);
  }

  const handleUidNo = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 12) {
      setUidNo(value);
    }
  }
  const handleAge = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 3) {
      setAge(value);
    }
  }


  const handleCancle = () => {
    setFullName("");
    setMobileNumber("");
    setAddress("");
    setUidNo("");
    setAge("");

  }



  const handlePayNow = async () => {

    /** validation */
    
if (!fullName || !mobileNumber || !address || !uidNo || !age) {
      toast.error(t("volunteerErrorToast2"))

      return;
    }
    if (mobileNumber.length !== 10) {
      toast.error(t("volunteerErrorToast3"))
      return;
    }
    if (uidNo.length !== 12) {
      toast.error(t("volunteerErrorToast4"))

      return;
    }
    if (age.length > 3) {
      return;
    }


    const data = {
      [DataBaseConstant.name]: fullName,
      [DataBaseConstant.mobileNumber]: mobileNumber,
      [DataBaseConstant.address]: address,
      [DataBaseConstant.uidNo]: uidNo,
      [DataBaseConstant.age]: age,
    }

    // Logic for Database integration
    try {
      setIsLoading(true);
      const responce = await submitVolunteer(data);
      if (responce.success) {
        toast.success(t("volunteerSuccessToast"));
      } else {
        toast.error(t("volunteerErrorToast1"))
      }
    } catch (e) {
      toast.error(t("volunteerErrorToast1"))
    }finally{
      setIsLoading(false);
    }

    handleCancle();




  }


  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.4 }}
    >
            <LoaderOverlay isLoading={isLoading} />
      
      <div>
        <h1 className="headerTextSize centerDiv headerColor">
          {t("sevaBooking")}
        </h1>

        <div className="centerDiv">
          <div className="donationFormContainer">
            <div className="formStatusText">{t("allFieldsRequired")}</div>
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
                id="ageField"
                title={t("age")}
                label={t("age")}
                variant="outlined"
                type="text"
                value={age}
                onChange={handleAge}
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
                type="text"
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
                type="text"
                value={uidNo}
                onChange={handleUidNo}
              ></TextField>
            </div>

            <div className="donationActions">
              <Button id="cancleButton" onClick={handleCancle}>
                {t("cancle")}
              </Button>
              <Button id="registerButton" onClick={handlePayNow}>
                {t("register")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default VolunteerRegistration;
