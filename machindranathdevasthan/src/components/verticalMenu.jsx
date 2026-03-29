import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const VerticalMenu = ({ onSelect }) => {
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
      onSelect?.();
      return;
    }

    navigate(`/trusteeDashboard/${key}`);
    onSelect?.();
  };

  return (
    <div className="verticalMenuContainer">
      {menuItems.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`menu ${active === item.key ? "active" : ""}`}
          onClick={() => handleMenuClick(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default VerticalMenu;
