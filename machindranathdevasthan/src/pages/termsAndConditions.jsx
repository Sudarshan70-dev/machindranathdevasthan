import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";


const TermsAndConditions = ()=>{
    const {t} = useTranslation();

    return (
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80 }}
        transition={{ duration: 0.4 }}
      >
              <p className="headerTextSize headerColor centerDiv">
                {t("termsCondition")}
              </p>
        <div className="centerDiv">
          <div className="aboutTempleCard">
            <div>
              <p className="textColor">{t("lastUpdate")}</p>
              <p className="textColor">{t("termsText1")}</p>
              <p className="textColor">{t("termsText2")}</p>
            </div>
            <div>
              <p className="headerTextSize headerColor centerDiv">
                {t("aboutTrustTitle")}
              </p>
              <p className="textColor">{t("aboutTrustText1")}</p>
              <p className="textColor">{t("aboutTrustText2")}</p>
            </div>
            <div>
              <p className="headerTextSize headerColor centerDiv">
                {t("donationsTitle")}
              </p>
              <p className="textColor">{t("donationsText1")}</p>
              <p className="textColor">{t("donationsText2")}</p>
              <p className="textColor">{t("donationsText3")}</p>
              <p className="textColor">{t("donationsText4")}</p>
            </div>
            <div>
              <p className="headerTextSize headerColor centerDiv">
                {t("eventVipPassTitle")}
              </p>
              <p className="textColor">{t("eventVipPassText1")}</p>
              <p className="textColor">{t("eventVipPassText2")}</p>
              <p className="textColor">{t("eventVipPassText3")}</p>
            </div>
            <div>
              <p className="headerTextSize headerColor centerDiv">
                {t("userResponcibilityTitle")}
              </p>
              <p className="textColor">{t("userResponcibilityText1")}</p>
              <p className="textColor">{t("userResponcibilityText2")}</p>
              <p className="textColor">{t("userResponcibilityText3")}</p>
              <p className="textColor">{t("userResponcibilityText4")}</p>
            </div>
            <div>
              <p className="headerTextSize headerColor centerDiv">
                {t("limitionOfLibilityTitle")}
              </p>
              <p className="textColor">{t("limitionOfLibilityText1")}</p>
              <p className="textColor">{t("limitionOfLibilityText2")}</p>
              <p className="textColor">{t("limitionOfLibilityText3")}</p>
              <p className="textColor">{t("limitionOfLibilityText4")}</p>
            </div>
            <div>
              <p className="headerTextSize headerColor centerDiv">
                {t("governingLaw")}
              </p>
              <p className="textColor">{t("governingLawText")}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
}

export default TermsAndConditions;