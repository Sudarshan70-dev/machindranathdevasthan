import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import receiptBg from "../assets/pavati.jpeg";
// import "./TempleReceipt.css";

const TempleReceipt = () => {
  const receiptRef = useRef();

const data1 = {
    receiptNo: 270,
    date: "15/02/2026",
    name: "विश्वनाथ पाटील",
    address: "वडगांव, मालेगांव",
    amount: 15000,
    paymentMode: "रोख",
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(receiptRef.current, {
      scale: 3,
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const pdf = new jsPDF({
      orientation: imgWidth > imgHeight ? "landscape" : "portrait",
      unit: "px",
      format: [imgWidth, imgHeight], // ✅ exact size
    });

    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
    pdf.save(`Receipt-${data1.receiptNo}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="action-buttons">
        <button onClick={downloadPDF}>Download PDF</button>
        <button onClick={handlePrint}>Print</button>
      </div>

      <div className="receipt-wrapper" ref={receiptRef}>
        
        <div className="receipt-no">{data1.receiptNo}</div>

        <div className="receipt-date">{data1.date}</div>

        <div className="receipt-name">{data1.name}</div>

        <div className="receipt-address">{data1.address}</div>

        <div className="receipt-amount">₹ {data1.amount}</div>

        <div className="receipt-payment">{data1.paymentMode}</div>

      </div>
    </>
  );
};

export default TempleReceipt;