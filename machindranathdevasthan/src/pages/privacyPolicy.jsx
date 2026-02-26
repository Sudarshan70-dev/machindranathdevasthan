import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const PrivacyPolicy = () =>{
    const {t} = useTranslation();
    return (
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80 }}
        transition={{ duration: 0.4 }}
      >
        <p className="headerTextSize headerColor centerDiv">
          {t("privacyPolicy")}
        </p>

        <div className="centerDiv">
          <div className="aboutTempleCard">
            <div>
              <p className="textColor">{t("lastUpdate")}</p>
              <p className="textColor">{t("privacyPolicyText")}</p>
            </div>
            <div>
              <p className="headerTextSize headerColor centerDiv">
                {t("informationCollectTitle")}
              </p>
              <p className="textColor">{t("informationCollectText1")}</p>
            </div>
            <div>
              <p className="headerTextSize headerColor centerDiv">
                {t("informationUseTitle")}
              </p>
              <p className="textColor">{t("informationUseText1")}</p>
            </div>
            <div>
              <p className="headerTextSize headerColor centerDiv">
                {t("paymentSecurityTitle")}
              </p>
              <p className="textColor">{t("paymentSecurityText1")}</p>
              <p className="textColor">{t("paymentSecurityText2")}</p>
            </div>
            <div>
              <p className="headerTextSize headerColor centerDiv">
                {t("dataProtactionTitle")}
              </p>
              <p className="textColor">{t("dataProtactionText1")}</p>
              <p className="textColor">{t("dataProtactionText2")}</p>
              <p className="textColor">{t("dataProtactionText3")}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
}

export default PrivacyPolicy;