import React from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Navigate, Outlet } from "react-router-dom"
import AppNavbar from "../common/AppNavbar";

export default function AuthLayout() {
  const { currentUser } = useAuth()

  return currentUser !== null ? (
    <>
      <AppNavbar />
      <Outlet />
     </>

  ) : (
    <Navigate to={"/login"} replace />
  );
}
