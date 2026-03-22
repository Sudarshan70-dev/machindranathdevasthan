import React, { useState } from "react";
import { motion } from "framer-motion";
import LoaderOverlay from "../components/loaderOverlay";
import { useTranslation } from "react-i18next";
import MuiTextField from "../components/muiTextfiled";
import { IconButton, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { DataBaseConstant, WrittenBillBooks } from "../constants";
import { toast } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "../components/muiButton";
import { billBookEntry } from "../api/firebaseApi";

const WrittenRecieptBookEntry = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [billBooks, setBillBooks] = useState(
    WrittenBillBooks.map((amt) => ({
      [DataBaseConstant.ammount]: amt || "",
      [DataBaseConstant.openingReceipt]: "",
      [DataBaseConstant.closingReceipt]: "",
      [DataBaseConstant.totalAmt]: "",
    })),
  );

  const [tableNo, setTableNo] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleAddMoreBook = (index, amount) => {
    const newRow = {
      [DataBaseConstant.ammount]: amount || "",
      [DataBaseConstant.openingReceipt]: "",
      [DataBaseConstant.closingReceipt]: "",
      [DataBaseConstant.totalAmt]: "",
    };

    const updated = [...billBooks];
    updated.splice(index + 1, 0, newRow);

    setBillBooks(updated);
  };

  const handleRemoveBook = (index) => {
    const updated = [...billBooks];
    updated.splice(index, 1);

    setBillBooks(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...billBooks];
    const onlyNumbers = value.replace(/[^0-9]/g, "");

    updated[index][field] = onlyNumbers;

    if (
      updated[index][DataBaseConstant.openingReceipt] &&
      updated[index][DataBaseConstant.closingReceipt]
    ) {
      const open = parseInt(updated[index][DataBaseConstant.openingReceipt]);
      const close = parseInt(updated[index][DataBaseConstant.closingReceipt]);

      if (close < open) {
        toast.error(t("wrongClosingBookNo"));
        updated[index][DataBaseConstant.totalAmt] = 0;
      } else {
        const receipts = close - open + 1;
        updated[index][DataBaseConstant.totalAmt] =
          receipts * updated[index].amount;
      }
    }

    setBillBooks(updated);
  };

  let totalBillAmt = billBooks.reduce(
    (sum, row) => sum + row[DataBaseConstant.totalAmt],
    0,
  );

  const amountCount = billBooks.reduce((acc, row) => {
    acc[row[DataBaseConstant.ammount]] =
      (acc[row[DataBaseConstant.ammount]] || 0) + 1;
    return acc;
  }, {});

  const handleTableNo = (value) => {
    const onlyNumbers = value.replace(/[^0-9]/g, "");
    setTableNo(onlyNumbers);
  };

  const handleClear = () => {
    setTableNo("");
    setStartDate("");
    setEndDate("");
    totalBillAmt = "0";
    setBillBooks(
      WrittenBillBooks.map((amt) => ({
        [DataBaseConstant.ammount]: amt || "",
        [DataBaseConstant.openingReceipt]: "",
        [DataBaseConstant.closingReceipt]: "",
        [DataBaseConstant.totalAmt]: "",
      })),
    );
  };

  const serializeDate = (value) => {
    if (!value) {
      return "";
    }

    if (typeof value.toISOString === "function") {
      return value.toISOString();
    }

    if (typeof value.toDate === "function") {
      return value.toDate().toISOString();
    }

    return value;
  };

  const handleSaveButton = async () => {
    setIsLoading(true);
    const data = {
      [DataBaseConstant.counterNo]: tableNo,
      [DataBaseConstant.startDate]: serializeDate(startDate),
      [DataBaseConstant.endDate]: serializeDate(endDate),
      [DataBaseConstant.books]: billBooks,
      [DataBaseConstant.totalAmt]: totalBillAmt,
    };

    console.log("DATA TO ADD IS ---> ", data);

    try {
      const responce = await billBookEntry(data);
      if (responce.success) {
        toast.success(t("writtenBillBookEntrySuccess"));
        handleClear();
      } else {
        toast.error(responce.message || t("writtenBillBookEntryError"));
      }
    } catch (error) {
      toast.error(t("writtenBillBookEntryError"));
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoaderOverlay isLoading={isLoading} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="headerTextSize headerColor centerDiv">
          {t("writtenReciptCollection")}
        </h1>

        <div className="bodyContainer aboutTempleCard">
          <div>
            <div className="centerDiv">
              <MuiTextField
                label={t("tableNo")}
                value={tableNo}
                onChange={(e) => handleTableNo(e.target.value)}
                style={{ margin: "10px" }}
              />
              <div className="reportsDateAndButtonContainer">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={t("startDate")}
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    sx={{ margin: "10px" }}
                  />
                  <DatePicker
                    label={t("endDate")}
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    sx={{ margin: "10px" }}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div>
              {billBooks.map((row, index) => (
                <div className="centerDiv" key={index}>
                  <div className="amountBox centerDiv ">
                    {row[DataBaseConstant.ammount]}
                  </div>

                  <div style={{ margin: "10px" }}>
                    <MuiTextField
                      label={t("openingRecieptNo")}
                      value={row[DataBaseConstant.openingReceipt]}
                      onChange={(e) =>
                        handleChange(
                          index,
                          DataBaseConstant.openingReceipt,
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div style={{ margin: "10px" }}>
                    <MuiTextField
                      label={t("closeingRecieptNo")}
                      value={row[DataBaseConstant.closingReceipt]}
                      onChange={(e) =>
                        handleChange(
                          index,
                          DataBaseConstant.closingReceipt,
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="totalAmountBox">
                    Rs. {row[DataBaseConstant.totalAmt]}
                  </div>

                  <Tooltip title={t("addBillBook")}>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleAddMoreBook(index, row[DataBaseConstant.ammount])
                      }
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={t("removeBillBook")}>
                    <IconButton
                      color="primary"
                      disabled={
                        amountCount[row[DataBaseConstant.ammount]] === 1
                      }
                      onClick={() => handleRemoveBook(index)}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              ))}

              <div className="flexEnd festivalCardDescription">
                <div className="centerDiv">{t("totalAmt")}</div>
                <div className="totalAmountBox">Rs- {totalBillAmt}</div>
              </div>
              <div className="flexEnd">
                <div style={{ marginRight: "10px" }}>
                  <Button onClick={handleSaveButton}>{t("save")}</Button>
                </div>
                <div>
                  <Button onClick={handleClear}>{t("clear")}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default WrittenRecieptBookEntry;
