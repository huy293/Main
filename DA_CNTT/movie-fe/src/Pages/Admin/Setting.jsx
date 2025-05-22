import React, { useState } from "react";
import {
  FaCog,
  FaEnvelope,
  FaBell,
  FaPalette,
  FaUserShield,
  FaGlobe,
} from "react-icons/fa";
import { MdSearch } from "react-icons/md";

const WebsiteInfo = () => {
  const [siteName, setSiteName] = useState("");
  const [siteDescription, setSiteDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Lưu Thông tin Website: ${siteName}, ${siteDescription}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mt-6"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Thông tin Website
      </h2>
      <div className="mb-4">
        <label
          htmlFor="siteName"
          className="block mb-2 text-gray-700 dark:text-gray-300"
        >
          Tên website
        </label>
        <input
          id="siteName"
          type="text"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          placeholder="Nhập tên website"
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="siteDescription"
          className="block mb-2 text-gray-700 dark:text-gray-300"
        >
          Mô tả website
        </label>
        <textarea
          id="siteDescription"
          value={siteDescription}
          onChange={(e) => setSiteDescription(e.target.value)}
          placeholder="Nhập mô tả ngắn về website"
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Lưu
      </button>
    </form>
  );
};


const SEOSettings = () => {
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [robotsTxt, setRobotsTxt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Lưu SEO: metaTitle=${metaTitle}, metaDescription=${metaDescription}, robotsTxt=${robotsTxt}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mt-6"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Cấu hình SEO
      </h2>
      <div className="mb-4">
        <label
          htmlFor="metaTitle"
          className="block mb-2 text-gray-700 dark:text-gray-300"
        >
          Meta Title
        </label>
        <input
          id="metaTitle"
          type="text"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          placeholder="Nhập meta title"
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="metaDescription"
          className="block mb-2 text-gray-700 dark:text-gray-300"
        >
          Meta Description
        </label>
        <textarea
          id="metaDescription"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          placeholder="Nhập meta description"
          rows={3}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="robotsTxt"
          className="block mb-2 text-gray-700 dark:text-gray-300"
        >
          Robots.txt
        </label>
        <textarea
          id="robotsTxt"
          value={robotsTxt}
          onChange={(e) => setRobotsTxt(e.target.value)}
          placeholder="Nội dung robots.txt"
          rows={5}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Lưu SEO
      </button>
    </form>
  );
};


