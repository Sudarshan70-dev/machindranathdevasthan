import React, { useRef } from "react";
import "../style.css";
import Logo from "../assests/Logo.png";
import { DataBaseConstant, DonationType } from "../constants";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toMarathiWords } from "../utils/amountToMarathiWords";

const DevasthanReceipt = ({ data }) => {
  const receiptRef = useRef();
  const today = new Date();

  const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`;

  const printPDFDirectly = async (downloadStatus) => {
    const element = receiptRef.current;

    // 1. Capture the element as a canvas
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");

    // 2. Create the PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a5",
    });

    
    const imgWidth = 146;
    const imgHeight = 98;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    // 3. Convert PDF to a Blob URL
    const pdfBlob = pdf.output("bloburl");

    // 4. Create a hidden iframe to trigger print
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = pdfBlob;
    document.body.appendChild(iframe);

     /* ---------------------------------- */
    /*           DOWNLOAD MODE            */
    /* ---------------------------------- */
    if (downloadStatus) {
      pdf.save(`Receipt-${data?.receiptNo || Date.now()}.pdf`);
      return;
    }

    /* ---------------------------------- */
    /*             PRINT MODE             */
    /* ---------------------------------- */
    // 5. Trigger print once loaded
    iframe.onload = () => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    };
  };

  return (
    <div className="receipt-main-wrapper">
     {/* {console.log("data is in recipt  ----> ", data)} */}
      <div className="receipt-card-container" ref={receiptRef}>
        {/* Background Watermark Image */}
        <div className="receipt-watermark"></div>

        <div className="receipt-inner-content">
          {/* Header Section */}
          <div className="receipt-header">
            <div className="header-branding">
              <img src={Logo} alt="Temple Logo" className="temple-logo-img" />
              <div className="temple-title-box">
                <h1 className="temple-name-hi">
                  श्री क्षेत्र मच्छिंद्रनाथ देवस्थान
                </h1>
                <p className="temple-sub-text">
                  मौ. सावरगाव, ता. आष्टी, जि. बीड. ४१४२०३.
                </p>
                <p className="temple-sub-text">
                  न्यास. नों. क्र. ए. १२७६ बीड
                </p>
                <p className="temple-contact">मोबाईल : +91 9423116214 / +91 7798750075</p>
              </div>
            </div>
            <div className="header-meta">
              <p>
                दिनांक: <span className="data-highlight">{data[DataBaseConstant.createDate] || formattedDate}</span>
              </p>
              <p>
                पावती नं: <span className="data-highlight">{data[DataBaseConstant.receiptNo]}</span>
              </p>
            </div>
          </div>

          <div className="fund-tag">{data[DataBaseConstant.donationType]}</div>

          {/* Body Section */}
          <div className="receipt-form">
            <div className="form-row">
              <span className="form-label">श्रीमान दानशूर :</span>
              <span className="form-value">{data.full_name}</span>
            </div>

            <div className="form-row">
              <span className="form-label">पत्ता :</span>
              <span className="form-value">{data.address}</span>
            </div>

            {data[DataBaseConstant.donationType] === DonationType.itemDonation ? (
              <div className="form-row">
                <span className="form-label">वस्तु :</span>
                <span className="form-value amount-text">
                  {data[DataBaseConstant.itemName]}
                </span>
                <span className="form-label" style={{ marginLeft: "20px" }}>
                  नग :
                </span>
                <span className="form-value marathi-words">{data[DataBaseConstant.itemQty]}</span>
              </div>
            ) : data[DataBaseConstant.donationType] === DonationType.vipPass ? (
              <div>

              <div className="form-row">
                <span className="form-label">वय :</span>
                <span className="form-value">
                  {data[DataBaseConstant.age]}
                </span>
                <span className="form-label" style={{ marginLeft: "20px" }}>
                  पास रु. :
                </span>
                <span className="form-value amount-text">
                  ₹ 200 /-
                </span>
              </div>
                <span className="form-label">सूचना: कृपया आपला VIP  दर्शन पास डाउनलोड करुन ठेवा.</span>
              </div>
            )
             : (
              <div className="form-row">
                <span className="form-label">देणगी रु. :</span>
                <span className="form-value amount-text">
                  ₹ {data.amount}/-
                </span>
                <span className="form-label" style={{ marginLeft: "20px" }}>
                  अक्षरी :
                </span>
                <span className="form-value marathi-words">
                  {toMarathiWords(data.amount)}
                </span>
              </div>
            )
            
            }
          </div>

          {/* Footer Section */}
          <div className="receipt-bottom">
            <div className="footer-note">
              <small>सूचना: ही संगणकीय पावती आहे.</small>
            </div>
          </div>
        </div>
      </div>

      <button className="no-print-btn" onClick={()=>printPDFDirectly(false)}>
        Print Receipt (पावती प्रिंट करा)
      </button>
      <button className="no-print-btn" onClick={()=>printPDFDirectly(true)}>
        Download Receipt (पावती डाउनलोड करा)
      </button>
    </div>
  );
};

export default DevasthanReceipt;
