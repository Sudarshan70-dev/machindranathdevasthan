export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/shri-machindranath-devasthan/asia-south1"
    : "https://asia-south1-shri-machindranath-devasthan.cloudfunctions.net";


export const submitVolunteer =async (data)=>{
  const responce = await fetch(`${BASE_URL}/registerVolunteer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return responce.json();

}
export const addCashItemDonation =async (data)=>{
  const responce = await fetch(`${BASE_URL}/addCashItemDonation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return responce.json();

}

export const vipPassCreation = async (data) =>{
  const responce = await fetch(`${BASE_URL}/vipPassCreation`,{
    method:"POST",
    headers:{"Content-Type" : "application/json"},
    body : JSON.stringify(data),
  })
  return responce.json();
}

