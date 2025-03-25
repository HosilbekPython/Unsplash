import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import loginImage from "../assets/cat.jpg";
import { Link } from "react-router-dom";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(login({ uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL }));
      navigate("/");
      toast.success("Tizimga muvaffaqiyatli kirdingiz!");
    } catch (err) {
      setError("Email yoki parol noto‘g‘ri!");
      toast.error("Email yoki parol noto‘g‘ri!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      dispatch(login({ uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL }));
      navigate("/");
      toast.success("Google orqali tizimga muvaffaqiyatli kirdingiz!");
    } catch (err) {
      toast.error("Google orqali kirishda xatolik yuz berdi!");
    }
  };

  return (
    <div className={`flex h-dvh items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className={`relative w-full h-full flex flex-col md:flex-row ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg overflow-hidden`}>
        <div className="hidden md:block md:w-1/2 h-full relative">
          <img src={loginImage} alt="Login" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 md:hidden">
          <img src={loginImage} alt="Login" className="w-full h-full object-cover opacity-50" />
        </div>
        <div className={`relative w-full md:w-1/2 h-full p-8 flex flex-col justify-center ${darkMode ? "bg-gray-900" : "bg-white"} rounded-lg shadow-lg`}>
          <h2 className="text-2xl font-bold mb-6 text-center">Kirish</h2>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className={`flex items-center border p-3 rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"}`}>
              <AiOutlineMail className="text-gray-500 mr-2" />
              <input type="email" placeholder="Email" className="w-full outline-none bg-transparent" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className={`flex items-center border p-3 rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"}`}>
              <AiOutlineLock className="text-gray-500 mr-2" />
              <input type="password" placeholder="Parol" className="w-full outline-none bg-transparent" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700">Kirish</button>
          </form>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-500">yoki</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <p className="text-sm text-center">
            Hisobingiz yo‘qmi? <Link to="/register" className="text-blue-500 hover:underline">Ro‘yxatdan o‘tish</Link>
          </p>
          <button onClick={handleGoogleLogin} className={`w-full flex items-center justify-center gap-2 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-600 border"} p-3 rounded hover:bg-gray-200`}>
            <FcGoogle className="text-xl" /> Google bilan kirish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
