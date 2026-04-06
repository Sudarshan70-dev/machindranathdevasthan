import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const AboutNath = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h1 className="headerTextSize headerColor centerDiv">
          {t("nathpanthAbout")}
        </h1>
        <div className="centerDiv">
          <div className="aboutTempleCard">
            <div>
              <p className="headerTextSize headerColor centerDiv">
                {t("machindranathTitle")}
              </p>
              <p className="textColor boaldText centerDiv">
                {t("navanathMantra")}
              </p>
              <p className="textColor">{t("machindranathText1")}</p>
              <p className="textColor">{t("machindranathText2")}</p>
              <p className="textColor">{t("machindranathText3")}</p>
              <p className="textColor">{t("machindranathText4")}</p>
              <p className="textColor">{t("machindranathText5")}</p>
              <p className="textColor boaldText centerDiv">{t("ovi1")}</p>
              <p className="textColor">{t("machindranathText6")}</p>
              <p className="textColor">{t("machindranathText7")}</p>
              <p className="textColor">{t("machindranathText8")}</p>
              <p className="textColor boaldText centerDiv">{t("ovi2")}</p>
              <p className="textColor">{t("machindranathText9")}</p>
              <p className="textColor boaldText centerDiv">{t("ovi3")}</p>
              <p className="textColor">{t("machindranathText10")}</p>
              <p className="textColor">{t("machindranathText11")}</p>
              <p className="headerTextSize headerColor centerDiv">
                {t("gorakshnathTitle")}
              </p>
              <p className="textColor boaldText centerDiv">{t("ovi4")}</p>
              <p className="textColor">{t("machindranathText12")}</p>
              <p className="textColor boaldText centerDiv">{t("ovi5")}</p>
              <p className="textColor">{t("gorakshanathText1")}</p>
              <p className="textColor">{t("gorakshanathText2")}</p>
              <p className="headerTextSize headerColor centerDiv">
                {t("gahininathTitle")}
              </p>
              <p className="textColor">{t("gorakshanathText3")}</p>
              <p className="textColor">{t("gorakshanathText4")}</p>
              <p className="textColor">{t("gorakshanathText5")}</p>
              <p className="headerTextSize headerColor centerDiv">
                {t("jalandarnathTitle")}
              </p>
              <p className="textColor">{t("jalindarNathText1")}</p>
              <p className="textColor">{t("jalindarNathText2")}</p>
              <p className="textColor">{t("jalindarNathText3")}</p>
              <p className="textColor">{t("jalindarNathText4")}</p>
              <p className="headerTextSize headerColor centerDiv">
                {t("kanifnathTitle")}
              </p>
              <p className="textColor">{t("jalindarNathText5")}</p>
              <p className="textColor boaldText centerDiv">{t("ovi6")}</p>
              <p className="textColor">{t("jalindarNathText6")}</p>
              <p className="textColor boaldText centerDiv">{t("ovi7")}</p>
              <p className="textColor">{t("jalindarNathText7")}</p>
              <p className="textColor">{t("jalindarNathText8")}</p>
              <p className="textColor">{t("jalindarNathText9")}</p>
              <p className="textColor">{t("jalindarNathText10")}</p>
              <p className="textColor">{t("jalindarNathText11")}</p>
              <p className="textColor">{t("jalindarNathText12")}</p>
              <p className="textColor">{t("jalindarNathText13")}</p>
              <p className="textColor">{t("jalindarNathText14")}</p>
              <p className="textColor">{t("jalindarNathText15")}</p>
              <p className="textColor">{t("jalindarNathText16")}</p>
              <p className="textColor">{t("jalindarNathText17")}</p>
              <p className="textColor">{t("jalindarNathText18")}</p>
              <p className="textColor boaldText centerDiv">{t("ovi8")}</p>
              <p className="textColor">{t("gorakshanathText6")}</p>
              <p className="textColor">{t("gorakshanathText7")}</p>
              <p className="textColor boaldText centerDiv">{t("ovi9")}</p>
              <p className="textColor">{t("gorakshanathText8")}</p>
              <p className="textColor boaldText centerDiv">{t("ovi10")}</p>
              <p className="textColor">{t("gorakshanathText9")}</p>
              <p className="textColor">{t("kanifanathText1")}</p>
              <p className="textColor">{t("kanifanathText2")}</p>
              <p className="textColor">{t("kanifanathText3")}</p>
              <p className="textColor">{t("kanifanathText4")}</p>
              <p className="textColor">{t("kanifanathText5")}</p>
              <p className="textColor">{t("kanifanathText6")}</p>
              <p className="textColor">{t("jalindarNathText19")}</p>
              <p className="textColor">{t("jalindarNathText20")}</p>
              <p className="textColor">{t("jalindarNathText21")}</p>
              <p className="textColor">{t("jalindarNathText22")}</p>
              <p className="textColor">{t("jalindarNathText23")}</p>
              <p className="textColor">{t("gorakshanathText10")}</p>
              <p className="textColor boaldText centerDiv">{t("ovi11")}</p>
              <p className="textColor">{t("machindranathText13")}</p>
              <p className="textColor boaldText centerDiv">{t("ovi12")}</p>
              <p className="textColor">{t("machindranathText14")}</p>
              <p className="textColor">{t("machindranathText15")}</p>
              <p className="textColor boaldText centerDiv">{t("ovi13")}</p>
              <p className="textColor">{t("machindranathText16")}</p>
              <p className="textColor">{t("machindranathText17")}</p>
              <p className="textColor boaldText centerDiv">{t("ovi14")}</p>
              <p className="headerTextSize headerColor centerDiv">
                {t("bhartariNathTitle")}
              </p>
              <p className="textColor">{t("bhartariNathText1")}</p>
              <p className="textColor">{t("bhartariNathText2")}</p>
              <p className="textColor">{t("bhartariNathText3")}</p>
              <p className="textColor">{t("bhartariNathText4")}</p>
              <p className="textColor">{t("bhartariNathText5")}</p>
              <p className="textColor">{t("bhartariNathText6")}</p>
              <p className="textColor">{t("bhartariNathText7")}</p>
              <p className="textColor">{t("bhartariNathText8")}</p>
              <p className="textColor">{t("bhartariNathText9")}</p>
              <p className="textColor">{t("gorakshanathText11")}</p>
              <p className="textColor">{t("machindranathText18")}</p>
              <p className="textColor">{t("machindranathText19")}</p>
              <p className="textColor">{t("machindranathText20")}</p>
              <p className="textColor">{t("machindranathText21")}</p>
              <p className="textColor">{t("machindranathText22")}</p>
              <p className="textColor">{t("machindranathText23")}</p>
              <p className="textColor">{t("machindranathText24")}</p>
              <p className="textColor">{t("machindranathText25")}</p>
              <p className="textColor">{t("machindranathText26")}</p>
              <p className="textColor">{t("machindranathText27")}</p>
              <p className="headerTextSize headerColor centerDiv">
                {t("revannathTitle")}
              </p>
              <p className="textColor">{t("revannathText1")}</p>
              <p className="textColor">{t("revannathText2")}</p>
              <p className="textColor">{t("revannathText3")}</p>
              <p className="textColor">{t("revannathText4")}</p>
              <p className="headerTextSize headerColor centerDiv">
                {t("nagnathTitle")}
              </p>
              <p className="textColor">{t("naganathText1")}</p>
              <p className="textColor">{t("naganathText2")}</p>
              <p className="textColor">{t("naganathText3")}</p>
              <p className="textColor">{t("naganathText4")}</p>
              <p className="textColor">{t("naganathText5")}</p>
              <p className="textColor">{t("naganathText6")}</p>
              <p className="textColor">{t("naganathText7")}</p>
              <p className="textColor">{t("naganathText8")}</p>
              <p className="textColor">{t("naganathText9")}</p>
              <p className="textColor">{t("naganathText10")}</p>
              <p className="headerTextSize headerColor centerDiv">
                {t("charapatinathTitle")}
              </p>
              <p className="textColor">{t("charapatinathText1")}</p>
              <p className="textColor">{t("charapatinathText2")}</p>
              <p className="textColor boaldText centerDiv">{t("ovi15")}</p>
              <p className="textColor">{t("machindranathText28")}</p>
              <p className="textColor">{t("charapatinathText3")}</p>
              <p className="textColor">{t("machindranathText29")}</p>
              <p className="textColor">{t("machindranathText30")}</p>
              <p className="textColor">{t("machindranathText31")}</p>
              <p className="textColor">{t("machindranathText32")}</p>
              <p className="textColor">{t("machindranathText33")}</p>
              <p className="textColor">{t("machindranathText34")}</p>
              <p className="textColor">{t("machindranathText35")}</p>
              <p className="headerTextSize headerColor centerDiv">
                {t("machindranathInNepalTitle")}
              </p>
              <p className="textColor">{t("machindranathInNepalText1")}</p>
              <p className="textColor">{t("machindranathInNepalText2")}</p>
              <p className="textColor">{t("machindranathInNepalText3")}</p>
              <p className="headerTextSize headerColor centerDiv">
                {t("warakariTitle")}
              </p>
              <p className="textColor boaldText centerDiv">
                {t("abhangText1")}
              </p>
              <p className="textColor boaldText centerDiv">
                {t("abhangText2")}
              </p>
              <p className="textColor boaldText centerDiv">
                {t("abhangText3")}
              </p>
              <p className="textColor">{t("warakariText1")}</p>
              <p className="textColor">{t("warakariText2")}</p>
              <p className="textColor">{t("warakariText3")}</p>
              <p className="textColor">{t("warakariText4")}</p>
              <p className="textColor boaldText centerDiv">
                {t("abhangText4")}
              </p>
              <p className="textColor boaldText centerDiv">
                {t("abhangText5")}
              </p>
              <p className="textColor boaldText centerDiv">
                {t("abhangText6")}
              </p>
              <p className="textColor boaldText centerDiv">
                {t("abhangText7")}
              </p>
              <p className="textColor boaldText centerDiv">
                {t("abhangText8")}
              </p>
              <p className="textColor boaldText centerDiv">
                {t("abhangText9")}
              </p>
              <p className="textColor">{t("warakariText5")}</p>
              <p className="textColor">{t("warakariText6")}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutNath;
