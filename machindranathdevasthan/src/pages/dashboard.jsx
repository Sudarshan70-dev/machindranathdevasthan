import React, { useEffect, useState } from "react";
import "../style.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CollectionName, DataBaseConstant, month } from "../constants";
import {
  getCollectoinTotalDocCount,
  getDailyAmtData,
  getMonthlyAmtData,
  getTodaysTotalAmount,
  getTodayTotalRecieptCount,
} from "../firebase/dbFunctions";
import LoaderOverlay from "../components/loaderOverlay";

const Dashboard = () => {
  const { t } = useTranslation();
  const [view, setView] = useState("daily");
  const [isLoading, setIsLoading] = useState(false);
  const [totalCashAmount, setTotalCashAmount] = useState(0);
  const [totalCashReciept, setTotalCashReciept] = useState(0);
  const [totalVipPass, setTotalVipPass] = useState(0);
  const [totalVolunteer, setTotalVolunteer] = useState(0);
  const [totalCashlessAmount, setTotalCashlessAmount] = useState(0);
  const [totalCashlessReciept, setTotalCashlessReciept] = useState(0);
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const today = new Date();

  const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
    today.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${today.getFullYear()}`;

  useEffect(() => {
    getTodaysData();
    createGraphData();
  }, []);

  const getTodaysData = async () => {
    setIsLoading(true);
    try {
      const cashDonationTotal = await getTodaysTotalAmount(
        CollectionName.cashDonation,
      );
      const totalCashReciept = await getTodayTotalRecieptCount(
        CollectionName.cashDonation,
      );
      const cashlessDonationTotal = await getTodaysTotalAmount(
        CollectionName.cashlessDonation,
      );
      const totalCashlessReciept = await getTodayTotalRecieptCount(
        CollectionName.cashlessDonation,
      );
      const totalVolunteer = await getCollectoinTotalDocCount(
        CollectionName.volunteers,
      );
      const totalVIPPass = await getCollectoinTotalDocCount(
        CollectionName.vipPass,
      );

      setTotalCashAmount(cashDonationTotal || 0);
      setTotalCashReciept(totalCashReciept || 0);
      setTotalVipPass(totalVIPPass || 0);
      setTotalVolunteer(totalVolunteer || 0);
      setTotalCashlessReciept(totalCashlessReciept || 0);
      setTotalCashlessAmount(cashlessDonationTotal || 0);
    } finally {
      setIsLoading(false);
    }
  };

  /** calculate all data for graph */

  const createGraphData = async () => {
    const monthlyDataQuerySnapshotDocsArr = await getMonthlyAmtData();
    const dailyDataQuerySnapshotDocsArr = await getDailyAmtData();

    /** create an array of object of daily amount to show in graph */
    const dailyData = dailyDataQuerySnapshotDocsArr.map((doc) => {
      const data = doc.data();
      const id = doc.id;

      const name = id.split("-")[2];

      return {
        name: name,
        cash: data?.[DataBaseConstant.totalCashAmt] || 0,
        online: data?.[DataBaseConstant.totalCashlessAmt] || 0,
      };
    });
    setDailyData(dailyData);

    /** create an array of object of monthly amount to show in graph */
    const monthlyData = monthlyDataQuerySnapshotDocsArr.map((doc) => {
      const data = doc.data();
      const id = doc.id;

      const name = month[parseInt(id.split("-")[1]) - 1];

      return {
        name: name,
        cash: data?.[DataBaseConstant.totalCashAmt] || 0,
        online: data?.[DataBaseConstant.totalCashlessAmt] || 0,
      };
    });
    setMonthlyData(monthlyData);
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
        <div>
          <div className="bodyContainer aboutTempleCard">
            <div className="flexEnd">
              {t("date")}: {formattedDate}
            </div>
            <h1 className="headerColor">{t("welcomeDashboard")}</h1>
          </div>

          <div className="aboutTempleCard">
            <div className="headerTextSize headerColor centerDiv">
              {t("summary")}
            </div>
            <div className="dashboardSummaryWrapper">
              <div className="dashboardSummaryGrid">
                <div className="dashboardSummaryCard">
                  <div className="cardTextHeader">{t("cashDonation")}</div>
                  <div className="centerDiv">RS : {totalCashAmount}</div>
                  <div className="centerDiv">
                    {totalCashReciept} {t("receipts")}
                  </div>
                </div>
                <div className="dashboardSummaryCard">
                  <div className="cardTextHeader">{t("onlineDonation")}</div>
                  <div className="centerDiv">RS : {totalCashlessAmount}</div>
                  <div className="centerDiv">
                    {totalCashlessReciept} {t("receipts")}
                  </div>
                </div>
                <div className="dashboardSummaryCard">
                  <div className="cardTextHeader">{t("totalVolunteer")}</div>
                  <div className="centerDiv">{totalVolunteer}</div>
                </div>
                <div className="dashboardSummaryCard">
                  <div className="cardTextHeader">{t("totalVipPasses")}</div>
                  <div className="centerDiv">{totalVipPass}</div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              width: "90%",
              height: 400,
              background: "#fdd7a9",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "20px",
            }}
          >
            <div>
              <button onClick={() => setView("daily")}>{t("daily")}</button>
              <button
                onClick={() => setView("yearly")}
                style={{ marginLeft: "10px" }}
              >
                {t("monthly")}
              </button>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={view === "daily" ? dailyData : monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#eee"
                />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `Rs ${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend iconType="circle" />
                <Line
                  type="monotone"
                  dataKey="cash"
                  name="Cash Donation"
                  stroke="#FF7700"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="online"
                  name="Online Donation"
                  stroke="#1976D2"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Dashboard;
