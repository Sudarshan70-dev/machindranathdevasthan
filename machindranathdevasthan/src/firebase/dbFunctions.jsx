import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
  doc,
  updateDoc,
  serverTimestamp,
  getAggregateFromServer,
  sum,
  getCountFromServer,
  limit as limitFn,
  startAfter,
  setDoc
} from "firebase/firestore";
import { db } from "../firebase/firestore";
import { CollectionName, DataBaseConstant } from "../constants";

export const getLastDocumentFromDb = async (collectionName) => {
  try {
    const q = query(
      collection(db, collectionName),
      orderBy(DataBaseConstant.createDate, "desc"),
      limitFn(1),
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

export const getSingleDocByFieldAndValue = async (
  collectionName,
  fieldName,
  value,
) => {
  const q = query(
    collection(db, collectionName),
    where(fieldName, "==", value),
    limitFn(1),
  );
  const querySnapshot = await getDocs(q);

  const id = querySnapshot.docs[0].id;
  const data = querySnapshot.docs[0].data();
  return [id, data];
};

export const markVisitVIPPassDocument = async (docId) => {
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

export const getFirstDocsFromCollection = async (
  collectionName,
  limitCount,
  startAfterDoc = null,
) => {
  try {
    const queryConstraints = [
      orderBy(DataBaseConstant.createDate, "desc"),
      limitFn(limitCount),
    ];

    if (startAfterDoc) {
      queryConstraints.push(startAfter(startAfterDoc));
    }

    const q = query(collection(db, collectionName), ...queryConstraints);
    const snapshot = await getDocs(q);

    if (snapshot.empty) return [];
    return snapshot.docs;
  } catch (error) {
    console.error("Direct Firestore read failed:", error);
    return [];
  }
};

export const getDocsByDateRange = async (
  collectionName,
  startDate,
  endDate,
  limitCount = null,
  startAfterDoc = null,
) => {
  try {
    let normalizedStartDate = new Date(startDate);
    let normalizedEndDate = new Date(endDate);

    normalizedStartDate.setHours(0, 0, 0, 0);
    normalizedEndDate.setHours(23, 59, 59, 999);

    if (normalizedStartDate > normalizedEndDate) {
      const temp = normalizedStartDate;
      normalizedStartDate = normalizedEndDate;
      normalizedEndDate = temp;
    }

    const queryConstraints = [
      where(
        DataBaseConstant.createDate,
        ">=",
        Timestamp.fromDate(normalizedStartDate),
      ),
      where(
        DataBaseConstant.createDate,
        "<=",
        Timestamp.fromDate(normalizedEndDate),
      ),
      orderBy(DataBaseConstant.createDate, "desc"),
    ];

    if (startAfterDoc) {
      queryConstraints.push(startAfter(startAfterDoc));
    }

    if (limitCount) {
      queryConstraints.push(limitFn(limitCount));
    }

    const q = query(collection(db, collectionName), ...queryConstraints);
    const snapshot = await getDocs(q);

    if (snapshot.empty) return [];
    return snapshot.docs;
  } catch (error) {
    console.error("Date range read failed:", error);
    return [];
  }
};

export const getTodaysTotalAmount = async (collectionName) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const todayDate = Timestamp.fromDate(start);
    const q = query(
      collection(db, collectionName),
      where("created_date", ">=", todayDate),
    );

    const snapshot = await getAggregateFromServer(q, {
      [DataBaseConstant.ammount]: sum("amount"),
    });

    
    return snapshot.data()[DataBaseConstant.ammount];
  } catch (e) {
    console.error("error in total ---> ", e);
  }
};


export const getCollectoinTotalDocCount = async (collectonName) =>{
  try {

    const q = query(collection(db, collectonName));

  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;

  } catch (error) {
    console.error("error while getTodayTotalRecieptCount --> ",error);
  }
}

export const getTodayTotalRecieptCount = async (collectonName) =>{
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const todayDate = Timestamp.fromDate(start);

    const q = query(collection(db, collectonName),
      where("created_date", ">=" , todayDate)
  );

  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;

  } catch (error) {
    console.error("error while getTodayTotalRecieptCount --> ",error);
  }
}

export const getDocByFieldAndValue = async (
  collectionName,
  fieldName,
  value,
) => {
  const q = query(
    collection(db, collectionName),
    where(fieldName, "==", value),
  );
  const querySnapshot = await getDocs(q);

  
  return querySnapshot.docs;
};


export const updateVipPassDate = async(data)=>{

  const docRef = doc(db,CollectionName.eventManage,CollectionName.vipPassDateDocId)

  await setDoc(docRef,data,{merge:true});
}

export const updateEventDate = async(data,eventName)=>{

  const docRef = doc(db,CollectionName.eventManage,eventName)

  await setDoc(docRef,data,{merge:true});
}