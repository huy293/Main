import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Admin from "./Pages/Admin/Home";
import Dashboard from "./Pages/Admin/Dashboard";
import Setting from "./Pages/Admin/Setting";
import User from "./Pages/Admin/User";
import Help from "./Pages/Admin/Help";
import Report from "./Pages/Admin/Report";
import Movie from "./Pages/Admin/Movie/index";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="movie-center">
            <Route path="movies-management" element={<Movie />} />
          </Route>
          <Route path="user-interaction" element={<User />} />
          <Route path="moderation-report" element={<Report />} />
          <Route path="support-help" element={<Help />} />
          <Route path="system-setting" element={<Setting />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
