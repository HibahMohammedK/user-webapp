import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/user/profile/Profile";
import Home from "./components/user/home/Home";
import AdminHome from "./components/admin/AdminHome";
import ProtectedRoute from "../src/components/ProtectedRoute"
import './App.css'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin routes */}
      <Route
        path="/adminhome"
        element={
          
            <AdminHome />
       
        }
      />
      </Routes>
    </Router>
    </>
  )
}

export default App
