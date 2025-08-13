import service from "./api";

// export async function createProducts(data) {
//   const formDataObj = {};
//   data.forEach((value, key) => {
//     formDataObj[key] = value;
//   });
//   console.log("FormData as object:", formDataObj);
//   if (formDataObj) {
//     console.log("5555555");
    
//     try {
//       const res = await service.post(`/products`, formDataObj);
//       return res?.data;
//     } catch (error) {
//       console.error("Update failed:", error);
//       throw error;
//     }
//   }
// }

export async function createProducts(data) {
  try {
    const res = await service.post(`/products`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res?.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}

