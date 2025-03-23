import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layaut/Layaut"; 
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Cantakt"; 
import Like from "./pages/Like";
import Details from "./pages/Detals"; 
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {


  return (
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
