import React from "react";
import "../style.css";
import { useTranslation } from "react-i18next";
import Tab from '@mui/material/Tab';
import Logo from "../assests/Logo.png";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  return (
    <nav className="navBar headerColor">
      <div className="langaugeSelector">
        <div onClick={() => i18n.changeLanguage("en")}>English |</div>
        <div onClick={() => i18n.changeLanguage("mr")}>मराठी |</div>
        <div onClick={() => i18n.changeLanguage("hi")}>हिंदी </div>
      </div>
      <div className="headerPositioning">
          <img className="logo-circle centerDiv" src={Logo} alt="Logo" />
        <div className="headerContainerWidth">
          <div className="devasthanName">{t("devasthanName")}</div>
          <div className="addressContainer">
            <div className="address">{t("address")}</div>
            <div className="address">{t("trustNo")}</div>
          </div>
        
          <div className="navigationTabs navTitle">
            <Tab sx={{fontWeight:"700", color:"#FF3300"}} label={t("home")} value="1" onClick={()=>navigate("/")} />
            <Tab sx={{fontWeight:"700", color:"#FF3300"}} label={t("about")} value="2" onClick={()=>navigate("/about")}/>
            <Tab sx={{fontWeight:"700", color:"#FF3300"}} label={t("donation")} value="3" onClick={()=>navigate("/donation")}/>
            <Tab sx={{fontWeight:"700", color:"#FF3300"}} label={t("sevaBooking")} value="4" onClick={()=>navigate("/volunteerRegistration")} />
            <Tab sx={{fontWeight:"700", color:"#FF3300"}} label={t("login")} value="5" onClick={()=>navigate("/trustee-login")} />

          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
