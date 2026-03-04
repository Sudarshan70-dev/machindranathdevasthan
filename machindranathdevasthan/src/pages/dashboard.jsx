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
import { CollectionName, DataBaseConstant } from "../constants";
import {  getCollectoinTotalDocCount, getTodaysTotalAmount, getTodayTotalRecieptCount } from "../firebase/dbFunctions";
import LoaderOverlay from "../components/loaderOverlay";

const Dashboard = () => {
  const { t } = useTranslation();
  const [view, setView] = useState("monthly");
  const [isLoading, setIsLoading] = useState(false);
  const [totalCashAmount, setTotalCashAmount] = useState(0);
  const [totalCashReciept, setTotalCashReciept] = useState(0);
  const [totalVipPass, setTotalVipPass] = useState(0);
  const [totalVolunteer, setTotalVolunteer] = useState(0);

  const today = new Date();

  const formattedDate = `${today
    .getDate()
    .toString()
    .padStart(2, "0")}/${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${today.getFullYear()}`;

  const monthlyData = [
    { name: "Jan", cash: 12000, online: 8000 },
    { name: "Feb", cash: 15000, online: 9000 },
    { name: "Mar", cash: 18000, online: 11000 },
    { name: "Apr", cash: 10000, online: 7000 },
    { name: "May", cash: 20000, online: 15000 },
    { name: "Jun", cash: 17000, online: 12000 },
    { name: "Jul", cash: 22000, online: 16000 },
    { name: "Aug", cash: 19000, online: 14000 },
    { name: "Sep", cash: 21000, online: 17000 },
    { name: "Oct", cash: 25000, online: 20000 },
    { name: "Nov", cash: 23000, online: 18000 },
    { name: "Dec", cash: 30000, online: 25000 },
     ];

  const yearlyData = [
    { name: "2021", cash: 185000, online: 120000 },
    { name: "2022", cash: 210000, online: 145000 },
    { name: "2023", cash: 235000, online: 170000 },
    { name: "2024", cash: 252000, online: 195000 },
  ];

  useEffect(() => {
    getTodaysData();
  }, []);

  const getTodaysData = async () => {
    setIsLoading(true);
    try {
      

      const cashDonationTotal =  await getTodaysTotalAmount(CollectionName.cashDonation);
      const totalCashReciept = await getTodayTotalRecieptCount(CollectionName.cashDonation);
      const totalVolunteer = await getCollectoinTotalDocCount(CollectionName.volunteers);
      const totalVIPPass = await getCollectoinTotalDocCount(CollectionName.vipPass);
     

      setTotalCashAmount(cashDonationTotal || 0);
      setTotalCashReciept(totalCashReciept || 0);
      setTotalVipPass(totalVIPPass || 0);
      setTotalVolunteer(totalVolunteer || 0);
    } finally {
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
        <div>
          <div className="bodyContainer aboutTempleCard">
            <div className="flexEnd">
              {t("date")}: {formattedDate}
            </div>
            <h1 className="headerColor">{t("welcomeDashboard")}</h1>
          </div>

          <div className="aboutTempleCard">
            <div className="headerTextSize headerColor centerDiv">{t("summary")}</div>
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
                  <div className="centerDiv">RS : 1000</div>
                  <div className="centerDiv">100 {t("receipts")}</div>
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
              <button onClick={() => setView("monthly")}>{t("monthly")}</button>
              <button
                onClick={() => setView("yearly")}
                style={{ marginLeft: "10px" }}
              >
                {t("yearly")}
              </button>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={view === "monthly" ? monthlyData : yearlyData}>
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
