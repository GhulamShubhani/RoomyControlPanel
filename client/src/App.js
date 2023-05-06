import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import PrivateRoute from "./utils/PrivateRoute.js";
import Login from "./pages/Login";
import ControlPanel from "./components/ControlPanel";
import AddLandLord from "./components/AddLandLord";
import AddProperty from "./components/AddProperty";
import AddAdmin from "./components/AddAdmin";

// Initialize Firebase
const firebaseConfig = {
  // Your firebase config object here
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    const tokenListener = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", tokenListener);
    return () => {
      window.removeEventListener("storage", tokenListener);
    };
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login auth={auth} />} />
          <Route element={<PrivateRoute auth={auth} />}>
            <Route
              path="/login"
              element={!token ? <Login auth={auth} /> : <Navigate to="/" />}
            />
            <Route path="/" element={<ControlPanel auth={auth} />} />
            <Route path="/Admins" element={<AddAdmin auth={auth} />} />
            <Route path="/Landlord" element={<AddLandLord auth={auth} />} />
            <Route path="/Properties" element={<AddProperty auth={auth} />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
