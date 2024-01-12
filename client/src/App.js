import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import LandingPage from "./pages/LandingPage.jsx";
import Search from "./pages/Search.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/RegisterPage.jsx";
import NavBar from "./components/NavBar.jsx";
import SingleMovie from "./pages/SingleMovie.jsx";
import TestLogoutButtonPage from "./pages/TestLogoutButtonPage.jsx";
<<<<<<< HEAD
import TestMovieLog from "./pages/TestMovieLog.jsx";
import getWatchList from "./utils/getWatchList.js";
=======
>>>>>>> 9064997c677c40ecaf1934eec7ae74597732bcc7
import userContext from "./utils/userContext.js";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {

  const [userWatchList, setUserWatchList] = useState([]);
<<<<<<< HEAD
  const [userId, setUserId] = useState(253);
=======
  const [userInfo, setUserInfo] = useState({
    isAuthenticated: false,
    id: null,
    firstName: null,
    lastName: null,
    email: null
  });
>>>>>>> 3e0d0793d587edcce0d5d8a88b1161c6809768dd
  const [refetchDb, setRefetchDb] = useState(false);

  const navigate = useNavigate();

  // const getWatchList = async (userInfo) => {
  //   try {
  //     const response = await databaseCall.get(`watchlist/${1}`);
  //     const data = await response.data;
  //     console.log(data)
  //     return data; // flatrate is movies on subscription streaming
  //   } catch (error) {
  //     console.error(error);
  //     return null;
  //   }
  // };

const databaseCall = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
})

const headersObj = {
"Content-Type": "application/json",
};

databaseCall.interceptors.request.use(async (config) => {
    try {
      const response = await axios.get(`http://localhost:8080/user/secure/${userInfo.id}`, { headers: headersObj, withCredentials: true });
      console.log("success")
      console.log("response from test => ", response);
      return config;
    } catch (error) {
      setUserInfo({
        isAuthenticated: false,
        id: null,
        firstName: null,
        lastName: null,
        email: null
    })
    navigate('/login');
      return Promise.reject(error); // Return a rejected Promise to propagate the error
    }
  });

  const getWatchList = async (userInfo) => {

    try {
      const response = await databaseCall.get(`watchlist/${1}`);
      const data = await response.data;
      console.log(data)
      return data; // flatrate is movies on subscription streaming
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // sets userWatchList
  useEffect(() => {
    if(userInfo.isAuthenticated) {
      getWatchList(userInfo)
      .then(data => {
        setUserWatchList(data)
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [userInfo, refetchDb]);

  return (
    <div className="App">
      <userContext.Provider value={{ userWatchList, refetchDb, setRefetchDb, userInfo, setUserInfo, databaseCall }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="search" element={<Search />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="movie" element={<SingleMovie />} />
<<<<<<< HEAD
          <Route path="usertest" element={<TestUserPage />} />
          <Route path="logout-test" element={<TestLogoutButtonPage />} />
          <Route path="movie-log" element={<TestMovieLog />} />
          <Route path="test-delete-account" element={<TestDeleteAccountPage />} />
=======
          <Route path="logout" element={<TestLogoutButtonPage />} />
>>>>>>> 3e0d0793d587edcce0d5d8a88b1161c6809768dd
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
