import React, { useState } from "react";
import imgbg from "../../assets/ecb6416c16b66e9e5409def9271224a2.gif";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8888/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      // Kiểm tra nếu không có lỗi từ server
      if (response.status >= 200 && response.status < 300) {
        navigate("/admin/", { replace: true });
      }
    } catch (error) {
      // Bắt lỗi dễ dàng hơn
      alert(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <>
      <style>{`
      @keyframes fadeInUp {
        0% {
        opacity: 0;
        transform: translateY(20px);
        }
        100% {
        opacity: 1;
        transform: translateY(0);
        }
        }

        form.fade-in-up {
            animation: fadeInUp 1s ease forwards;
        }
        @keyframes rainbowMove {
          0% {
            background-position: 200% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        form {
          position: relative;
            border-radius: 15px;
            padding: 3rem;
            background: rgba(255 255 255 / 0.1);
            box-shadow: 0 0 25px rgba(255 255 255 / 0.2);
            z-index: 0;
            max-width: 30rem;
            width: 100%;
            transition: box-shadow 0.3s ease, transform 0.3s ease;
        }


        form::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 15px; /* 15 * 1.5 */
          padding: 4px; /* 4px * 1.5 */
          background: linear-gradient(
            90deg,
            red,
            orange,
            yellow,
            green,
            cyan,
            blue,
            violet,
            red
          );
          background-size: 200% 100%;
          animation: rainbowMove 3s linear infinite;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          pointer-events: none;
          z-index: -1;
        }

        .input-wrapper {
          position: relative;
          border-radius: 15px; /* 15 * 1.5 */
          margin-bottom: 1rem; /* 1rem * 1.5 */
          padding: 3px; /* 2px * 1.5 */
        }
        .input-wrapper::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 22.5px;
            padding: 2px;
            background: linear-gradient(
                90deg,
                red,
                orange,
                yellow,
                green,
                cyan,
                blue,
                violet,
                red
            );
            background-size: 200% 100%;
            animation: rainbowMove 3s linear infinite;
            -webkit-mask:
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: destination-out;
            mask-composite: exclude;
            pointer-events: none;
            z-index: 1;
            opacity: 0.3; /* Mặc định mờ */
            transition: opacity 0.3s ease, transform 0.3s ease;
            }

            .input-wrapper:focus-within::before {
            opacity: 1; /* Khi focus vào input thì sáng lên */
            transform: translate(4px, -4px);
            }
        input.neon-input {
          position: relative;
          width: 100%;
          border-radius: 15px; /* 15 * 1.5 */
          border: 2px solid transparent; /* 2px * 1.5 */
          background-color: transparent;
          color: white;
          padding: 0.75rem 1.125rem; /* 0.5rem*1.5 0.75rem*1.5 */
          font-size: 1rem; /* 1rem * 1.5 */
          outline: none;
          z-index: 2;
          caret-color: #00ffff;
        }
        input.neon-input::placeholder {
          color: rgba(255 255 255 / 0.6);
        }
        input.neon-input:focus {
            box-shadow: 0 0 10px #00ffff;
            transform: translate(4px, -4px);
            transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .rainbow-text {
          font-weight: 600;
          background: linear-gradient(
            90deg,
            red,
            orange,
            yellow,
            green,
            cyan,
            blue,
            violet,
            red
          );
          background-size: 200% 100%;
          animation: rainbowMove 3s linear infinite;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          user-select: none;
          -webkit-text-fill-color: transparent;
        }

        h2.rainbow-text {
          font-size: 2.5rem; /* 2rem * 1.5 */
          text-align: center;
          filter: drop-shadow(0 0 1.5rem rgba(0,0,0,0.7)); /* drop-shadow-lg scaled */
        }

        label.rainbow-text {
          display: block;
          margin-bottom: 1rem; /* 1rem * 1.5 */
          font-size: 1.5rem; /* 1rem * 1.5 */
        }

        button.rainbow-button {
        margin-top: 1rem; /* 1rem * 1.5 */
          position: relative;
          background: transparent;
          color: transparent;
          font-weight: 600;
          font-size: 1.65rem; /* 1.1rem * 1.5 */
          padding: 0.75rem 0; /* 0.5rem * 1.5 */
          width: 100%;
          border-radius: 15px; /* 15 * 1.5 */
          cursor: pointer;

          background-image: linear-gradient(
            90deg,
            red,
            orange,
            yellow,
            green,
            cyan,
            blue,
            violet,
            red
          );
          background-size: 200% 100%;
          animation: rainbowMove 3s linear infinite;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;

          outline: none;
          user-select: none;
          border: none;
        }

        button.rainbow-button::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 22.5px; /* 15 * 1.5 */
          padding: 4px; /* 4px * 1.5 */
          background: linear-gradient(
            90deg,
            red,
            orange,
            yellow,
            green,
            cyan,
            blue,
            violet,
            red
          );
          background-size: 200% 100%;
          animation: rainbowMove 3s linear infinite;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        button.rainbow-button:hover::before {
          opacity: 1;
          
        }
      `}</style>

      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${imgbg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <form onSubmit={handleSubmit} className="fade-in-up">
          <h2 className="rainbow-text">Đăng nhập</h2>

          <label htmlFor="email" className="rainbow-text">
            Email
          </label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              className="neon-input"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label htmlFor="password" className="rainbow-text">
            Mật khẩu
          </label>
          <div className="input-wrapper">
            <input
              type="password"
              id="password"
              className="neon-input"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="rainbow-button">
            Đăng nhập
          </button>
        </form>
      </div>
    </>
  );
}
