import React from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export default function AuthLayout() {
  const { currentUser } = useAuth()

  return currentUser !== null ? (
   
      <Outlet />

  ) : (
    <Navigate to={"/login"} replace />
  );
}
