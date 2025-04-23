import React from "react";
import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";
import Header from "./Header";
import "../../index.css";
import { Outlet } from "react-router-dom"
const Admin = () => {
  return (
    <>
    <Header />
    <Sidebar />
    <main>
      <Outlet /> {/* 👈 nơi hiển thị component con (Main1, Main2, ...) */}
    </main>
    </>
  );
}
export default Admin;