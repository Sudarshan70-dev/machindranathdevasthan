import React, { useEffect, useState } from "react";
import "../style.css";
import { useTranslation } from "react-i18next";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Logo from "../assests/Logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/auth";

const LANGUAGE_OPTIONS = [
  { code: "en", label: "English" },
  { code: "mr", label: "Marathi" },
  { code: "hi", label: "Hindi" },
];

const PUBLIC_NAV_ITEMS = [
  { key: "home", labelKey: "home", path: "/" },
  { key: "about", labelKey: "about", path: "/about" },
  {
    key: "nathpanthAbout",
    labelKey: "nathpanthAbout",
    path: "/aboutNath",
    activePaths: ["/aboutNath", "/nathpanthAbout"],
  },
  { key: "donation", labelKey: "donation", path: "/donation" },
  {
    key: "sevaBooking",
    labelKey: "sevaBooking",
    path: "/volunteerRegistration",
  },
  { key: "login", labelKey: "login", path: "/trustee-login" },
];

const isPathActive = (pathname, paths) =>
  paths.some((path) =>
    path === "/"
      ? pathname === path
      : pathname === path || pathname.startsWith(`${path}/`)
  );

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeLanguage =
    i18n.resolvedLanguage?.split("-")[0] ?? i18n.language?.split("-")[0];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/trustee-login");
    } catch (error) {
      console.error("error while logout", error);
    }
  };

  const handleNavigation = (action) => {
    setIsMobileMenuOpen(false);
    action();
  };

  const showMobileMenuToggle = !currentUser;

  const navigationItems = currentUser
    ? [
        {
          key: "logout",
          label: t("logout", { defaultValue: "Logout" }),
          onClick: handleLogout,
          isActive: false,
        },
      ]
    : PUBLIC_NAV_ITEMS.map((item) => ({
        key: item.key,
        label: t(item.labelKey),
        onClick: () => navigate(item.path),
        isActive: isPathActive(location.pathname, item.activePaths ?? [item.path]),
      }));

  return (
    <nav className="navBar headerColor">
      <div className="navBarTopRow">
        <div className="langaugeSelector" aria-label="Language selector">
          {LANGUAGE_OPTIONS.map((language, index) => (
            <React.Fragment key={language.code}>
              <button
                type="button"
                className={`languageButton ${
                  activeLanguage === language.code ? "active" : ""
                }`}
                onClick={() => i18n.changeLanguage(language.code)}
              >
                {language.label}
              </button>
              {index < LANGUAGE_OPTIONS.length - 1 ? (
                <span className="languageDivider" aria-hidden="true">
                  |
                </span>
              ) : null}
            </React.Fragment>
          ))}
        </div>

        {showMobileMenuToggle ? (
          <button
            type="button"
            className="mobileMenuToggle"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="primary-navigation"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? (
              <CloseRoundedIcon fontSize="small" />
            ) : (
              <MenuRoundedIcon fontSize="small" />
            )}
          </button>
        ) : (
          <button
            type="button"
            className="mobileQuickAction"
            onClick={handleLogout}
          >
            {t("logout", { defaultValue: "Logout" })}
          </button>
        )}
      </div>

      <div className="headerPositioning">
        <img className="logo-circle" src={Logo} alt="Temple logo" />

        <div className="headerContainerWidth">
          <div className="devasthanName">{t("devasthanName")}</div>

          <div className="addressContainer">
            <div>{t("address")}</div>
            <div>{t("trustNo")}</div>
          </div>

          <div
            id="primary-navigation"
            className={`navigationTabs navTitle ${
              isMobileMenuOpen ? "mobileOpen" : ""
            }`}
          >
            {navigationItems.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`navAction ${item.isActive ? "active" : ""}`}
                aria-current={item.isActive ? "page" : undefined}
                onClick={() => handleNavigation(item.onClick)}
              >
                <span className="navActionText">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
