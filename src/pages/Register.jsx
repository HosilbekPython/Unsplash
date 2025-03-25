import { useState } from "react";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import registerImage from "../assets/cat.jpg";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Parollar mos kelmadi!");
      toast.error("Parollar mos kelmadi!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await updateProfile(user, { displayName: username });
      dispatch(login({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        emailVerified: user.emailVerified,
        accessToken: await user.getIdToken(),
        metadata: user.metadata, 
        providerData: user.providerData, 
      }));
      navigate("/");
      toast.success("Ro'yxatdan muvaffaqiyatli o'tdingiz!");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Bu email allaqachon ro'yxatdan o'tgan. Iltimos, tizimga kiring!");
        toast.error("Bu email allaqachon ro'yxatdan o'tgan. Iltimos, tizimga kiring!");
      } else {
        setError("Ro'yxatdan o'tishda xatolik yuz berdi!");
        toast.error("Ro'yxatdan o'tishda xatolik yuz berdi!");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      dispatch(login({ 
        uid: user.uid, 
        email: user.email, 
        displayName: user.displayName,
        photoURL: user.photoURL 
      }));
      navigate("/");
      toast.success("Google orqali ro'yxatdan muvaffaqiyatli o'tdingiz!");
    } catch (err) {
      console.error("Google orqali ro'yxatdan o'tishda xatolik:", err);
      setError("Google orqali ro'yxatdan o'tishda xatolik yuz berdi!");
      toast.error("Google orqali ro'yxatdan o'tishda xatolik yuz berdi!");
    }
  };

  return (
    <div className={`flex h-dvh items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className={`relative w-full h-full flex flex-col md:flex-row ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg overflow-hidden`}>
        
        <div className="hidden md:block md:w-1/2 h-full relative">
          <img src={registerImage} alt="Register" className="w-full h-full object-cover" />
        </div>

        <div className="absolute inset-0 md:hidden">
          <img src={registerImage} alt="Register" className="w-full h-full object-cover opacity-50" />
        </div>

        <div className={`relative w-full md:w-1/2 h-full p-8 flex flex-col justify-center ${darkMode ? "bg-gray-900" : "bg-white"} rounded-lg shadow-lg`}>
          <h2 className="text-2xl font-bold mb-6 text-center">Ro'yxatdan o'tish</h2>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className={`flex items-center border p-3 rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"}`}>
              <AiOutlineUser className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Ism"
                className="w-full outline-none bg-transparent"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={`flex items-center border p-3 rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"}`}>
              <AiOutlineMail className="text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Email"
                className="w-full outline-none bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={`flex items-center border p-3 rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"}`}>
              <AiOutlineLock className="text-gray-500 mr-2" />
              <input
                type="password"
                placeholder="Parol"
                className="w-full outline-none bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={`flex items-center border p-3 rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"}`}>
              <AiOutlineLock className="text-gray-500 mr-2" />
              <input
                type="password"
                placeholder="Parolni tasdiqlash"
                className="w-full outline-none bg-transparent"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700">
              Ro'yxatdan o'tish
            </button>
          </form>

          <div className="flex items-center my-4">
            <hr className={`flex-grow ${darkMode ? "border-gray-600" : "border-gray-300"}`} />
            <span className={`mx-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>yoki</span>
            <hr className={`flex-grow ${darkMode ? "border-gray-600" : "border-gray-300"}`} />
          </div>

          <p className={`text-sm cursor-pointer py-4 text-center ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Hisobingiz bormi?  
            <Link to="/login" className="text-blue-500 hover:underline"> Kirish</Link>
          </p>

          <button
            onClick={handleGoogleSignIn}
            className={`w-full flex items-center justify-center gap-2 ${
              darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-700 border"
            } p-3 rounded hover:bg-gray-200`}
          >
            <FcGoogle className="text-xl" />
            Google bilan ro'yxatdan o'tish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;