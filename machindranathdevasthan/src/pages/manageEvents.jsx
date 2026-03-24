import React, { useState } from "react";
import "../style.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import LoaderOverlay from "../components/loaderOverlay";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "../components/muiTextfiled";
import Button from "../components/muiButton";
import { DataBaseConstant } from "../constants";
import { Timestamp } from "firebase/firestore";
import { updateEventDate, updateVipPassDate } from "../firebase/dbFunctions";
import { toast } from "react-toastify";

const ManageEvents = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [amount, setAmount] = useState(200);
  const [vipPassSelect, setVipPassSelect] = useState(true);
  const [cardClick, setCardClick] = useState(false);
  const [eventManageCard, setEventManageCard] = useState(true);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const handleAmount = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      setAmount(parseInt(value));
    } else {
      setAmount(0);
    }
  };

  const handleCancleButton = () => {
    setEventManageCard(true);
    setVipPassSelect(true);
    setCardClick(false);
    setEndDate(null);
    setStartDate(null);
  };

  const normalizeDate = (value) => {
    if (!value) {
      return null;
    }

    if (typeof value.toDate === "function") {
      const date = value.toDate();
      return Number.isNaN(date.getTime()) ? null : Timestamp.fromDate(date);
    }

    if (value instanceof Date) {
      return Number.isNaN(value.getTime()) ? null : Timestamp.fromDate(value);
    }

    if (typeof value === "string" || typeof value === "number") {
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? null : Timestamp.fromDate(date);
    }

    if (typeof value === "object" && typeof value.seconds === "number") {
      return new Timestamp(value.seconds, value.nanoseconds || 0);
    }

    return null;
  };

  const handleSaveButton = async () => {
    if (vipPassSelect) {
      setIsLoading(true);

      if (!startDate || !endDate || !amount) {
        toast.error(t("paymentErrorToast2"));
        setIsLoading(false);

        return;
      }

      try {
        const vipPassDateAdd = {
          [DataBaseConstant.startDate]: normalizeDate(startDate),
          [DataBaseConstant.endDate]: normalizeDate(endDate),
          [DataBaseConstant.vipPassAmount]: amount,
        };

        await updateVipPassDate(vipPassDateAdd);
        toast.success(t("vipPassDateUpdateSuccess"));
        handleCancleButton();
      } catch (error) {
        console.error(error);
        toast.error(t("writtenBillBookEntryError"));
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);

      if (!startDate || !endDate || !eventTitle || !eventDescription) {
        toast.error(t("paymentErrorToast2"));
        setIsLoading(false);

        return;
      }
      try {
        const eventDetailsData = {
          [DataBaseConstant.startDate]: normalizeDate(startDate),
          [DataBaseConstant.endDate]: normalizeDate(endDate),
          [DataBaseConstant.eventName]: eventTitle,
          [DataBaseConstant.eventDesc]: eventDescription,
        };

        console.log(eventDetailsData);

        const eventDocId = eventTitle.replaceAll(" ", "");

        await updateEventDate(eventDetailsData, eventDocId);
        toast.success(t("eventUpdateSuccess"));
      } catch (error) {
        console.log(error);
        toast.error(t("writtenBillBookEntryError"));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <LoaderOverlay isLoading={isLoading} />

      <div>
        <h1 className="headerTextSize headerColor centerDiv">
          {t("eventAlert")}
        </h1>

        <div className="aboutTempleCard">
          <div className="dashboardSummaryWrapper">
            <div className="onlineServicesContainer">
              {vipPassSelect && (
                <div
                  className="dashboardSummaryCard"
                  style={{ margin: "10px" }}
                  onClick={() => {
                    setVipPassSelect(true);
                    setCardClick(true);
                    setEventManageCard(false);
                  }}
                >
                  <div className="cardTextHeader centerDiv">
                    {t("vipPassManage")}
                  </div>
                </div>
              )}
              {eventManageCard && (
                <div
                  className="dashboardSummaryCard"
                  style={{ margin: "10px" }}
                  onClick={() => {
                    setEventManageCard(true);
                    setVipPassSelect(false);
                    setCardClick(true);
                  }}
                >
                  <div className="cardTextHeader centetDiv">
                    {t("eventManage")}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* adding vip pass management  */}
          {cardClick && (
            <div>
              <div className="reportsDateAndButtonContainer">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={t("startDate")}
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                  />
                  <DatePicker
                    label={t("endDate")}
                    value={endDate}
                    minDate={startDate}
                    onChange={(newValue) => setEndDate(newValue)}
                  />
                </LocalizationProvider>
              </div>

              {vipPassSelect && (
                <div className="reportsDateAndButtonContainer centerDiv">
                  <div className="inputField " style={{ width: "40%" }}>
                    <TextField
                      id="amount"
                      title={t("amount")}
                      label={t("amount")}
                      variant="outlined"
                      type="text"
                      value={amount}
                      onChange={handleAmount}
                    ></TextField>
                  </div>
                </div>
              )}

              {eventManageCard && (
                <div className="centerDiv">
                  <div style={{ width: "40%", margin: "30px" }}>
                    <TextField
                      id="eventTitle"
                      title={t("eventTitle")}
                      label={t("eventTitle")}
                      variant="outlined"
                      type="text"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                    ></TextField>
                  </div>
                  <div style={{ width: "40%", margin: "30px" }}>
                    <TextField
                      id="description"
                      title={t("description")}
                      label={t("description")}
                      variant="outlined"
                      type="text"
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                    ></TextField>
                  </div>
                </div>
              )}

              <div className="donationActions">
                <Button id="saveButton" onClick={handleSaveButton}>
                  {t("save")}
                </Button>
                <Button id="cancleButton" onClick={handleCancleButton}>
                  {t("cancle")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ManageEvents;
