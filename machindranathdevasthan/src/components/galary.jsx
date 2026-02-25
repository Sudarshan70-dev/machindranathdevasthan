import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Img1 from "../assests/img1.jpg";
import Img2 from "../assests/img2.jpg";
import Img3 from "../assests/img3.jpg";
import Img4 from "../assests/img4.jpg";
import Img5 from "../assests/img5.jpg";
import Img6 from "../assests/img6.jpg";
import Img7 from "../assests/img7.jpg";


const galleryImages = [
  Img1,
  Img2,
  Img3,
  Img4,
  Img5,
  Img6,
  Img7
];

export default function Galary() {
  const [activeIndex, setActiveIndex] = useState(null);
  const { t } = useTranslation();

  const closePreview = () => setActiveIndex(null);
  const showPrev = () =>
    setActiveIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  const showNext = () =>
    setActiveIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );

  return (
    <div className="galleryWrapper">
      <h2 className="headerTextSize headerColor centerDiv">{t("galleryTitle")}</h2>

      <div className="galleryGrid">
        {galleryImages.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Gallery ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className="galleryThumb"
          />
        ))}
      </div>

      {activeIndex !== null && (
        <div onClick={closePreview} className="galleryLightbox">
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="galleryNavButton"
          >
            {"<"}
          </button>

          <img
            src={galleryImages[activeIndex]}
            alt={`Preview ${activeIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="galleryPreviewImage"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="galleryNavButton"
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
}
