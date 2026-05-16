import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://building-an-asset-management-systemtdc-production.up.railway.app/api";

export const apiUrl = (endpoint) => `${API_BASE_URL}/${endpoint}`;

//file loi
const handleError = (error, defaultMessage) => {
  if (error.response) {
    const res = error.response.data;

    if (res.errors) {
      return {
        success: false,
        errors: res.errors,
        message: res.message || "có lỗi xảy ra",
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
export const getAssets = async (page = 1, search = "", status = "") => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.get(apiUrl("taisan"), {
      params: { page, search, TinhTrang: status },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi lấy tài sản");
  }
};

//them tai san
export const addAsset = async (data) => {
  try {
    //lay token
    const token = sessionStorage.getItem("token");
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== "") {
        formData.append(key, data[key]);
      }
    });

    const res = await axios.post(apiUrl("taisan"), formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi thêm tài sản");
  }
};

//cap nhat tai san
export const updateAsset = async (id, data) => {
  try {
    //lay token
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== "") {
        formData.append(key, data[key]);
      }
    });
    formData.append("_method", "PUT");
    const res = await axios.post(apiUrl(`taisan/${id}`), formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi thêm tài sản");
  }
};

//xoa tai san
export const deleteAsset = async (id) => {
  try {
    //lay token
    const token = sessionStorage.getItem("token");
    const res = await axios.delete(apiUrl(`taisan/${id}`), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi xóa tài sản");
  }
};

//danh muc
//lay danh sach danh muc
export const getCategories = async (page = 1, search = "", status = "") => {
  try {
    const token = sessionStorage.getItem("token");

    const res = await axios.get(apiUrl("danhmuc"), {
      params: {
        page,
        search,
        TinhTrang: status,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi lấy danh mục");
  }
};

//them danh muc
export const addCategories = async (data) => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.post(apiUrl("danhmuc"), data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi thêm danh mục");
  }
};
// cap nhat danh muc
export const updateCategories = async (id, data) => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.put(apiUrl(`danhmuc/${id}`), data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/json",
      },
    });
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi sửa danh mục");
  }
};

//xoa danh muc
export const deleteCategories = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.delete(apiUrl(`danhmuc/${id}`), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi xóa danh mục");
  }
};

//phong
//lay danh sach phong
export const getRoom = async (page = 1, search = "", status = "") => {
  try {
    const token = sessionStorage.getItem("token");

    const res = await axios.get(apiUrl("phong"), {
      params: { page, search, TinhTrang: status },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi lấy phòng");
  }
};

// them phong
export const addRoom = async (data) => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.post(apiUrl("phong"), data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi thêm phòng");
  }
};

//cap nhat phong
export const updateRoom = async (id, data) => {
  try {
    const token = sessionStorage.getItem("token");

    const res = await axios.put(apiUrl(`phong/${id}`), data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi sửa phòng");
  }
};

//xoa phong
export const deleteRoom = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.delete(apiUrl(`phong/${id}`), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi xóa phòng");
  }
};

//tai san
//lay danh sach tai san
export const getAssetRoom = async (id, page = 1) => {
  try {
    const token = sessionStorage.getItem("token");

    const res = await axios.get(apiUrl(`phong/${id}/taisan`), {
      params: { page },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi lấy tài sản theo phòng");
  }
};

//bao tri

//lay danh sach bao tri
export const getMaintenanceAssets = async (
  page = 1,
  search = "",
  status = "",
) => {
  try {
    const token = sessionStorage.getItem("token");

    const res = await axios.get(apiUrl("baotri"), {
      params: {
        page,
        search,
        TinhTrang: status,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi lấy danh sách bảo trì");
  }
};

// lich su bao tri
export const getMaintenanceHistory = async (MaTaiSan, page = 1) => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.get(
      apiUrl(`baotri/lichsu/${MaTaiSan}`),
      {
        params: { page },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
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
    //lay token
    const token = sessionStorage.getItem("token");
    const res = await axios.put(
      apiUrl(`baotri/${id}`),
      {
        TinhTrang,
        NoiDung,
        updated_at,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi cập nhật trạng thái");
  }
};

// them record bao tri
export const addMaintenanceNote = async (data) => {
  try {
    //lay token
    const token = sessionStorage.getItem("token");
    const res = await axios.post(apiUrl("baotri"), data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const token = sessionStorage.getItem("token");

    const res = await axios.get(apiUrl(endpoint), {
      params,
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
export const exportPDF = async (
  endpoint,
  params = {},
  filename = "file.pdf",
) => {
  try {
    const token = sessionStorage.getItem("token");

    const res = await axios.get(apiUrl(endpoint), {
      params,
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

// =========LOGIN=============
// TOKEN
export const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});
//1.login
export const getLogin = async (data) => {
  try {
    const res = await axios.post(apiUrl("login"), data);
    return res.data;
  } catch (error) {
    return handleError(error, "Đăng nhập không thành công!");
  }
};

//2. Logout
export const logout = async () => {
  try {
    const token = sessionStorage.getItem("token");

    const res = await axios.post(
      apiUrl("logout"),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    sessionStorage.removeItem("token");
    return res.data;
  } catch (error) {
    return handleError(error, "Đăng xuất thất bại!");
  }
};
//3.forgot password
export const forgotPassword = async (email) => {
  try {
    const res = await axios.post(apiUrl("forgot-password"), {
      email,
    });

    return res.data;
  } catch (error) {
    return handleError(error, "Gửi email thất bại!");
  }
};
//4. reset password
export const resetPassword = async (data) => {
  try {
    const res = await axios.post(apiUrl("reset-password"), data);

    return res.data;
  } catch (error) {
    return handleError(error, "Đổi mật khẩu không thành công!");
  }
};
//5. Lấy thông tin đăng nhập
export const getMe = async (token) => {
  if (!token) {
    return {
      success: false,
      message: "Không có token!",
    };
  }

  try {
    const res = await axios.get(apiUrl("me"), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return res.data;
  } catch (error) {
    return handleError(error, "Lấy thông tin cá nhân thất bại!");
  }
};

//6. danh sach user
export const getUsers = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.get(apiUrl("user"), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

// lay ra thong bao ca nhan
export const getMyTask = async () => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return {
        success: false,
        message: "Không có token",
      };
    }

    const res = await axios.get(apiUrl("my-tasks"), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return res.data;
  } catch (error) {
    return handleError(error, "Lỗi khi lấy thông báo");
  }
};

//danh dau da doc 1 cai
export const Readed = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.put(
      apiUrl(`baotri/${id}/read`),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

//danh dau da doc toan bo
export const readed_All = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.put(
      apiUrl("baotri/read-all"),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

//THONG KE
export const getDashboard = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.get(apiUrl("dashboard"), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return handleError(error || "Tải dữ liệu không thành công!");
  }
};

// CHATBOT AI
//api chatbot
export const postChatBot = async (data) => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.post(apiUrl("chat"), data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return handleError(error || "Vui lòng thử lại sau");
  }
};
