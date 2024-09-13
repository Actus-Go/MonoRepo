import React, { lazy, Suspense, useCallback, useEffect, useReducer, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { postsReducer } from "./functions/reducers";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/home/activate";
import Reset from "./pages/reset";
import CreatePostPopup from "./components/createPostPopup";
import Friends from "./pages/friends";
// import Tasks from "./pages/tasks";
import CustomNav from "./components/header/Custom/CustomNav";
import OnlineIndicator from "./components/Indecators/OnlineIndicator";
import LocationPopup from "./components/Location/LocationPopup";
// import ShopData from "./components/ShopSidebar/ShopData"

// Lazy load MapComponent
const Tasks = lazy(() => import("./pages/tasks"));


function App() {
  const [visible, setVisible] = useState(false);
  const { user, darkTheme } = useSelector((state) => ({ ...state }));
  const [{ loading, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: "",
  });

  const [userLocation, setUserLocation] = useState(null);
  const [popupVisible, setPopupVisible] = useState(true);

  useEffect(() => {
    if (user && user.token) {
      getAllPosts();
    }
  }, [user]);


  useCallback(() => {
    if (navigator.geolocation && userLocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => console.error("Error getting user location:", error),
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [userLocation]);

  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      console.error("Error response getAllPosts:", error.response);
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  const handleAllowLocation = (location) => {
    setUserLocation(location);
    setPopupVisible(false);
  };

  return (
    <div className="">
      <OnlineIndicator />
      {popupVisible && (
        <LocationPopup onAllow={handleAllowLocation} setPopupVisible={setPopupVisible} />
      )}
      <div className={`${darkTheme && "dark"}`}>
        {visible && (
          <CreatePostPopup user={user} setVisible={setVisible} posts={posts} dispatch={dispatch} />
        )}
        <Routes>
          <Route element={<LoggedInRoutes />}>
            <Route path="/profile" element={<Profile setVisible={setVisible} getAllPosts={getAllPosts} />} exact />
            <Route path="/profile/:username" element={<Profile setVisible={setVisible} getAllPosts={getAllPosts} />} exact />
            <Route path="/friends" element={<Friends setVisible={setVisible} getAllPosts={getAllPosts} />} exact />
            <Route path="/friends/:type" element={<Friends setVisible={setVisible} getAllPosts={getAllPosts} />} exact />
            <Route path="/" element={<Home setVisible={setVisible} posts={posts} loading={loading} getAllPosts={getAllPosts} />} exact />
            <Route
              path="/tasks"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Tasks setVisible={setVisible} getAllPosts={getAllPosts} />
                </Suspense>
              }
              exact
            />
            <Route path="/activate/:token" element={<Activate />} exact />
          </Route>
          <Route element={<NotLoggedInRoutes />}>
            <Route path="/login" element={<Login />} exact />
          </Route>
          <Route path="/reset" element={<Reset />} />
        </Routes>
        <div>
          <CustomNav user={user} />
        </div>
      </div>
      {/* <ShopData /> */}
    </div>
  );
}

export default App;
