import React from "react";
import "../style.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import TextField from "../components/muiTextfiled";
import MuiDropdown from "../components/muiDropdown";
import Button from "../components/muiButton";
import { DataBaseConstant, DonationType, CollectionName } from "../constants";
import { addCashItemDonation } from "../api/firebaseApi";
import { toast } from "react-toastify";
import DonationReceipt from "../components/reciept";
import { getLastDocumentFromDb } from "../firebase/dbFunctions";
import LoaderOverlay from "../components/loaderOverlay";

const CashDonation = () => {
  const { t } = useTranslation();

  const [donationType, setDonationType] = useState(
    DonationType.donationForMandir,
  );
  const [mobileNumber, setMobileNumber] = useState();
  const [fullName, setFullName] = useState();
  const [address, setAddress] = useState();
  const [ammount, setAmount] = useState();
  const [itemName, setItemName] = useState();
  const [itemQty, setItemQty] = useState();
  const [receiptData, setReceiptData] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleItemName = (e) => {
    setItemName(e.target.value);
  };

  const handleAmount = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      setAmount(parseInt(value));
    } else {
      setAmount(0);
    }
  };
  const handleItemQty = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      setItemQty(parseInt(value));
    } else {
      setItemQty(0);
    }
  };

  const handleTypesOfDonation = (e) => {
    setDonationType(e.target.value);
    setAmount(0);
    setItemName("");
    setItemQty(0);
  };

  const handleCancle = () => {
    setFullName("");
    setMobileNumber("");
    setAddress("");
    setAmount(0);
    setDonationType(DonationType.donationForMandir);
    setReceiptData(null);
  };

  const handlePayNow = async () => {
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
    if (donationType === DonationType.itemDonation) {
      if (!itemName) {
        toast.error(t("paymentErrorItemName"));
        setIsLoading(false);

        return;
      }
      if (!itemQty) {
        toast.error(t("paymentErrorItemQty"));
        setIsLoading(false);

        return;
      }
    } else {
      if (!ammount) {
        toast.error(t("paymentErrorAmount"));
        setIsLoading(false);

        return;
      }
    }

    let dataToCreate = {};
    try{

      if (donationType === DonationType.itemDonation) {
        /** get last item receipt data */
        const lastReceiptData = await getLastDocumentFromDb(
          CollectionName.itemDonation,
        );
  
        const receiptNo = lastReceiptData[DataBaseConstant.receiptNo]
          ? lastReceiptData[DataBaseConstant.receiptNo] + 1
          : 1;
  
        const data = {
          [DataBaseConstant.name]: fullName,
          [DataBaseConstant.mobileNumber]: mobileNumber,
          [DataBaseConstant.address]: address,
          [DataBaseConstant.donationType]: donationType,
          [DataBaseConstant.itemName]: itemName,
          [DataBaseConstant.itemQty]: itemQty,
          [DataBaseConstant.receiptNo]: receiptNo,
        };
  
        dataToCreate = JSON.parse(JSON.stringify(data));
      } else {
        /** get last cash receipt data */
        const lastReceiptData = await getLastDocumentFromDb(
          CollectionName.cashDonation,
        );
  
        console.log("last receipt data is -----> ", lastReceiptData);
        const receiptNo = lastReceiptData[DataBaseConstant.receiptNo]
          ? lastReceiptData[DataBaseConstant.receiptNo] + 1
          : 1;
  
        const data = {
          [DataBaseConstant.name]: fullName,
          [DataBaseConstant.mobileNumber]: mobileNumber,
          [DataBaseConstant.address]: address,
          [DataBaseConstant.ammount]: ammount,
          [DataBaseConstant.donationType]: donationType,
          [DataBaseConstant.receiptNo]: receiptNo,
        };
  
        dataToCreate = JSON.parse(JSON.stringify(data));
      }
    }catch(err){
      console.error("erroe while createing data--> ",err);
      setIsLoading(false);
    }
    

    console.log("dta to create ----> ", dataToCreate);

    // Logic for data store in CF

    try {
      const responce = await addCashItemDonation(dataToCreate);
      if (responce.success) {
        toast.success(t("paymentSuccessToast"));
        setReceiptData(dataToCreate);
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <LoaderOverlay isLoading={isLoading} />

      <div>
        <h1 className="headerTextSize headerColor centerDiv">
          {t("cashAndItem")}
        </h1>
        <div className="aboutTempleCard centerDiv">
          <div className="donationFormContainer">
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
                type="text"
                value={mobileNumber}
                required={false}
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
                    value: DonationType.donationForMandir,
                  },
                  {
                    label: t("gowshalaDonation"),
                    value: DonationType.gowshalaDonation,
                  },
                  {
                    label: t("annadanDonation"),
                    value: DonationType.annadanDonation,
                  },
                  {
                    label: t("itemDonation"),
                    value: DonationType.itemDonation,
                  },
                ]}
              ></MuiDropdown>
            </div>

            {/** here we check is donation is cash or item if it is item then we didnt show amount input*/}

            {donationType === DonationType.itemDonation ? (
              <div className="inputField">
                <div>
                  <TextField
                    id="itemName"
                    title={t("itemName")}
                    label={t("itemName")}
                    variant="outlined"
                    type="text"
                    value={itemName}
                    onChange={handleItemName}
                  ></TextField>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <TextField
                    id="itemQty"
                    title={t("itemQty")}
                    label={t("itemQty")}
                    variant="outlined"
                    type="text"
                    value={itemQty}
                    onChange={handleItemQty}
                  ></TextField>
                </div>
              </div>
            ) : (
              <div className="inputField">
                <TextField
                  id="amount"
                  title={t("amount")}
                  label={t("amount")}
                  variant="outlined"
                  type="text"
                  value={ammount}
                  onChange={handleAmount}
                ></TextField>
              </div>
            )}

            <div className="donationActions">
              <Button id="cancleButton" onClick={handleCancle}>
                {t("cancle")}
              </Button>
              <Button id="payNowButton" onClick={handlePayNow}>
                {t("save")}
              </Button>
            </div>
          </div>
        </div>
        {receiptData && <DonationReceipt data={receiptData} />}
      </div>
    </motion.div>
  );
};

export default CashDonation;
