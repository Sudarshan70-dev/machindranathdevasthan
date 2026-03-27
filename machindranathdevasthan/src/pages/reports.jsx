import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import LoaderOverlay from "../components/loaderOverlay";
import { useTranslation } from "react-i18next";
import MuiTable from "../components/table";
import {
  getDocByFieldAndValue,
  getDocsByDateRange,
  getFirstDocsFromCollection,
} from "../firebase/dbFunctions";
import { CollectionName, DataBaseConstant, ReportType } from "../constants";
import MuiDropdown from "../components/muiDropdown";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "../components/muiButton";
import SearchBar from "../components/searchBar";
import DonationReciept from "../components/reciept";
import { toast } from "react-toastify";

const Reports = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [reportType, setReportType] = useState(ReportType.cashReport);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowsData, setRowsData] = useState([]);
  const [docDataStored, setDocDataStored] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [receiptData, setReceiptData] = useState();
  const [reportReloadKey, setReportReloadKey] = useState(0);

  const nextCursorRef = useRef(null);
  const previousCursorRef = useRef(null);
  const canFetchMoreRef = useRef(true);
  const requestInProgressRef = useRef(false);
  const fullRowsRef = useRef([]);

  const resetReportRows = () => {
    nextCursorRef.current = null;
    previousCursorRef.current = null;
    canFetchMoreRef.current = true;
    fullRowsRef.current = [];
    setDocDataStored([]);
    setRowsData([]);
    setPage(0);
  };

  const getCollectionByReportType = (type) => {
    if (type === ReportType.cashReport) return CollectionName.cashDonation;
    if (type === ReportType.vipPassReport) return CollectionName.vipPass;
    if (type === ReportType.itemsReport) return CollectionName.itemDonation;
    if (type === ReportType.writtenBookReport) return CollectionName.writtenBillBooks
    if (type === ReportType.cashlessReport) return CollectionName.cashlessDonation
  };

  const hasDateRange = Boolean(startDate && endDate);

  const getReportDocs = async (limitCount, startAfterDoc = null) => {
    console.log("report type in getReportDoc ----------> ",reportType)
    const collectionName = getCollectionByReportType(reportType);

    if (hasDateRange) {
      const start =
        typeof startDate?.toDate === "function"
          ? startDate.toDate()
          : startDate;
      const end =
        typeof endDate?.toDate === "function" ? endDate.toDate() : endDate;

      return getDocsByDateRange(
        collectionName,
        start,
        end,
        limitCount,
        startAfterDoc,
      );
    }

    return getFirstDocsFromCollection(
      collectionName,
      limitCount,
      startAfterDoc,
    );
  };

  const handleReportType = async(e) => {
    console.log("report type change ----> ",e.target.value)
    resetReportRows();
    setIsSearchMode(false);
    setReportType(e.target.value);
  };

  const getColumsName = () => {
    const baseColumns = [
      {
        id: DataBaseConstant.receiptNo,
        label: t("recieptNo"),
        minWidth: 20,
        align: "center",
      },
      {
        id: DataBaseConstant.createDate,
        label: t("date"),
        minWidth: 90,
        align: "center",
      },
      {
        id: DataBaseConstant.name,
        label: t("name"),
        minWidth: 150,
        align: "center",
      },
      {
        id: DataBaseConstant.address,
        label: t("addressField"),
        minWidth: 150,
        align: "center",
      },
      {
        id: DataBaseConstant.ammount,
        label: t("amount"),
        minWidth: 50,
        align: "center",
      },
      {
        id: DataBaseConstant.mobileNumber,
        label: t("mobile"),
        minWidth: 70,
        align: "center",
      },
      {
        id: DataBaseConstant.donationType,
        label: t("donationType"),
        minWidth: 70,
        align: "center",
      },
      {
        id: "viewReciept",
        label: t("viewReciept"),
        minWidth: 70,
        align: "center",
      },
    ];

    let columns = [...baseColumns];

    if (reportType === ReportType.itemsReport) {
      const amountIndex = columns.findIndex(
        (col) => col.id === DataBaseConstant.ammount,
      );

      if (amountIndex !== -1) {
        // Remove amount
        columns.splice(amountIndex, 1);

        // Add itemName and itemQty at same position
        columns.splice(
          amountIndex,
          0,
          {
            id: DataBaseConstant.itemName,
            label: t("itemName"),
            minWidth: 120,
            align: "center",
          },
          {
            id: DataBaseConstant.itemQty,
            label: t("itemQty"),
            minWidth: 80,
            align: "center",
          },
        );
      }
    }

    /** add coloums for written bill books report it may caontains counter no, date, bill book amt, bill book opening cloasing no, amount,  */
    if (reportType === ReportType.writtenBookReport) {
      columns = [
      {
        id: DataBaseConstant.counterNo,
        label: t("counterNo"),
        minWidth: 20,
        align: "center",
      },
      {
        id: DataBaseConstant.startDate,
        label: t("startDate"),
        minWidth: 90,
        align: "center",
      },
      {
        id: DataBaseConstant.endDate,
        label: t("endDate"),
        minWidth: 90,
        align: "center",
      },
      {
        id: DataBaseConstant.totalAmt,
        label: t("totalAmt"),
        minWidth: 70,
        align: "center",
      },
    ];
    }

    return columns;
  };

  const columns = getColumsName();

  useEffect(() => {
    loadInitialPage(rowsPerPage);
  }, [reportType, reportReloadKey]);

  const formatTimestampToDate = (value) => {
    if (!value) return "";

    let dateObj = null;

    if (typeof value?.toDate === "function") {
      dateObj = value.toDate();
    } else {
      const parsedDate = dayjs(value);
      if (parsedDate.isValid()) {
        dateObj = parsedDate.toDate();
      }
    }

    if (!dateObj) return "";

    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  const mapDocsToRows = (docSnapshots) => {
    return docSnapshots.map((doc) => {
      const docData = doc.data();


      if(reportType === ReportType.writtenBookReport){
        console.log("doc data is ---> ",docData)
        return{
          id: doc.id,
          ...docData,
          [DataBaseConstant.startDate] : formatTimestampToDate(docData[DataBaseConstant.startDate]),
          [DataBaseConstant.endDate] : formatTimestampToDate(docData[DataBaseConstant.endDate])
        }
      }else{
        console.log("in else docData is ----> ",docData);
        return {
          id: doc.id,
          ...docData,
          [DataBaseConstant.createDate]: formatTimestampToDate(
            docData[DataBaseConstant.createDate],
          ),
        };
      }
    });
  };

  const setVisibleRowsForPage = (targetPage, sourceData, pageSize) => {
    const startIndex = targetPage * pageSize;
    const visibleRows = sourceData.slice(startIndex, startIndex + pageSize);

    setRowsData(visibleRows);
    previousCursorRef.current =
      visibleRows.length > 0 ? visibleRows[0].id : null;
    return visibleRows;
  };

  const loadInitialPage = async (pageSize) => {
    if (requestInProgressRef.current) return;

    requestInProgressRef.current = true;
    setIsLoading(true);
    let firstBatch = [];
    try {
      firstBatch = await getReportDocs(pageSize + 1);

      const mappedRows = mapDocsToRows(firstBatch);

      nextCursorRef.current =
        firstBatch.length > 0 ? firstBatch[firstBatch.length - 1] : null;
      canFetchMoreRef.current = firstBatch.length === pageSize + 1;
      fullRowsRef.current = mappedRows;
      setIsSearchMode(false);
      setDocDataStored(mappedRows);
      setPage(0);
      setVisibleRowsForPage(0, mappedRows, pageSize);
    } catch (e) {
      console.error("error while geting report data-> ", e);
      toast.error(t("noRecordToast"));
    } finally {
      requestInProgressRef.current = false;
      setIsLoading(false);
      console.log("doc data stored is 0------> ",docDataStored)
    }
  };

  const fetchMissingData = async (targetPage, pageSize) => {
    const requiredCount = (targetPage + 1) * pageSize;
    let allRows = [...docDataStored];
    let localNextCursor = nextCursorRef.current;
    let canFetchMore = canFetchMoreRef.current;

    while (allRows.length < requiredCount && canFetchMore) {
      const nextBatch = await getReportDocs(pageSize, localNextCursor);

      if (nextBatch.length === 0) {
        canFetchMore = false;
        break;
      }

      localNextCursor = nextBatch[nextBatch.length - 1];
      const existingIds = new Set(allRows.map((row) => row.id));
      const mappedRows = mapDocsToRows(nextBatch);

      mappedRows.forEach((row) => {
        if (!existingIds.has(row.id)) {
          allRows.push(row);
          existingIds.add(row.id);
        }
      });

      canFetchMore = nextBatch.length === pageSize;
    }

    nextCursorRef.current = localNextCursor;
    canFetchMoreRef.current = canFetchMore;
    fullRowsRef.current = allRows;
    setDocDataStored(allRows);

    return allRows;
  };

  const handleChangePage = async (_event, newPage) => {
    if (requestInProgressRef.current) return;

    if (isSearchMode) {
      const startIndex = newPage * rowsPerPage;
      if (startIndex >= docDataStored.length) return;
      setPage(newPage);
      setVisibleRowsForPage(newPage, docDataStored, rowsPerPage);
      return;
    }

    if (newPage < page) {
      setPage(newPage);
      setVisibleRowsForPage(newPage, docDataStored, rowsPerPage);
      return;
    }

    const requiredCount = (newPage + 1) * rowsPerPage;
    let sourceRows = docDataStored;

    if (sourceRows.length < requiredCount) {
      requestInProgressRef.current = true;
      setIsLoading(true);

      try {
        sourceRows = await fetchMissingData(newPage, rowsPerPage);
      } finally {
        requestInProgressRef.current = false;
        setIsLoading(false);
      }
    }

    const firstIndex = newPage * rowsPerPage;

    if (firstIndex >= sourceRows.length) {
      return;
    }

    setPage(newPage);
    setVisibleRowsForPage(newPage, sourceRows, rowsPerPage);
  };

  const handleChangeRowsPerPage = async (event) => {
    const number = Number(event.target.value);
    setRowsPerPage(number);

    if (isSearchMode) {
      setPage(0);
      setVisibleRowsForPage(0, docDataStored, number);
      return;
    }

    nextCursorRef.current = null;
    previousCursorRef.current = null;
    canFetchMoreRef.current = true;

    setDocDataStored([]);
    setRowsData([]);
    setPage(0);

    await loadInitialPage(number);
  };

  const handleGetReport = async() => {
    setIsSearchMode(false);
    await loadInitialPage(rowsPerPage);
  };

  const handleCancle = async () => {
    setStartDate(null);
    setEndDate(null);
    setSearchValue("");
    setIsSearchMode(false);
    setReceiptData(null);
    resetReportRows();

    if (reportType === ReportType.cashReport) {
      setReportReloadKey((previous) => previous + 1);
      return;
    }

    setReportType(ReportType.cashReport);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = async () => {
    const normalizedSearch = String(searchValue ?? "").trim();

    if (!normalizedSearch) {
      setIsSearchMode(false);
      setDocDataStored(fullRowsRef.current);
      setPage(0);
      setVisibleRowsForPage(0, fullRowsRef.current, rowsPerPage);
      return;
    }

    const searchText = normalizedSearch.toLowerCase();
    const localMatches = fullRowsRef.current.filter((row) => {
      const receiptNo = String(
        row[DataBaseConstant.receiptNo] ?? "",
      ).toLowerCase();
      const mobileNumber = String(
        row[DataBaseConstant.mobileNumber] ?? "",
      ).toLowerCase();

      return (
        receiptNo.includes(searchText) || mobileNumber.includes(searchText)
      );
    });

    if (localMatches.length > 0) {
      setIsSearchMode(true);
      setDocDataStored(localMatches);
      setPage(0);
      setVisibleRowsForPage(0, localMatches, rowsPerPage);
      return;
    }

    const collectionName = getCollectionByReportType(reportType);
    setIsLoading(true);

    try {
      const parsedNumber = Number(normalizedSearch);
      const shouldTryNumber = Number.isFinite(parsedNumber);

      let queryPromises = [
        getDocByFieldAndValue(
          collectionName,
          DataBaseConstant.receiptNo,
          normalizedSearch,
        ),
        getDocByFieldAndValue(
          collectionName,
          DataBaseConstant.mobileNumber,
          normalizedSearch,
        ),
      ];

      if(reportType === ReportType.writtenBookReport){
        queryPromises = [
        getDocByFieldAndValue(
          collectionName,
          DataBaseConstant.counterNo,
          normalizedSearch,
        )]
      }

      if (shouldTryNumber) {
        queryPromises.push(
          getDocByFieldAndValue(
            collectionName,
            DataBaseConstant.receiptNo,
            parsedNumber,
          ),
        );
        queryPromises.push(
          getDocByFieldAndValue(
            collectionName,
            DataBaseConstant.mobileNumber,
            parsedNumber,
          ),
        );
      }

      const queryResults = await Promise.all(queryPromises);

      const mergedDocMap = new Map();
      queryResults.flat().forEach((docSnapshot) => {
        if (!docSnapshot?.id) return;
        mergedDocMap.set(docSnapshot.id, docSnapshot);
      });

      const mappedRows = mapDocsToRows(Array.from(mergedDocMap.values()));
      setIsSearchMode(true);
      setDocDataStored(mappedRows);
      setPage(0);
      setVisibleRowsForPage(0, mappedRows, rowsPerPage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewReciept = (data) => {
    console.log("handleViewReciept is clicked ----> ", data);
    setReceiptData(data);
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
        <h1 className="headerTextSize headerColor centerDiv">{t("reports")}</h1>

        <div className="bodyContainer aboutTempleCard">
          <div>
            <div className="reportSearchAndDropdownContainer">
              <div style={{ minWidth: "40%" }}>
                <MuiDropdown
                  id="typesOfReports"
                  label={t("typesOfReport")}
                  value={reportType}
                  handleChange={handleReportType}
                  options={[
                    {
                      label: t("cashlessReport"),
                      value: ReportType.cashlessReport,
                    },
                    {
                      label: t("cashReport"),
                      value: ReportType.cashReport,
                    },
                    {
                      label: t("vipPassReport"),
                      value: ReportType.vipPassReport,
                    },
                    {
                      label: t("writtenBookReport"),
                      value: ReportType.writtenBookReport,
                    },
                    {
                      label: t("itemsReport"),
                      value: ReportType.itemsReport,
                    },
                  ]}
                ></MuiDropdown>
              </div>

              <SearchBar
                placeholder={t("searchRecieptPlaceholder")}
                value={searchValue}
                onChange={handleSearch}
                onClick={handleSearchClick}
              ></SearchBar>
            </div>

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
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </LocalizationProvider>

              <Button onClick={handleGetReport}>{t("getReport")}</Button>
              <Button onClick={handleCancle}>{t("cancle")}</Button>
            </div>
            <div className="centerDiv">
              <MuiTable
                columns={columns}
                rows={rowsData}
                rowsPerPageOptions={[10, 25, 50]}
                rowsPerPage={rowsPerPage}
                page={page}
                docCount={docDataStored.length}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleViewReciept={handleViewReciept}
                reportType = {reportType}
              ></MuiTable>
            </div>
          </div>
        </div>
        {receiptData && <DonationReciept data={receiptData} />}
      </motion.div>
    </>
  );
};

export default Reports;
