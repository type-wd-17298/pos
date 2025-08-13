import service from "./api";

export async function updateCategory(data) {
  try {
    const res = await service.put(`/category/${data.id}`, data);
    const updatedData = res?.data;
    return updatedData;
  } catch (error) {
    console.error("Update failed:", error);
    throw error;
  }
}

export async function createCategory(data) {
  try {
    const res = await service.post(`/category`, data);
    return res?.data;
  } catch (error) {
    console.error("Update failed:", error);
    throw error;
  }
}

export async function deleteCategory(data) {
  try {
    const res = await service.delete(`/category/${data.id}`, data);
    return res?.data;
  } catch (error) {
    console.error("Delte failed : ", error);
  }
}
