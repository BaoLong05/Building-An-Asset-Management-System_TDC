import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
export const API_BASE_URL = "http://192.168.33.10:8000/api";

export const apiUrl = (endpoint) => `${API_BASE_URL}/${endpoint}`;

//file loi
const handleError = (error, defaultMessage) => {
  if (error.response) {
    const res = error.response.data;
    if (res.errors) {
      const messages = Object.values(res.errors).flat();

      return {
        success: false,
        message: messages.join(", "),
        errors: res.errors,
      };
    }
    if (res.message) {
      return {
        success: false,
        message: res.message,
      };
    }
  }

  return {
    success: false,
    message: defaultMessage || "Lỗi server",
  };
};

//tai san
// lay danh sach tai san
export const getAssets = async (page = 1) => {
  try {
    const res = await axios.get(apiUrl("taisan"), {
      params: { page },
    });
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi lấy tài sản");
  }
};

//them tai san
export const addAsset = async (data) => {
  try {
    const res = await axios.post(apiUrl("taisan"), data);
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi thêm tài sản");
  }
};

//cap nhat tai san
export const updateAsset = async (id, data) => {
  try {
    const res = await axios.put(apiUrl(`taisan/${id}`), data);
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi sửa tài sản");
  }
};

//xoa tai san
export const deleteAsset = async (id) => {
  try {
    const res = await axios.delete(apiUrl(`taisan/${id}`));
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi xóa tài sản");
  }
};

//danh muc
//lay danh sach danh muc
export const getCategories = async () => {
  try {
    const res = await axios.get(apiUrl("danhmuc"));
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi lấy danh mục");
  }
};

//them danh muc
export const addCategories = async (data) => {
  try {
    const res = await axios.post(apiUrl("danhmuc"), data);
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi thêm danh mục");
  }
};
// cap nhat danh muc
export const updateCategories = async (id, data) => {
  try {
    const res = await axios.put(apiUrl(`danhmuc/${id}`), data);
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi sửa danh mục");
  }
};

//xoa danh muc
export const deleteCategories = async (id) => {
  try {
    const res = await axios.delete(apiUrl(`danhmuc/${id}`));
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi xóa danh mục");
  }
};

//phong
//lay danh sach phong
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

// them phong
export const addRoom = async (data) => {
  try {
    const res = await axios.post(apiUrl("phong"), data);
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi thêm phòng");
  }
};

//cap nhat phong
export const updateRoom = async (id, data) => {
  try {
    const res = await axios.put(apiUrl(`phong/${id}`), data);
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi sửa phòng");
  }
};

//xoa phong
export const deleteRoom = async (id) => {
  try {
    const res = await axios.delete(apiUrl(`phong/${id}`));
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi xóa phòng");
  }
};

//tai san
//lay danh sach tai san
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

//bao tri

//lay danh sach bao tri
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

// lich su bao tri
export const getMaintenanceHistory = async (MaTaiSan, page = 1) => {
  try {
    const res = await axios.get(apiUrl(`baotri/lichsu/${MaTaiSan}`), {
      params: { page },
    });
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi lấy lịch sử bảo trì");
  }
};

//cap nhat bao tri
export const updateMaintenanceStatus = async (
  id,
  TinhTrang,
  NoiDung,
  updated_at,
) => {
  try {
    const res = await axios.put(apiUrl(`baotri/${id}`), {
      TinhTrang,
      NoiDung,
      updated_at,
    });
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi cập nhật trạng thái");
  }
};

// them record bao tri
export const addMaintenanceNote = async (data) => {
  try {
    const res = await axios.post(apiUrl("baotri"), data);
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi thêm ghi chú");
  }
};
//api excel
export const exportExcel = async (
  endpoint,
  params = {},
  filename = "file.xlsx",
) => {
  try {
    const res = await axios.get(apiUrl(endpoint), {
      params,
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", filename);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    toast.success("Xuất Excel thành công!");
  } catch (error) {
    const err = handleError(error, "Lỗi khi xuất Excel");
    toast.error(err.message);
    return err;
  }
};

//Api pdf
export const exportPDF = async (endpoint, params = {}, filename = "file.pdf") => {
  try {
    const res = await axios.get(apiUrl(endpoint), {
      params,
      responseType: "blob", 
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", filename);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    toast.success("Xuất PDF thành công");
  } catch (error) {
    const err = handleError(error, "Lỗi khi export PDF");
    toast.error(err.message);
    return err;
  }
};