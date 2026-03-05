import axios from 'axios';

export const API_BASE_URL = 'http://192.168.33.14:8000/api';

export const apiUrl = (endpoint) => `${API_BASE_URL}/${endpoint}`;


// =============================
// LẤY DANH SÁCH TÀI SẢN
// =============================
export const getAssets = async () => {
  try {
    const response = await axios.get(apiUrl("taisan"));
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API tài sản:", error);
    return [];
  }
};


// =============================
// THÊM TÀI SẢN
// =============================
export const addAsset = async (data) => {
  try {
    const response = await axios.post(apiUrl("taisan"), data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm tài sản:", error);
  }
};


// =============================
// SỬA TÀI SẢN
// =============================
export const updateAsset = async (id, data) => {
  try {
    const response = await axios.put(apiUrl(`taisan/${id}`), data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi sửa tài sản:", error);
  }
};


// =============================
// XÓA TÀI SẢN
// =============================
export const deleteAsset = async (id) => {
  try {
    const response = await axios.delete(apiUrl(`taisan/${id}`));
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa tài sản:", error);
  }
};


// =============================
// TOGGLE BẢO TRÌ
// =============================
export const toggleMaintenance = async (id, status) => {
  try {

    const res = await axios.put(
      apiUrl(`taisan/${id}/maintenance`),
      {
        TinhTrang: status
      }
    );

    return res.data;

  } catch (error) {

    console.error("Lỗi cập nhật bảo trì:", error);

  }
};