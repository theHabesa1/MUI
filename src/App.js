import { useState } from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [auth, setAuth] = useState(false);
  const location = useLocation();

  return (
    <>
    <GoogleOAuthProvider clientId="393969779654-in2h3nlapku0eo0e5ug1h24eubhls5q0.apps.googleusercontent.com">
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/signup" element={<Signup setAuth={setAuth} />} />
        <Route path="/home" element={<Home/>} />
        <Route
          path="/"
          element={
            auth ? (
              <Home setAuth={setAuth} />
            ) : (
              <Navigate to="/login" state={{ from: location }} replace />
            )
          }
        />
      </Routes>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
