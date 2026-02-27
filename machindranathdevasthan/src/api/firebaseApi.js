const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/YOUR_PROJECT_ID/asia-south1"
    : "https://asia-south1-YOUR_PROJECT_ID.cloudfunctions.net";