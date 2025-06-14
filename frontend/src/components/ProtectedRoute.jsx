// src/ProtectedRoute.js
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import {logout} from "../redux/slices/user.slice.js"
import Loader from "./Loader.jsx";

const ProtectedRoute = () => {
  const [isAllowed, setIsAllowed] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post(
          "https://recruitment-bot-vercel.onrender.com/api/auth/check-authentication",
          {},
          { withCredentials: true }
        );

        // console.log("In Protected Route: ",response)

        if (response.data.success) {
          setIsAllowed(true);
        } else {
          dispatch(logout())
          setIsAllowed(false);
        }
      } catch (err) {
        setIsAllowed(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (isAllowed === null) return <Loader/>;

  return isAllowed ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;