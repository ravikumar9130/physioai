import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  let auth, role = null;
  if (localStorage.getItem("token") !== null) {
    auth = JSON.parse(localStorage.getItem("token"));
    role = auth.role;
  }
  useEffect(() => {
      if(!auth || !(role === 'patient')) {
        alert("You are not Valid User !"); 
      }
  }, []);
  return (auth && role === 'patient') ? children : <Navigate to="/" />;
}

export default ProtectedRoute;