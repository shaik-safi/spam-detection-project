import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode; // The children prop can be any valid React node
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token"); // Check if the JWT token is present

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login if no token
  }

  return <>{children}</>; // If the token is present, render the children (the dashboard)
};

export default ProtectedRoute;
