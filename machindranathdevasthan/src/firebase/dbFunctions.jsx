import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firestore";
import { DataBaseConstant } from "../constants";

export const getLastReceiptDirectFromDb = async (collectionName) => {
  try {
    const q = query(
      collection(db, collectionName),
      orderBy(DataBaseConstant.createDate, "desc"),
      limit(1),
    );
    const snapshot = await getDocs(q);

    console.log("snapshot.docs[0].data() is -----> ", snapshot.docs[0].data());
    if (snapshot.empty) return null;
    return snapshot.docs[0].data();
  } catch (error) {
    console.log("Direct Firestore read failed:", error);
    return null;
  }
};

export const getCollectionDataByDate = async (collectionName) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const todayDate = Timestamp.fromDate(start);
  console.log("todayDate is --> ",todayDate)
  const q = query(
    collection(db, collectionName),
    where("created_date", ">=", todayDate),
  );

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => doc.data());
  console.log("data got -----> ",data)
  return data;
};
