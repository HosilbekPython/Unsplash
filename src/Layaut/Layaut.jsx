import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineInfoCircle,
  AiOutlinePhone,
  AiFillHeart,
  AiOutlineLogin,
  AiOutlineLogout,
} from "react-icons/ai";
import { BsSun, BsMoon } from "react-icons/bs"; // 🌞 Quyosh va 🌙 Oy ikonkalari
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { toggleDarkMode } from "../redux/themeSlice"; // 🔥 Dark Mode
import { toast } from "react-toastify";
import { auth } from "../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const likedImages = useSelector((state) => state.likes.likedImages);
  const darkMode = useSelector((state) => state.theme.darkMode); // 🌙 Dark mode holati

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(login(result.user));
      toast.success("Tizimga muvaffaqiyatli kirdingiz!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      toast.info("Tizimdan chiqdingiz!");
      navigate("/login");
    } catch (error) {
      toast.error("Chiqishda xatolik: " + error.message);
    }
  };

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}>
      <nav className="bg-gray-800 z-50 text-white py-3 px-4 fixed top-0 w-full shadow-lg">
        <ul className="flex justify-around md:justify-center md:gap-10 list-none">
          <li>
            <Link to="/" className="flex flex-col md:flex-row gap-2 items-center hover:text-gray-300 transition">
              <AiFillHome className="text-2xl md:text-xl" />
              <span className="text-xs md:text-sm">Bosh Sahifa</span>
            </Link>
          </li>
          <li>
            <Link to="/about" className="flex flex-col md:flex-row gap-2 items-center hover:text-gray-300 transition">
              <AiOutlineInfoCircle className="text-2xl md:text-xl" />
              <span className="text-xs md:text-sm">Biz haqimizda</span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className="flex flex-col md:flex-row gap-2 items-center hover:text-gray-300 transition">
              <AiOutlinePhone className="text-2xl md:text-xl" />
              <span className="text-xs md:text-sm">Aloqa</span>
            </Link>
          </li>
          <li>
            <Link to="/like" className="flex flex-col md:flex-row gap-2 items-center text-red-400 hover:text-red-500 transition relative">
              <AiFillHeart className="text-2xl md:text-xl" />
              <span className="text-xs md:text-sm">Yoqtirganlar</span>
              {likedImages.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {likedImages.length}
                </span>
              )}
            </Link>
          </li>

          {isLoggedIn && user ? (
            <li>
              <button
                onClick={handleLogout}
                className="flex flex-col md:flex-row items-center hover:text-gray-300 transition"
              >
                <AiOutlineLogout className="text-2xl md:text-xl" />
                <span className="text-xs md:text-sm">Chiqish</span>
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={handleGoogleLogin}
                className="flex flex-col md:flex-row items-center hover:text-gray-300 transition"
              >
                <AiOutlineLogin className="text-2xl md:text-xl" />
                <span className="text-xs md:text-sm">Google bilan kirish</span>
              </button>
            </li>
          )}
        </ul>
      </nav>

      <main className="flex-1 min-h-dvh p-4 pt-16 md:pt-24">
        <Outlet />
      </main>

      <button
  onClick={() => dispatch(toggleDarkMode())}
  className={`fixed bottom-6 right-6 ${
    darkMode ? "bg-gray-200 text-gray-800" : "bg-gray-800 text-white"
  } p-3 rounded-full shadow-lg hover:scale-110 transition-transform`}
>
  {darkMode ? (
    <BsSun className="text-2xl text-yellow-400" />
  ) : (
    <BsMoon className="text-2xl text-gray-300" />
  )}
</button>

    </div>
  );
}