const EmailSettings = () => {
  const [smtpServer, setSmtpServer] = useState("");
  const [smtpPort, setSmtpPort] = useState(587);
  const [emailFrom, setEmailFrom] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Lưu Email: Server=${smtpServer}, Port=${smtpPort}, EmailFrom=${emailFrom}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mt-6"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Cấu hình Email
      </h2>

      <div className="mb-4">
        <label
          htmlFor="smtpServer"
          className="block mb-2 text-gray-700 dark:text-gray-300"
        >
          SMTP Server
        </label>
        <input
          id="smtpServer"
          type="text"
          value={smtpServer}
          onChange={(e) => setSmtpServer(e.target.value)}
          placeholder="smtp.example.com"
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="smtpPort"
          className="block mb-2 text-gray-700 dark:text-gray-300"
        >
          SMTP Port
        </label>
        <input
          id="smtpPort"
          type="number"
          value={smtpPort}
          onChange={(e) => setSmtpPort(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
          required
          min={1}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="emailFrom"
          className="block mb-2 text-gray-700 dark:text-gray-300"
        >
          Email gửi đi
        </label>
        <input
          id="emailFrom"
          type="email"
          value={emailFrom}
          onChange={(e) => setEmailFrom(e.target.value)}
          placeholder="your-email@example.com"
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block mb-2 text-gray-700 dark:text-gray-300"
        >
          Mật khẩu SMTP
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu SMTP"
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
      >
        Lưu cấu hình Email
      </button>
    </form>
  );
};



const NotificationSettings = () => {
  const [enablePush, setEnablePush] = useState(false);
  const [enableEmail, setEnableEmail] = useState(true);
  const [alertThreshold, setAlertThreshold] = useState(80);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Lưu Thông báo: Push=${enablePush}, Email=${enableEmail}, Ngưỡng cảnh báo=${alertThreshold}%`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mt-6"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Thông báo hệ thống
      </h2>

      <div className="mb-4 flex items-center gap-4">
        <input
          id="enablePush"
          type="checkbox"
          checked={enablePush}
          onChange={(e) => setEnablePush(e.target.checked)}
          className="w-5 h-5"
        />
        <label
          htmlFor="enablePush"
          className="text-gray-700 dark:text-gray-300 select-none"
        >
          Bật thông báo đẩy (Push Notification)
        </label>
      </div>

      <div className="mb-4 flex items-center gap-4">
<input
id="enableEmail"
type="checkbox"
checked={enableEmail}
onChange={(e) => setEnableEmail(e.target.checked)}
className="w-5 h-5"
/>
<label htmlFor="enableEmail" className="text-gray-700 dark:text-gray-300 select-none" >
Bật thông báo qua email
</label>
</div>  <div className="mb-4">
    <label
      htmlFor="alertThreshold"
      className="block mb-2 text-gray-700 dark:text-gray-300"
    >
      Ngưỡng cảnh báo (%)
    </label>
    <input
      id="alertThreshold"
      type="number"
      value={alertThreshold}
      onChange={(e) => setAlertThreshold(Number(e.target.value))}
      min={0}
      max={100}
      className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
    />
  </div>

  <button
    type="submit"
    className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
  >
    Lưu cài đặt thông báo
  </button>
</form>
  );
};



const ThemeSettings = () => {
  const [theme, setTheme] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Lưu Theme: ${theme}, màu chính: ${primaryColor}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mt-6"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Cài đặt giao diện
      </h2>

      <div className="mb-4">
        <label
          htmlFor="themeSelect"
          className="block mb-2 text-gray-700 dark:text-gray-300"
        >
          Chọn chủ đề
        </label>
        <select
          id="themeSelect"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="light">Sáng</option>
          <option value="dark">Tối</option>
          <option value="system">Theo hệ thống</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="primaryColor"
          className="block mb-2 text-gray-700 dark:text-gray-300"
        >
          Màu chính
        </label>
        <input
          id="primaryColor"
          type="color"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
          className="w-16 h-10 p-0 border-none rounded cursor-pointer"
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
      >
        Lưu giao diện
      </button>
    </form>
  );
};

const AdminSettings = () => {
  const [admins, setAdmins] = useState([
    { id: 1, email: "admin1@example.com", role: "Admin" },
    { id: 2, email: "mod1@example.com", role: "Moderator" },
  ]);
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Admin");

  // Thêm admin mới
  const handleAddAdmin = (e) => {
    e.preventDefault();
    if (!newEmail) return alert("Vui lòng nhập email");
    if (admins.find((a) => a.email === newEmail))
      return alert("Email đã tồn tại");
    const newAdmin = {
      id: Date.now(),
      email: newEmail,
      role: newRole,
    };
    setAdmins((prev) => [...prev, newAdmin]);
    setNewEmail("");
    setNewRole("Admin");
  };

  // Thay đổi quyền admin
  const handleChangeRole = (id) => {
    setAdmins((prev) =>
      prev.map((admin) =>
        admin.id === id
          ? {
              ...admin,
              role: admin.role === "Admin" ? "Moderator" : "Admin",
            }
          : admin
      )
    );
  };

  // Xóa admin
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa admin này?")) {
      setAdmins((prev) => prev.filter((admin) => admin.id !== id));
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mt-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Quản lý Admin & Moderator
      </h2>

      {/* Form thêm admin mới */}
      <form onSubmit={handleAddAdmin} className="mb-6">
        <div className="mb-4">
          <label
            htmlFor="newEmail"
            className="block mb-2 text-gray-700 dark:text-gray-300"
          >
            Email admin mới
          </label>
          <input
            id="newEmail"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="admin@example.com"
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="newRole"
            className="block mb-2 text-gray-700 dark:text-gray-300"
          >
            Quyền
          </label>
          <select
            id="newRole"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Thêm Admin
        </button>
      </form>

      {/* Danh sách Admin */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
          Danh sách Admin & Moderator
        </h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Quyền</th>
              <th className="py-2 px-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(({ id, email, role }) => (
              <tr
                key={id}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <td className="py-2 px-3 text-gray-800 dark:text-gray-200">
                  {email}
                </td>
                <td className="py-2 px-3 text-gray-800 dark:text-gray-200">
                  {role}
                </td>
                <td className="py-2 px-3 flex gap-3">
                  <button
                    onClick={() => handleChangeRole(id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Phân quyền
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {admins.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  Chưa có admin nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


const settingsList = [
  {
    title: "Thông tin Website",
    icon: <FaGlobe className="w-6 h-6 text-blue-500" />,
    component: WebsiteInfo,
  },
  {
    title: "Cấu hình SEO",
    icon: <MdSearch className="w-6 h-6 text-green-500" />,
    component: SEOSettings,
  },
  {
    title: "Cấu hình Email",
    icon: <FaEnvelope className="w-6 h-6 text-yellow-500" />,
    component: EmailSettings,
  },
  {
    title: "Thông báo hệ thống",
    icon: <FaBell className="w-6 h-6 text-red-500" />,
    component: NotificationSettings,
  },
  {
    title: "Giao diện & Logo",
    icon: <FaPalette className="w-6 h-6 text-pink-500" />,
    component: ThemeSettings,
  },
  {
    title: "Quản lý Admin",
    icon: <FaUserShield className="w-6 h-6 text-purple-500" />,
    component: AdminSettings,
  },
];

const Setting = () => {
  const [selectedSetting, setSelectedSetting] = useState(settingsList[0]);

  const handleSelectSetting = (item) => {
    setSelectedSetting(item);
  };

  const SelectedComponent = selectedSetting ? selectedSetting.component : null;

  return (
    <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-white">
          Cài đặt hệ thống
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingsList.map((item) => (
            <div
              key={item.title}
              onClick={() => handleSelectSetting(item)}
              className={`flex items-center gap-4 p-4 rounded-lg shadow cursor-pointer transition
                ${
                  selectedSetting === item
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "bg-white dark:bg-gray-800 hover:shadow-md"
                }`}
            >
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full">
                {item.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Hiển thị component tương ứng */}
        {SelectedComponent && <SelectedComponent />}
      </div>
    </div>
  );
};

export default Setting;
