import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TextField from "../components/muiTextfiled";
import Button from "../components/muiButton";
import "../style.css";

const TrusteeLogin = () => {
  const { t } = useTranslation();
  const [trusteeId, setTrusteeId] = useState("");
  const [password, setPassword] = useState("");

  const handleCancel = () => {
    setTrusteeId("");
    setPassword("");
  };

  const handleLogin = () => {
    const loginPayload = {
      trusteeId,
      password,
    };

    console.log(loginPayload);
    // TODO: Integrate trustee authentication API.
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h1 className="headerTextSize centerDiv headerColor">{t("login")}</h1>
        <div className="centerDiv">
          <div className="trusteeAuthCard">
            <div className="headerColor">{t("allFieldsRequired")}</div>

            <div className="inputField">
              <TextField
                id="trusteeLoginId"
                label={t("trusteeId")}
                value={trusteeId}
                onChange={(e) => setTrusteeId(e.target.value)}
                type="text"
              />
            </div>

            <div className="inputField">
              <TextField
                id="trusteeLoginPassword"
                label={t("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>

            <div className="donationActions">
              <Button id="cancelTrusteeLogin" onClick={handleCancel}>
                {t("cancle")}
              </Button>
              <Button id="submitTrusteeLogin" onClick={handleLogin}>
                {t("login")}
              </Button>
            </div>

            <p className="trusteeAuthSwitch">
              {t("noTrusteeAccount")}{" "}
              <Link to="/trustee-register" className="trusteeAuthLink">
                {t("register")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrusteeLogin;
