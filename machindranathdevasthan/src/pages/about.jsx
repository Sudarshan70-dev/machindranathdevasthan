import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const About = () =>{
    const {t} = useTranslation();

    return (
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="headerTextSize headerColor centerDiv">
            {t("aboutTempleHeader")}
          </h1>
          <div className="centerDiv">
            <div className="aboutTempleCard">
              {/** Information about temple div */}
              <div>
                <p className="headerTextSize headerColor centerDiv">
                  {t("aboutMandirTitle")}
                </p>
                <p className="textColor boaldText centerDiv">{t("aboutMachindranathOvi1")}</p>
                <p className="textColor boaldText centerDiv">{t("aboutMachindranathOvi2")}</p>
                <p className="textColor">{t("aboutMandirText1")}</p>
                <p className="textColor">{t("aboutMandirText2")}</p>
                <p className="textColor">{t("aboutMandirText3")}</p>
                <p className="textColor">{t("aboutMandirText4")}</p>
                <p className="textColor">{t("aboutMandirText5")}</p>
                <p className="textColor">{t("aboutMandirText6")}</p>
                <p className="textColor">{t("aboutMandirText7")}</p>
                <p className="textColor">{t("aboutMandirText8")}</p>
                <p className="textColor">{t("aboutMandirText9")}</p>
                <p className="textColor">{t("aboutMandirText10")}</p>
                <p className="textColor">{t("aboutMandirText11")}</p>
                <p className="textColor">{t("aboutMandirText12")}</p>
                <p className="textColor">{t("aboutMandirText13")}</p>
              </div>
              {/** Information about Machindranath Gad */}
              <div>
                <p className="headerTextSize headerColor centerDiv">
                  {t("aboutMachindranathGadTitle")}
                </p>
                <p className="textColor">{t("aboutMachindranathGadText1")}</p>
                <p className="textColor">{t("aboutMachindranathGadText2")}</p>
                <p className="textColor">{t("aboutMachindranathGadText3")}</p>
                <p className="textColor">{t("aboutMachindranathGadText4")}</p>
                <p className="textColor boaldText">{t("aboutMachindranathGadTitle1")}</p>
                <p className="textColor">{t("aboutMachindranathGadText5")}</p>
                <p className="textColor boaldText">{t("aboutMachindranathGadTitle2")}</p>
                <p className="textColor">{t("aboutMachindranathGadText6")}</p>
                 <p className="textColor boaldText">{t("aboutMachindranathGadTitle11")}</p>
                <p className="textColor">{t("aboutMachindranathGadText23")}</p>
                 <p className="textColor boaldText">{t("aboutMachindranathGadTitle12")}</p>
                <p className="textColor">{t("aboutMachindranathGadText24")}</p>
                <p className="textColor boaldText">{t("aboutMachindranathGadTitle3")}</p>
                <p className="textColor">{t("aboutMachindranathGadText7")}</p>
                <p className="textColor boaldText">{t("aboutMachindranathGadTitle4")}</p>
                <p className="textColor">{t("aboutMachindranathGadText8")}</p>
                <p className="textColor boaldText">{t("aboutMachindranathGadTitle5")}</p>
                <p className="textColor">{t("aboutMachindranathGadText9")}</p>
                <p className="textColor boaldText">{t("aboutMachindranathGadTitle6")}</p>
                <p className="textColor">{t("aboutMachindranathGadText10")}</p>
                <p className="textColor boaldText">{t("aboutMachindranathGadTitle7")}</p>
                <p className="textColor">{t("aboutMachindranathGadText11")}</p>
                <p className="textColor boaldText">{t("aboutMachindranathGadTitle8")}</p>
                <p className="textColor">{t("aboutMachindranathGadText12")}</p>
                <p className="textColor boaldText">{t("aboutMachindranathGadTitle9")}</p>
                <p className="textColor">{t("aboutMachindranathGadText13")}</p>
                <p className="textColor boaldText">{t("aboutMachindranathGadTitle10")}</p>
                <p className="textColor">{t("aboutMachindranathGadText14")}</p>
                <p className="textColor">{t("aboutMachindranathGadText15")}</p>
                <p className="textColor boaldText">{t("aboutMachindranathGadText16")}</p>
                <p className="textColor">{t("aboutMachindranathGadText17")}</p>
                <p className="textColor">{t("aboutMachindranathGadText18")}</p>
                <p className="textColor">{t("aboutMachindranathGadText19")}</p>
                <p className="textColor">{t("aboutMachindranathGadText20")}</p>
                <p className="textColor">{t("aboutMachindranathGadText21")}</p>
                <p className="textColor">{t("aboutMachindranathGadText22")}</p>
               
              </div>
              {/** Information about Festival */}
              <div>
                <p className="headerTextSize headerColor centerDiv">
                  {t("aboutFestivalsTitle")}
                </p>
                <p className="textColor boaldText">{t("paushyaAmavasya")}</p>
                <p className="textColor">{t("paushyaAmavasyaText")}</p>
                <p className="textColor boaldText">{t("falgunAmavasya")}</p>
                <p className="textColor">{t("falgunAmavasyaText")}</p>
                <p className="textColor boaldText">{t("rangPanchami")}</p>
                <p className="textColor">{t("rangPanchamiText")}</p>
                <p className="textColor boaldText">{t("rushiPanchami")}</p>
                <p className="textColor">{t("rushiPanchamiText")}</p>
                <p className="textColor boaldText">{t("monthlyAmavasya")}</p>
                <p className="textColor">{t("monthlyAmavasyaText")}</p>
              </div>

              <div>
                <p className="headerTextSize headerColor centerDiv">
                  {t("symbolOfFaithTitle")}
                </p>
                <p className="textColor">{t("symbolOfFaithText1")}</p>
                <p className="textColor">{t("symbolOfFaithText2")}</p>
              </div>
              

              <div>
                <p className="headerTextSize headerColor centerDiv">
                  {t("templeRenovationTitle")}
                </p>
                <p className="textColor">{t("templeRenovationText1")}</p>
                <p className="textColor boaldText">{t("templeRenovationText2")}</p>
                <p className="textColor">{t("templeRenovationText3")}</p>
                <p className="textColor">{t("templeRenovationText4")}</p>
                <p className="textColor">{t("templeRenovationText5")}</p>
                <p className="textColor">{t("templeRenovationText6")}</p>
                <p className="textColor">{t("templeRenovationText7")}</p>
                <p className="textColor">{t("templeRenovationText8")}</p>
                <p className="textColor">{t("templeRenovationText9")}</p>
                <p className="textColor">{t("templeRenovationText10")}</p>
                <p className="textColor">{t("templeRenovationText11")}</p>
                <p className="textColor">{t("templeRenovationText12")}</p>
                <p className="textColor">{t("templeRenovationText13")}</p>
                <p className="textColor">{t("templeRenovationText14")}</p>
              </div>
<div>
                <p className="headerTextSize headerColor centerDiv">
                  {t("socialInitative")}
                </p>
                <p className="textColor">{t("socialInitativeText")}</p>
                <p className="textColor boaldText">{t("goshala")}</p>
                <p className="textColor">{t("goshalaText1")}</p>
                <p className="textColor">{t("goshalaText2")}</p>
                <p className="textColor">{t("goshalaText3")}</p>
                <p className="textColor boaldText">{t("annadan")}</p>
                <p className="textColor">{t("annadanText1")}</p>
                <p className="textColor">{t("annadanText2")}</p>
                <p className="textColor">{t("annadanText3")}</p>
                <p className="textColor boaldText">{t("ambulance")}</p>
                <p className="textColor">{t("ambulanceText1")}</p>
                <p className="textColor">{t("ambulanceText2")}</p>
                <p className="textColor">{t("ambulanceText3")}</p>
              </div>


              {/**Temples vision and mission */}
              <div>
                <p className="headerTextSize headerColor centerDiv">
                  {t("visionTitle")}
                </p>
                <p className="textColor">{t("visionText")}</p>
                <p className="textColor">{t("mission1")}</p>
                <p className="textColor">{t("mission1")}</p>
                <p className="textColor">{t("mission2")}</p>
                <p className="textColor">{t("mission3")}</p>
                <p className="textColor">{t("mission4")}</p>
                <p className="textColor">{t("mission5")}</p>
              </div>
              {/** Trustees Prommis */}
              <div>
                <p className="headerTextSize headerColor centerDiv">
                  {t("ourPromis")}
                </p>
                <p className="textColor boaldText">{t("promisText1")}</p>
                <p className="textColor">{t("promisText2")}</p>
                <p className="textColor">{t("promisText3")}</p>
                <p className="textColor">{t("promisText4")}</p>
                <p className="textColor">{t("promisText5")}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
}

export default About;