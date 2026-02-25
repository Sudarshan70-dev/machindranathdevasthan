import React from "react";
import "../style.css";
import {motion} from "framer-motion";
import ImageSlider from "../components/imageSlider";
import Galary from "../components/galary";
import { useTranslation } from "react-i18next";
import MuiButton from "../components/muiButton";
import MuiCard from "../components/muiCard";
import FestivalCard from "../components/festivalCard";
import EventTable from "../components/eventTable";
import Grid from "@mui/material/Grid";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import Img1 from "../assests/img1.jpg";
import DonationImg from "../assests/donation.jpg";
import VipPassLogo from "../assests/vipPassLogo.png";
import MandirSeva from "../assests/mandirSeva.png";
import PujaLogo from "../assests/pujaLogo.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
    

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="home">
        <ImageSlider></ImageSlider>
        <div className="buttons">
          <MuiButton
          id="sliderVipPassButton"
          onClick={()=>navigate("/vipPass")}
          >{t("vipPass")}</MuiButton>
          <MuiButton>{t("liveDarshan")}</MuiButton>
          <MuiButton
          id="sliderDonationButton"
          onClick={()=>navigate("/donation")}
          >{t("donation")}</MuiButton>
        </div>

        {/* About Temple Card */}
        <div className="aboutTempleCard">
          <div className="headerTextSize headerColor centerDiv">
            {t("aboutTempleHeader")}
          </div>
          <div className="flex">
            <div className="aboutTempleImgCard">
              <img src={Img1} alt="About Temple" className="aboutTempleImg" />
            </div>
            <div className="aboutTempleCardContent">
             <p className="textColor">{t("aboutMandirText1")}</p>
                <p className="textColor">{t("aboutMandirText2")}</p>
                <p className="textColor">{t("aboutMandirText3")}</p>
                <p className="textColor">{t("aboutMandirText4")}</p>
            </div>
          </div>
          <div className="flexEnd">
            <MuiButton
              onClick={()=>navigate("/about")}
            >{t("readMore")}</MuiButton>
          </div>
        </div>

        {/* End of About Temple Card */}
        {/* Online Service and offerings */}

        <div className="w90">
          <div className="headerTextSize headerColor onlineServicesContainer">
            {t("onlineServices")}
          </div>
          <div className="centerDiv">
            <Grid container spacing={4} justifyContent="center">
              <Grid size={{ xs: 12, sm: 6 }}>
                <div className="centerDiv">
                  <MuiCard
                    img={DonationImg}
                    title={t("donationForMandir")}
                    description={t("stoneForMandir")}
                    buttonText={t("contribute")}
                    onButtonClick={()=>navigate("/donationForStone")}
                  ></MuiCard>
                </div>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <div className="centerDiv">
                  <MuiCard
                    img={VipPassLogo}
                    title={t("vipPass")}
                    description={t("vipPassText")}
                    buttonText={t("getVipPass")}
                    onButtonClick={()=>navigate("/vipPass")}
                  ></MuiCard>
                </div>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <div className="centerDiv">
                  <MuiCard
                    img={PujaLogo}
                    title={t("poojaBooking")}
                    description={t("poojaBookingText")}
                    buttonText={t("bookNow")}
                  ></MuiCard>
                </div>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <div className="centerDiv">
                  <MuiCard
                    img={MandirSeva}
                    title={t("sevaBooking")}
                    description={t("sevaBookingText")}
                    buttonText={t("bookNow")}
                    onButtonClick={()=>navigate("/volunteerRegistration")} 
                  ></MuiCard>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>

        {/* End of Online Service and offerings */}
        {/* Festivals and Upcoming events */}
        <div className="w90">
          <div className="headerTextSize headerColor onlineServicesContainer">
            {t("festivals")}
          </div>
          <div className="festivalCardsRow">
            <FestivalCard
              title={t("paushyaAmavasya")}
              description={t("paushyaAmavasyaText")}
            ></FestivalCard>

            <FestivalCard
              title={t("rangPanchami")}
              description={t("rangPanchamiText")}
            ></FestivalCard>

            <FestivalCard
              title={t("falgunAmavasya")}
              description={t("falgunAmavasyaText")}
            ></FestivalCard>

            <FestivalCard
              title={t("rushiPanchami")}
              description={t("rushiPanchamiText")}
            ></FestivalCard>
          </div>
        </div>

        {/* End of Festivals */}
        {/* Upcoming Events */}
        <div className="w90">
          <div className="headerTextSize headerColor onlineServicesContainer">
            {t("upcomingEvents")}
          </div>
          <div>
            <EventTable></EventTable>
          </div>
          {/*Gallary */}
          <Galary></Galary>

          {/* Location  */}
          <div className="mapAndContactContainer">
            <div className="mapContainer">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12584.71644019487!2d75.09871197967817!3d19.128480970908935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb508c9146b6ff%3A0x6895119ba73c91fd!2sShri%20Kshetra%20Machindranath%20Samadhi%20mandir%20maymba%20Sawargaon!5e1!3m2!1sen!2sin!4v1771848143279!5m2!1sen!2sin"
                width="600"
                height="450"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="contactContainer">
              <div className="headerTextSize headerColor centerDiv">
                {t("contactUs")}
              </div>
              <div className="contactBody">
                <div>
                  <a
                    href="mailto:shrimachindranathdevasthan@gmail.com"
                    className="contactLinks"
                  >
                    <EmailIcon /> shrimachindranathdevasthan@gmail.com
                  </a>
                </div>
                <div className="centerDiv">
                  <div className="trusteeContactDiv">
                    
                  <div>
                    {t("presidentName")}
                  </div>
                  <div>
                    {t("president")}
                  </div>
                  <a className="contactLinks" href="tel:+919423116214">
                    <LocalPhoneIcon />
                    +91 9423116214
                  </a>
                  </div>
                  <div className="trusteeContactDiv">

                  <div>
                    {t("secretaryName")}
                  </div>
                  <div>
                    {t("secretary")}
                  </div>
                  <a className="contactLinks" href="tel:+917798750075">
                    <LocalPhoneIcon />
                    +91 7798750075
                  </a>
                  </div>
                </div>
                <div>
                  <a
                    href="https://www.instagram.com/macchindranath_devasthan?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    className="contactLinks"
                  >
                    <InstagramIcon /> @macchindranath_devasthan
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
