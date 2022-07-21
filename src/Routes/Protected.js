import { Navigate, Route } from "react-router-dom";

 export const ProtectedRoute = ({ user, children, path }) => {
    if (!user) {
      return <Navigate to="/sign-in" replace />;
    }
  
    return children;
  };