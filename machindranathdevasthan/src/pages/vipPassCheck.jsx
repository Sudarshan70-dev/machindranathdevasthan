import React, { useState } from "react";
import { motion } from "framer-motion";
import { CollectionName, DataBaseConstant, DonationType } from "../constants";
import LoaderOverlay from "../components/loaderOverlay";
import { useTranslation } from "react-i18next";
import SearchBox from "../components/searchBar";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import { getSingleDocByFieldAndValue,markVisitVIPPassDocument } from "../firebase/dbFunctions";
import Button from "../components/muiButton";
import { toast } from "react-toastify";


const VipPassCheck = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [docId, setDocId] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);
  const [passData, setPassData] = useState(
   {
            [DataBaseConstant.name]: "",
            [DataBaseConstant.mobileNumber]: "",
            [DataBaseConstant.address]: "",
            [DataBaseConstant.age]: "",
            [DataBaseConstant.receiptNo]: 0,
            [DataBaseConstant.donationType]: DonationType.vipPass,
            
          }
  );


  const handleSearchInput = (e) => {
    const intValue = e.target.value || "";
    setSearchValue(intValue);
  };

  const handleSearchButton =async () => {
    setIsLoading(true);
    
    try {
        const docs = await getSingleDocByFieldAndValue(CollectionName.vipPass,DataBaseConstant.receiptNo,parseInt(searchValue));
        console.log("docs is ---> ",docs)
        setDocId(docs[0]);
        setPassData(docs[1]);
        if(docs[1][DataBaseConstant.isVisited] ==="true"){
            setBtnDisable(true);
        }else{
        setBtnDisable(false);
        }
    } catch (error) {
        toast.error(t("noRecordToast"));
        console.error("error while searching vip pass -->",error)
        setBtnDisable(false);
    }finally{
        setIsLoading(false);
    }


  };


  const handleVisitMark = async () =>{
    setIsLoading(true);
    try {
        const responce = await markVisitVIPPassDocument(docId);
        if(responce){
            toast.success(t("passVisitMarkToast"));
        }else{
            toast.error(t("passVisitMarkErrToast"))
        }
        setBtnDisable(true);
    } catch (error) {
        toast.error(t("passVisitMarkErrToast"))
        setBtnDisable(false);
    }finally{
        setIsLoading(false);
    }
  }

  

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
          {t("vipPassCheck")}
        </h1>
        <div className="bodyContainer aboutTempleCard">
          <div className="centerDiv">
            <SearchBox
              placeholder={t("searchPlaceholder")}
              onChange={handleSearchInput}
              onClick={handleSearchButton}
              value={searchValue}
            ></SearchBox>
          </div>
          <div className="centerDiv">
          <Card
            sx={{
              minWidth: 400,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              padding: 1,
              margin : "10px"
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
              >
                {t("passInformation")}
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                <Typography>
                  <strong>{t("name")}:</strong> {passData[DataBaseConstant.name]}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                <Typography>
                  <strong>{t("age")}:</strong> {passData[DataBaseConstant.age]}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                <Typography>
                  <strong>{t("addressField")}:</strong> {passData[DataBaseConstant.address]}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>
                  <strong>{t("mobile")}:</strong> {passData[DataBaseConstant.mobileNumber]}
                </Typography>
              </Box>
              {passData[DataBaseConstant.isVisited] && passData[DataBaseConstant.visitDate]? <>
              
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>
                  <strong>{t("visited")}:</strong> {passData[DataBaseConstant.isVisited] || "No"}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>
                  <strong>{t("visitDate")}:</strong> {passData[DataBaseConstant.visitDate].toDate().toLocaleString() || "No"}
                </Typography>
              </Box>
              </>:<></>}
            </CardContent>
          </Card>

          </div>

                <div className="centerDiv">
                    <Button
                    onClick={handleVisitMark}
                    disabled={btnDisable}
                    >{t("visitMark")}</Button>
                </div>

        </div>
      </motion.div>
    </>
  );
};

export default VipPassCheck;
