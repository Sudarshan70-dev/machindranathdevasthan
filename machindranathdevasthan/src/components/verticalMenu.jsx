import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const VerticalMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: "dashboard", label: t("dashboard") },
    { key: "cashDonation", label: t("cashDonation") },
    { key: "vipPassCheck", label: t("vipPassCheck") },
    { key: "volunteerList", label: t("volunteerList") },
    { key: "writtenReciptCollection", label: t("writtenReciptCollection") },
    { key: "eventAlert", label: t("eventAlert") },
    { key: "reports", label: t("reports") },
  ];

  const getActiveKey = () => {
    if (location.pathname === "/trusteeDashboard") {
      return "dashboard";
    }

    const trusteePrefix = "/trusteeDashboard/";
    if (location.pathname.startsWith(trusteePrefix)) {
      return location.pathname.replace(trusteePrefix, "");
    }

    return "dashboard";
  };

  const active = getActiveKey();

  const handleMenuClick = (key) => {
    if (key === "dashboard") {
      navigate("/trusteeDashboard");
      return;
    }

    navigate(`/trusteeDashboard/${key}`);
  };

  return (
    <div className="verticalMenuContainer">
      {menuItems.map((item) => (
        <div
          key={item.key}
          className={`menu ${active === item.key ? "active" : ""}`}
          onClick={() => handleMenuClick(item.key)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default VerticalMenu;
