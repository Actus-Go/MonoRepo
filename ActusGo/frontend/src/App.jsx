import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { postsReducer } from "./functions/reducers";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
// import HomePage from "./pages/home";
import HomePage from "./pages/Home.V2";
import DevelopmentPage from "./pages/Development";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import ActivatePage from "./pages/home/activate";
import ResetPage from "./pages/reset";
import CreatePostPopup from "./components/createPostPopup";
import FriendsPage from "./pages/friends";
import CustomNav from "./components/header/Custom/CustomNav";
import OnlineIndicator from "./components/Indecators/OnlineIndicator";
import LocationPopup from "./components/Location/LocationPopup";
import Market from "./pages/Market";
import { useSocket } from "./socket";
import { useNotificationStore } from "./Store/notificationStore";
import { useShareRequestUsersStore } from "./Store/ShareRequestUsersStore";

// Lazy load the Tasks page
const TasksPage = lazy(() => import("./pages/tasks"));

function App() {
  const [isPostPopupVisible, setPostPopupVisible] = useState(false);
  const { user, darkTheme } = useSelector((state) => state);
  let socket = useSocket();
  const addNotification = useNotificationStore((state) => state.addNotification );
  const addrequest = useShareRequestUsersStore((state=>state.addrequest));

  const [{ loading, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: "",
  });

  const [userLocation, setUserLocation] = useState(null);
  const [isLocationPopupVisible, setLocationPopupVisible] = useState(true);
  
  useEffect(() =>{
    console.log("sokcet", "connected");
    if(socket && socket.connected){
      console.log("sokcet", "connected :)");
      socket.on('share',(data)=>{
        addNotification({
          user:{
            name:`${data.user.firstName} ${data.user.lastName}`,
            avatar:data.user.avatar
          },
          actionDescription:data.message,
          timestamp:data.timestamp,
          primaryActionButton:{
            label:"Send a request to share",
            onClick: ()=>{
              console.log("sokcet", "requestToShare");
              socket.emit('requestToShare',{id:data.sharedProduct})
            }
          }
        })
      });
      socket.on('requestToShare',(data)=>{
        console.log("on sokcet", "requestToShare",data);
        addrequest({user:data.user,requestId:data.userRequest,message:data.message});
      });
      socket.on('accept',(data)=>{
        
      })
    }
  },[socket,socket?.connected]);
 
  // Fetch posts when user is logged in
  useEffect(() => {
    if (user?.token) {
      fetchAllPosts();
    }
  }, [user]);

  // Fetch all posts from backend
  const fetchAllPosts = async () => {
    try {
      dispatch({ type: "POSTS_REQUEST" });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({ type: "POSTS_SUCCESS", payload: data });
    } catch (error) {
      console.error("Error fetching posts:", error.response);

      dispatch({
        type: "POSTS_ERROR",
        payload: error.response?.data?.message || "Error fetching posts",
      });
    }
  };

  // Handle user allowing location access
  const handleAllowLocation = (location) => {
    setUserLocation(location);
    setLocationPopupVisible(false);
  };

  // Track user's geolocation
  const trackUserLocation = useCallback(() => {
    if (navigator.geolocation && !userLocation) {
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

  useEffect(() => {
    trackUserLocation();
  }, [trackUserLocation]);
  return (
    <>
      <div className={`${darkTheme ? "dark" : ""}`}>
        {isLocationPopupVisible && (
          <LocationPopup
            onAllow={handleAllowLocation}
            setPopupVisible={setLocationPopupVisible}
          />
        )}
        {isPostPopupVisible && (
          <CreatePostPopup
            user={user}
            setVisible={setPostPopupVisible}
            posts={posts}
            dispatch={dispatch}
          />
        )}

        <Routes>
          <Route path="/development" element={<DevelopmentPage />} />

          <Route element={<LoggedInRoutes />}>
            <Route
              path="/profile"
              element={
                <ProfilePage setVisible={setPostPopupVisible} getAllPosts={fetchAllPosts} />
              }
            />
            <Route
              path="/profile/:username"
              element={
                <ProfilePage setVisible={setPostPopupVisible} getAllPosts={fetchAllPosts} />
              }
            />
            <Route
              path="/friends"
              element={
                <FriendsPage setVisible={setPostPopupVisible} getAllPosts={fetchAllPosts} />
              }
            />
            <Route
              path="/friends/:type"
              element={
                <FriendsPage setVisible={setPostPopupVisible} getAllPosts={fetchAllPosts} />
              }
            />
            <Route
              path="/market"
              element={
                <Market />
              }
            />
            <Route
              path="/"
              element={
                <HomePage posts={posts} loading={loading}/>
              }
            />
            <Route
              path="/tasks"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <TasksPage setVisible={setPostPopupVisible} getAllPosts={fetchAllPosts} />
                </Suspense>
              }
            />
            <Route path="/activate/:token" element={<ActivatePage />} />
          </Route>

          <Route element={<NotLoggedInRoutes />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route path="/reset" element={<ResetPage />} />
        </Routes>

        <CustomNav user={user} />
      </div>
    </>
  );
}

export default App;
