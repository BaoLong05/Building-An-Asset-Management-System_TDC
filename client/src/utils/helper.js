import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
export const API_BASE_URL = "http://192.168.33.10:8000/api";

export const apiUrl = (endpoint) => `${API_BASE_URL}/${endpoint}`;

// =============================
// HELPER HANDLE ERROR
// =============================
const handleError = (error, defaultMessage) => {
  if (error.response) {
    return error.response.data;
  }
  return {
    success: false,
    message: defaultMessage || "Không thể kết nối server",
  };
};

// =============================
// TÀI SẢN
// =============================
export const getAssets = async (page = 1) => {
  try {
    const res = await axios.get(apiUrl("taisan"),{
      params: {page}
    });
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi lấy tài sản");
  }
};

export const addAsset = async (data) => {
  try {
    const res = await axios.post(apiUrl("taisan"), data);
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi thêm tài sản");
  }
};

export const updateAsset = async (id, data) => {
  try {
    const res = await axios.put(apiUrl(`taisan/${id}`), data);
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi sửa tài sản");
  }
};

export const deleteAsset = async (id) => {
  try {
    const res = await axios.delete(apiUrl(`taisan/${id}`));
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi xóa tài sản");
  }
};


// =============================
// DANH MỤC
// =============================
export const getCategories = async () => {
  try {
    const res = await axios.get(apiUrl("danhmuc"));
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi lấy danh mục");
  }
};

export const addCategories = async (data) => {
  try {
    const res = await axios.post(apiUrl("danhmuc"), data);
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi thêm danh mục");
  }
};

export const updateCategories = async (id, data) => {
  try {
    const res = await axios.put(apiUrl(`danhmuc/${id}`), data);
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi sửa danh mục");
  }
};

export const deleteCategories = async (id) => {
  try {
    const res = await axios.delete(apiUrl(`danhmuc/${id}`));
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi xóa danh mục");
  }
};

// =============================
// PHÒNG
// =============================
export const getRoom = async (page = 1) => {
  try {
    const res = await axios.get(apiUrl("phong"), {
      params: { page },
    });
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi lấy phòng");
  }
};

export const addRoom = async (data) => {
  try {
    const res = await axios.post(apiUrl("phong"), data);
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi thêm phòng");
  }
};

export const updateRoom = async (id, data) => {
  try {
    const res = await axios.put(apiUrl(`phong/${id}`), data);
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi sửa phòng");
  }
};

export const deleteRoom = async (id) => {
  try {
    const res = await axios.delete(apiUrl(`phong/${id}`));
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi xóa phòng");
  }
};

export const getAssetRoom = async (id, page = 1) => {
  try {
    const res = await axios.get(apiUrl(`phong/${id}/taisan`), {
      params: { page },
    });
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi lấy tài sản theo phòng");
  }
};

// =============================
// BẢO TRÌ
// =============================
export const getMaintenanceAssets = async (page = 1) => {
  try {
    const res = await axios.get(apiUrl("baotri"), {
      params: { page },
    });
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi lấy danh sách bảo trì");
  }
};