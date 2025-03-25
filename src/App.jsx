import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layaut/Layaut";
import Home from "./pages/home";
import About from "./pages/About";
import Contact from "./pages/Cantakt";
import Like from "./pages/Like";
import Details from "./pages/Detals";
import Login from "./pages/login";
import Register from "./pages/Register";
import UserDanix from "./pages/UserDanix";

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode); 

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}>
      <Router>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="like" element={<Like />} />
            <Route path="details/:id" element={<Details />} />
            <Route path="user" element={<UserDanix />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
