import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Tab from '@mui/material/Tab';


const Footer =()=>{
    const {t} = useTranslation();
    const navigate = useNavigate();

    return(
       <footer className="footerContainer">
        
        <div className="PolicyContainer">
        <div>
            © {new Date().getFullYear()} {t("copyright")}
        </div>
            {/* <div> */}
                <Tab sx={{fontWeight:"700", color:"#FF3300"}} label={t("privacyPolicy")} value="1" onClick={()=>navigate("/privacy-policy")} />
            <Tab sx={{fontWeight:"700", color:"#FF3300"}} label={t("termsCondition")} value="2" onClick={()=>navigate("/terms-conditions")}/>
            <Tab sx={{fontWeight:"700", color:"#FF3300"}} label={t("refundPolicy")} value="3" onClick={()=>navigate("/refund-policy")}/>
            
            {/* </div> */}

        </div>

</footer>
    )
}

export default Footer;