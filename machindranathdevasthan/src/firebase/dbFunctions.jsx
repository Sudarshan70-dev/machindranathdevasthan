import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
  doc, updateDoc,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../firebase/firestore";
import { CollectionName, DataBaseConstant } from "../constants";

export const getLastDocumentFromDb = async (collectionName) => {
  try {
    const q = query(
      collection(db, collectionName),
      orderBy(DataBaseConstant.createDate, "desc"),
      limit(1),
    );
    const snapshot = await getDocs(q);

    // console.log("snapshot.docs[0].data() is -----> ", snapshot.docs[0].data());
    if (snapshot.empty) return null;
    return snapshot.docs[0].data();
  } catch (error) {
    console.error("Direct Firestore read failed:", error);
    return null;
  }
};

export const getTodayCollectionData = async (collectionName) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const todayDate = Timestamp.fromDate(start);
  const q = query(
    collection(db, collectionName),
    where("created_date", ">=", todayDate),
  );

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => doc.data());
  return data;
};


export const getSingleDocByFieldAndValue = async (collectionName, fieldName , value)=>{

  const q = query(collection(db,collectionName),where(fieldName,"==", value),limit(1));
const querySnapshot = await getDocs(q);

const id = querySnapshot.docs[0].id;
  const data = querySnapshot.docs[0].data();
  return [id,data];

}

export const markVisitVIPPassDocument = async (docId,) => {
  try {
    const docRef = doc(db, CollectionName.vipPass, docId);

    await updateDoc(docRef, {
      [DataBaseConstant.isVisited]: "true",
      [DataBaseConstant.visitDate]: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error updating document:", error);
    return false;
  }
};