import React from "react";
import { useState, useEffect } from "react";
import TextField from "../components/muiTextfiled";
import Button from "../components/muiButton";
import "../style.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import TempleVideo from "../assests/TempleVideo.mp4";
import MuiDropdown from "../components/muiDropdown";
import { addOnlineDonations } from "../api/firebaseApi";
import { toast } from "react-toastify";
import DonationReceipt from "../components/reciept";
import LoaderOverlay from "../components/loaderOverlay";
import { getLastDocumentFromDb } from "../firebase/dbFunctions";
import { CollectionName, DataBaseConstant, DonationType } from "../constants";

const Donation = () => {
  const { t } = useTranslation();
  const [donationType, setDonationType] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [fullName, setFullName] = useState();
  const [address, setAddress] = useState();
  const [ammount, setAmount] = useState();
  const [receiptData, setReceiptData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  /**this will be remove after payment gateway intigration */
  useEffect(() => {
    alert(t("commingSoon1"));
  }, []);

  const handleFullName = (e) => {
    setFullName(e.target.value);
  };

  const handleMobileNumber = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 10) {
      setMobileNumber(value);
    }
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleAmount = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      setAmount(parseInt(value));
    } else {
      setAmount(0);
    }
  };

  const handleTypesOfDonation = (e) => {
    setDonationType(e.target.value);
  };

  const handleCancle = () => {
    setFullName("");
    setMobileNumber("");
    setAddress("");
    setAmount(0);
    setDonationType(DonationType.donationForMandir);
  };

 const handlePayNow = async () => {
     /**handle validation */
 
     setIsLoading(true);
     /** validation */
 
     if (!fullName || !address || !donationType) {
       toast.error(t("volunteerErrorToast2"));
       setIsLoading(false);
 
       return;
     }
     if (mobileNumber && mobileNumber.length !== 10) {
       toast.error(t("volunteerErrorToast3"));
       setIsLoading(false);
 
       return;
     }
     if (!donationType) {
       toast.error(t("paymentErrorItemName"));
       setIsLoading(false);
 
       return;
     }
 
     if (!ammount) {
       toast.error(t("paymentErrorAmount"));
       setIsLoading(false);
 
       return;
     }
 
     // alert(t("commingSoon1"));
 
     // Logic for payment integration will be here
     try {
       const lastReceiptData = await getLastDocumentFromDb(
         CollectionName.cashlessDonation,
       );
 
       const receiptNo = lastReceiptData[DataBaseConstant.receiptNo]
         ? lastReceiptData[DataBaseConstant.receiptNo] + 1
         : 1;
 
       const recieptData = {
         [DataBaseConstant.name]: fullName,
         [DataBaseConstant.mobileNumber]: mobileNumber,
         [DataBaseConstant.address]: address,
         [DataBaseConstant.donationType]: donationType,
         [DataBaseConstant.ammount]: ammount,
         [DataBaseConstant.receiptNo]: receiptNo,
       };
 
       const responce = await addOnlineDonations(recieptData);
       if (responce.success) {
         toast.success(t("paymentSuccessToast"));
         setReceiptData(recieptData);
       } else {
         toast.error(t("paymentErrorToast1"));
       }
     } catch (error) {
       console.error(error);
     } finally {
       setIsLoading(false);
     }
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
                      value:  DonationType.donationForMandir,
                    },
                    {
                      label: t("gowshalaDonation"),
                      value:  DonationType.gowshalaDonation,
                    },
                    {
                      label: t("annadanDonation"),
                      value:  DonationType.annadanDonation,
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
        {receiptData && <DonationReceipt data={receiptData} />}

      </div>
    </motion.div>
  );
};

export default Donation;
