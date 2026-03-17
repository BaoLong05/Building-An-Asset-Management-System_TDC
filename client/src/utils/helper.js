import axios from "axios";

export const API_BASE_URL = "http://192.168.33.10:8000/api";

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
    const res = await axios.put(apiUrl(`taisan/${id}/maintenance`), {
      TinhTrang: status,
    });

    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return {
      success: false,
      message: "Không thể kết nối server",
    };
  }
};

//====================DANH MUC====================
//1. lay danh sach danh muc
export const getCategories = async () => {
  try {
    const res = await axios.get(apiUrl("danhmuc"));
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return {
      success: false,
      message: "Không thể kết nối server",
    };
  }
};

//2. them danh muc
export const addCategories = async (data) => {
  try {
    const res = await axios.post(apiUrl("danhmuc"), data);
    return res.data;

  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return {
      success: false,
      message: "Không thể kết nối server",
    };
  }
};
//3. sua danh muc
export const updateCategories = async (id, data) => {
  try {
    const res = await axios.put(apiUrl(`danhmuc/${id}`), data);
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return {
      success: false,
      message: "Không thể kết nối server",
    };
  }
};

//3. sua danh muc
export const updateCategories = async (id, data) => {
  try {
    const res = await axios.put(apiUrl(`danhmuc/${id}`), data);
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return {
      success: false,
      message: "Không thể kết nối server",
    };
  }
};
//4. xoa danh muc
export const deleteCategories = async (id) => {
  try {
    const res = await axios.delete(apiUrl(`danhmuc/${id}`));
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return {
      success: false,
      message: "Không thể kết nối server",
    };
  }
};

//====================PHONG====================
//1. lay danh sach phong
export const getRoom = async (page = 1) => {
  try {
    const res = await axios.get(apiUrl("phong"), {
      params: { page },
    });
    return res.data;
  } catch (error) {
    if (console.error) {
      return error.response.data;
    }
    return {
      success: false,
      message: "Không thể kết nối server",
    };
  }
};

//2.them phong hoc
export const addRoom = async (data) => {
  try {
    const res = await axios.post(apiUrl("phong"), data);
    return res.data;
  } catch (error) {
    if (console.error) {
      return error.response.data;
    }
    return {
      success: false,
      message: "Không thể kết nối server",
    };
  }
};
//3.sua phong hoc
export const updateRoom = async (id, data) => {
  try {
    const res = await axios.put(apiUrl(`phong/${id}`), data);
    return res.data;
  } catch (error) {
    if (console.error) {
      return error.response.data;
    }
    return {
      success: false,
      message: "Không thể kết nối server",
    };
  }
};
//4. xoa phong hoc
export const deleteRoom = async (id) => {
  try {
    const res = await axios.delete(apiUrl(`phong/${id}`));
    return res.data;
  } catch (error) {
    if (console.error) {
      return error.response.data;
    }
    return {
      success: false,
      message: "Không thể kết nối server",
    };
  }
};
//5. tai san trong mot phong hoc
export const getAssetRoom = async (id, page = 1) => {
  try {
    const res = await axios.get(apiUrl(`phong/${id}/taisan`), {
      params: { page },

    });
    return res.data;
  } catch (error) {
    if (console.error) {
      return error.response.data;
    }
    return {
      success: false,
      message: "Không thể kết nối server",
    };
  }
};


//====================BAO TRI====================
//1. lay danh bao tri
export const getMaintenanceAssets = async (page = 1) => {
  try {
    const res = await axios.get(apiUrl("baotri"), {
      params: { page },
    });

//2.them phong hoc
export const addRoom = async (data) => {
  try {
    const res = await axios.post(apiUrl("phong"), data);

    return res.data;
  } catch (error) {
    if (console.error) {
      return error.response.data;
    }
    return {
      success: false,
      message: "Không thể kết nối server",
    };
  }
};

//3.sua phong hoc
export const updateRoom = async (id, data) => {
  try {
    const res = await axios.put(apiUrl(`phong/${id}`), data);
    return res.data;
  } catch (error) {
    if (console.error) {
      return error.response.data;
    }
    return {
      success: false,
      message: "Không thể kết nối server",
    };
  }
};
//4. xoa phong hoc
export const deleteRoom = async (id) => {
  try {
    const res = await axios.delete(apiUrl(`phong/${id}`));
    return res.data;
  } catch (error) {
    if (console.error) {
      return error.response.data;
    }
    return {
      success: false,
      message: "Không thể kết nối server",
    };
  }
};
//5. tai san trong mot phong hoc
export const getAssetRoom = async (id, page = 1) => {
  try {
    const res = await axios.get(apiUrl(`phong/${id}/taisan`), {
        params : {page}
    });
    return res.data;
  } catch (error) {
    if (console.error) {
      return error.response.data;
    }
    return {
      success: false,
      message: "Không thể kết nối server",
    };
  }
};

