import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TextField from "../components/muiTextfiled";
import Button from "../components/muiButton";
import "../style.css";

const TrusteeRegister = () => {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [trusteeId, setTrusteeId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCancel = () => {
    setFullName("");
    setMobileNumber("");
    setTrusteeId("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleMobileNumber = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 10) {
      setMobileNumber(value);
    }
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert(t("passwordMismatch"));
      return;
    }

    const registrationPayload = {
      fullName,
      mobileNumber,
      trusteeId,
      password,
    };

    console.log(registrationPayload);
    // TODO: Integrate trustee registration API.
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h1 className="headerTextSize centerDiv headerColor">
          {t("trusteeRegisterTitle")}
        </h1>
        <div className="centerDiv">
          <div className="trusteeAuthCard">
            <div className="headerColor">{t("allFieldsRequired")}</div>

            <div className="inputField">
              <TextField
                id="trusteeRegisterName"
                label={t("name")}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
              />
            </div>

            <div className="inputField">
              <TextField
                id="trusteeRegisterMobile"
                label={t("mobile")}
                value={mobileNumber}
                onChange={handleMobileNumber}
                type="number"
              />
            </div>

            <div className="inputField">
              <TextField
                id="trusteeRegisterId"
                label={t("trusteeId")}
                value={trusteeId}
                onChange={(e) => setTrusteeId(e.target.value)}
                type="text"
              />
            </div>

            <div className="inputField">
              <TextField
                id="trusteeRegisterPassword"
                label={t("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>

            <div className="inputField">
              <TextField
                id="trusteeRegisterConfirmPassword"
                label={t("confirmPassword")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
              />
            </div>

            <div className="donationActions">
              <Button id="cancelTrusteeRegister" onClick={handleCancel}>
                {t("cancle")}
              </Button>
              <Button id="submitTrusteeRegister" onClick={handleRegister}>
                {t("register")}
              </Button>
            </div>

            <p className="trusteeAuthSwitch">
              {t("alreadyHaveTrusteeAccount")}{" "}
              <Link to="/trustee-login" className="trusteeAuthLink">
                {t("login")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrusteeRegister;
