# Building An Asset Management System

<p align="center">
  <img src="images/banner.png" width="1000"/>
</p>

## 📌 Giới thiệu

Building An Asset Management System là hệ thống quản lý tài sản được xây dựng nhằm hỗ trợ doanh nghiệp quản lý tài sản, vị trí sử dụng và quá trình bảo trì thiết bị một cách hiệu quả.

Hệ thống được phát triển theo mô hình tách biệt Backend và Frontend:

- Backend: Laravel 12
- Frontend: ReactJS
- Environment: Docker + Vagrant + VirtualBox

---

# 🚀 Công nghệ sử dụng

| Công nghệ | Mô tả |
|---|---|
| Laravel 12 | Backend API |
| ReactJS | Frontend UI |
| MySQL | Database |
| Docker | Container Environment |
| Vagrant | Virtual Machine |
| VirtualBox | Virtualization |
| Nginx | Web Server |

---

# ✨ Chức năng chính và 🖼️ Giao diện hệ thống

## 🏠 Trang chủ
- Dashboard thống kê tài sản
- Hiển thị tổng quan hệ thống
- Theo dõi trạng thái thiết bị
<p align="center">
<img width="1911" height="953" alt="image" src="https://github.com/user-attachments/assets/d20fc9a6-651b-4d7f-9ba7-8f63e4c4d991" />
</p>
---

## 📦 Quản lý tài sản
- Thêm / sửa / xóa tài sản
- Theo dõi thông tin tài sản
- Quản lý trạng thái sử dụng
<p align="center">
<img width="1908" height="949" alt="image" src="https://github.com/user-attachments/assets/b6eb9c01-1f54-4488-9e71-173cb6ea5df3" />
</p>
---
## 📂 Danh mục tài sản
- Quản lý loại tài sản
- Phân loại thiết bị
- Quản lý nhóm tài sản
<p align="center">
<img width="1912" height="843" alt="image" src="https://github.com/user-attachments/assets/5ad1f44e-b717-46c9-a963-b4fb85a0fe09" />
</p>
---

## 📍 Vị trí sử dụng
- Quản lý vị trí đặt thiết bị
- Theo dõi phòng ban sử dụng
<p align="center">
<img width="1907" height="946" alt="image" src="https://github.com/user-attachments/assets/fc3c7aa9-d2fc-45dd-95ce-678180c460dd" />
</p>
---
## 🔧 Bảo trì tài sản
- Theo dõi lịch bảo trì
- Quản lý trạng thái sửa chữa
- Ghi nhận lịch sử bảo trì
<p align="center">
<img width="1903" height="944" alt="image" src="https://github.com/user-attachments/assets/d75fa7e4-3626-463f-ac6a-bfcc11f2f2f7" />
</p>
---
## 📄 Xuất dữ liệu
- Export Excel
<p align="center">
<img width="823" height="748" alt="image" src="https://github.com/user-attachments/assets/6ba462e7-4dc2-4347-b28e-4875c22c511e" />
<img width="1727" height="739" alt="image" src="https://github.com/user-attachments/assets/d76082ec-13c5-42b8-a50a-ac59831c48cc" />
</p>
---
- Export PDF
<p align="center">
<img width="711" height="744" alt="image" src="https://github.com/user-attachments/assets/621ced62-14a5-49c4-8a5b-5878e873028c" />
<img width="1907" height="946" alt="image" src="https://github.com/user-attachments/assets/5d86ad64-5cc2-46e3-aa42-74ffe61d1124" />
</p>

---

# ⚙️ Hướng dẫn cài đặt

## 1️⃣ Clone project

```bash
git clone <your-repository-url>
```

---

## 2️⃣ Khởi động máy ảo Vagrant

Tại thư mục root của project:

```bash
vagrant up
```

---

## 3️⃣ Truy cập vào máy ảo

```bash
vagrant ssh
```

---

## 4️⃣ Di chuyển đến thư mục project

```bash
cd /vagrant
```

---

## 5️⃣ Khởi động Docker

```bash
docker-compose up -d
```

---

# 🌐 Thông tin hệ thống

| Service | URL |
|---|---|
| Backend Laravel | http://192.168.33.10:8000/ |
| Frontend ReactJS | http://192.168.33.10:5173/ |
| MySQL / phpMyAdmin | http://192.168.33.10:8080/ |

---

# 📁 Cấu trúc thư mục

```bash
├── backend
├── client
├── docker-compose.yml
├── Vagrantfile
└── README.md
```

---

# 👨‍💻 Thành viên phát triển

- BaoLong05

---

# 📜 License

This project is licensed under the Apache-2.0 License.
