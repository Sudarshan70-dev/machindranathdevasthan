import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import LoaderOverlay from "../components/loaderOverlay";
import { useTranslation } from "react-i18next";
import MuiTable from "../components/table";
import { getFirstDocsFromCollection } from "../firebase/dbFunctions";
import { CollectionName, DataBaseConstant } from "../constants";


const VolunteersList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowsData, setRowsData] = useState([]);
  const [docDataStored, setDocDataStored] = useState([]);

  const nextCursorRef = useRef(null);
  const previousCursorRef = useRef(null);
  const canFetchMoreRef = useRef(true);
  const requestInProgressRef = useRef(false);

  const { t } = useTranslation();

  const mapDocsToRows = (docSnapshots) => {
    return docSnapshots.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  const setVisibleRowsForPage = (targetPage, sourceData, pageSize) => {
    const startIndex = targetPage * pageSize;
    const visibleRows = sourceData.slice(startIndex, startIndex + pageSize);

    setRowsData(visibleRows);
    previousCursorRef.current = visibleRows.length > 0 ? visibleRows[0].id : null;
    return visibleRows;
  };

  const loadInitialPage = async (pageSize) => {
    if (requestInProgressRef.current) return;

    requestInProgressRef.current = true;
    setIsLoading(true);

    try {
      const firstBatch = await getFirstDocsFromCollection(
        CollectionName.volunteers,
        pageSize + 1,
      );

      const mappedRows = mapDocsToRows(firstBatch);

      nextCursorRef.current = firstBatch.length > 0 ? firstBatch[firstBatch.length - 1] : null;
      canFetchMoreRef.current = firstBatch.length === pageSize + 1;

      setDocDataStored(mappedRows);
      setPage(0);
      setVisibleRowsForPage(0, mappedRows, pageSize);
    } finally {
      requestInProgressRef.current = false;
      setIsLoading(false);
    }
  };

  const fetchMissingData = async (targetPage, pageSize) => {
    const requiredCount = (targetPage + 1) * pageSize;
    let allRows = [...docDataStored];
    let localNextCursor = nextCursorRef.current;
    let canFetchMore = canFetchMoreRef.current;

    while (allRows.length < requiredCount && canFetchMore) {
      const nextBatch = await getFirstDocsFromCollection(
        CollectionName.volunteers,
        pageSize,
        localNextCursor,
      );

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
    setDocDataStored(allRows);

    return allRows;
  };

  useEffect(() => {
    loadInitialPage(rowsPerPage);
  }, []);

  const columns = [
    { id: DataBaseConstant.name, label: t("name"), minWidth: 120, align: "center" },
    { id: DataBaseConstant.address, label: t("addressField"), minWidth: 170, align: "center" },
    {
      id: DataBaseConstant.age,
      label: t("age"),
      minWidth: 50,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: DataBaseConstant.mobileNumber,
      label: t("mobile"),
      minWidth: 100,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: DataBaseConstant.uidNo,
      label: t("uidNo"),
      minWidth: 100,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  const handleChangePage = async (_event, newPage) => {
    if (requestInProgressRef.current) return;

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

    nextCursorRef.current = null;
    previousCursorRef.current = null;
    canFetchMoreRef.current = true;

    setDocDataStored([]);
    setRowsData([]);
    setPage(0);

    await loadInitialPage(number);
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
          {t("volunteerList")}
        </h1>

        <div className="bodyContainer aboutTempleCard">
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
            ></MuiTable>
          </div>

        </div>
      </motion.div>
    </>
  );
};

export default VolunteersList;
