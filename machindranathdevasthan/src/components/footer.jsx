import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const FOOTER_LINKS = [
  { key: "privacyPolicy", path: "/privacy-policy" },
  { key: "termsCondition", path: "/terms-conditions" },
  { key: "refundPolicy", path: "/refund-policy" },
];

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <footer className="footerContainer">
      <div className="PolicyContainer">
        <div>&copy; {new Date().getFullYear()} {t("copyright")}</div>

        <div className="footerLinks">
          {FOOTER_LINKS.map((link) => (
            <button
              key={link.key}
              type="button"
              className="footerLinkButton"
              onClick={() => navigate(link.path)}
            >
              {t(link.key)}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
