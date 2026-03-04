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
  startAfter
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


// const columns = [
//   { id:DataBaseConstant.name, label: t("name"), minWidth: 120 ,align :"center" },
//   { id: "address", label: t("addressField"), minWidth: 170, align :"center"  },
//   {
//     id: DataBaseConstant.age,
//     label: t("age"),
//     minWidth: 50,
//     align: 'center',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: DataBaseConstant.mobileNumber,
//     label: t("mobile"),
//     minWidth: 100,
//     align: 'center',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: DataBaseConstant.uidNo,
//     label: t("uidNo"),
//     minWidth: 100,
//     align: 'center',
//     format: (value) => value.toLocaleString('en-US'),
//   },
// ];