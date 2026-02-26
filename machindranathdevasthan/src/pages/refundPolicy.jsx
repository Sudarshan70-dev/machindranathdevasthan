import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const RefundPolicy = () => {
  const { t } = useTranslation();
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
            <p className="textColor">{t("refundPolicyText1")}</p>
          </div>

          <div>
            <p className="headerTextSize headerColor centerDiv">
              {t("donationsTitle")}
            </p>
            <p className="textColor">{t("refundPolicyText2")}</p>
            <p className="textColor">{t("refundPolicyText3")}</p>
            <p className="textColor">{t("refundPolicyText4")}</p>
            <p className="textColor">{t("refundPolicyText5")}</p>
          </div>
          <div>
            <p className="headerTextSize headerColor centerDiv">
              {t("failedTransactionTitle")}
            </p>
            <p className="textColor">{t("failedTransactionText1")}</p>
            <p className="textColor">{t("failedTransactionText2")}</p>
            <p className="textColor">{t("failedTransactionText3")}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RefundPolicy;
