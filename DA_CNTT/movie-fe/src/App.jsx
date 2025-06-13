import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import HomeLayout from "./Pages/Home/HomeLayout";
import Home from "./Pages/Home/Home";
import Admin from "./Pages/Admin/Home";
import Dashboard from "./Pages/Admin/Dashboard";
import Setting from "./Pages/Admin/Setting";
import User from "./Pages/Admin/User_Interaction/User";
import Interaction from "./Pages/Admin/User_Interaction/Interaction";
import Help from "./Pages/Admin/Help";
import Report from "./Pages/Admin/Report";
import Movie from "./Pages/Admin/Movie/index";
import Genre  from "./Pages/Admin/Movie/Genre_index";
import Episode from "./Pages/Home/Episode";
import Episode_admin from "./Pages/Admin/Movie/Episode_index";
import People from "./Pages/Admin/Movie/People_index";
import Login from "./Pages/Admin/Login";
import Search from "./Pages/Home/Search";
import MovieDetail from './Pages/Home/MovieDetail';
import Profile from "./Pages/Home/Profile";
import History from "./Pages/Home/History";
import Favorites from "./Pages/Home/Favorites";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/watch/:seasonId/:episodeId" element={<Episode />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Admin />}>
          <Route
            index
            element={
              <AdminProtectedRoute>
                <Dashboard />
              </AdminProtectedRoute>
            }
          />
          <Route path="movie-center">
            <Route
              path="movies-management"
              element={
                <AdminProtectedRoute>
                  <Movie />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="genres"
              element={
                <AdminProtectedRoute>
                  <Genre />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="people"
              element={
                <AdminProtectedRoute>
                  <People />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="episode"
              element={
                <AdminProtectedRoute>
                  <Episode_admin />
                </AdminProtectedRoute>
              }
            />
          </Route>
          <Route path="user-interaction">
            <Route
              path="interaction"
              element={
                <AdminProtectedRoute>
                  <Interaction />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="user"
              element={
                <AdminProtectedRoute>
                  <User />
                </AdminProtectedRoute>
              }
            />
          </Route>
          <Route
            path="system-setting"
            element={
              <AdminProtectedRoute>
                <Setting />
              </AdminProtectedRoute>
            }
          />
          {/* <Route
            path="moderation-report"
            element={
              <AdminProtectedRoute>
                <Report />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="support-help"
            element={
              <AdminProtectedRoute>
                <Help />
              </AdminProtectedRoute>
            }
          /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
