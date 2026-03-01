import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import TextField from "../components/muiTextfiled";
import Button from "../components/muiButton";
import "../style.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/auth";


const TrusteeLogin = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin =async () => {
    try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    console.log("Login Successful:", user.email);
    
    // Redirect after login
    navigate("/trusteeDashboard");

  } catch (error) {
    console.error("Login Error:", error.message);

    if (error.code === "auth/user-not-found") {
      alert("User not found");
    } else if (error.code === "auth/wrong-password") {
      alert("Incorrect password");
    } else {
      alert(error.message);
    }
  }
    // TODO: Integrate trustee authentication API.
  };

  const { currentUser } = useAuth();

  useEffect(() => {
    console.log("currunt user in login ---> ",currentUser)
    if (currentUser) {
      navigate("/trusteeDashboard");
    }
  }, [currentUser]);

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Button id="submitTrusteeLogin" onClick={handleLogin}>
                {t("login")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrusteeLogin;
