import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux";
import axios from "axios";
import {
  FaDownload,
  FaClock,
  FaUser,
  FaRuler,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Masonry from "react-masonry-css";
import ImageCard from "../components/ImageCard";
import "react-toastify/dist/ReactToastify.css";

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [image, setImage] = useState(location.state?.image);
  const images = location.state?.images || [];
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [selectedSize, setSelectedSize] = useState("full");

  const user = image.user

  if (!image) {
    return <p className="text-center text-red-500 text-lg">Rasm topilmadi!</p>;
  }

  const handleDownload = async (url, filename, format) => {
    try {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data], { type: `image/${format}` });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Rasm muvaffaqiyatli yuklandi!");
    } catch (error) {
      toast.error("Rasmni yuklab olishda muammo yuz berdi!");
    }
  };

  const handleUserClick = () => {
    navigate("/user", { state: { user: user } });
  };
  

  return (
    <div className={`rounded-xl ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className={`max-w-screen-lg mx-auto rounded-xl shadow-2xl overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="flex flex-col items-center p-4">
          <img src={image.urls[selectedSize]} alt={image.alt_description} className="h-[70dvh] mx-auto" />
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
            <h2 className="text-xl font-semibold flex items-center">
              <FaClock className="mr-2" /> Vaqt ma'lumotlari:
            </h2>
            <ul>
              <li><strong>Yaratilgan:</strong> {new Date(image.created_at).toLocaleDateString()}</li>
              <li><strong>Yangilangan:</strong> {new Date(image.updated_at).toLocaleDateString()}</li>
              <li><strong>Targ'ib qilingan:</strong> {image.promoted_at ? new Date(image.promoted_at).toLocaleDateString() : "Mavjud emas"}</li>
            </ul>
          </div>
          <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
            <h2 className="text-xl font-semibold flex items-center">
              <FaRuler className="mr-2" /> Texnik ma'lumotlar:
            </h2>
            <ul>
              <li><strong>Hajmi:</strong> {image.width} x {image.height}</li>
              <li><strong>Asosiy rang:</strong> <span className="inline-block w-4 h-4 rounded-full mr-2" style={{ backgroundColor: image.color }}></span>{image.color}</li>
              <li><strong>Blur hash:</strong> {image.blur_hash}</li>
            </ul>
          </div>
          <div 
            className={`p-6 rounded-lg col-span-2 ${darkMode ? "bg-gray-700" : "bg-gray-100"} cursor-pointer hover:bg-opacity-80 transition`}
            onClick={handleUserClick} 
          >
            <h2 className="text-xl font-semibold flex items-center">
              <FaUser className="mr-2" /> Muallif:
            </h2>
            <div className="flex items-center space-x-4">
              <img src={image.user.profile_image.large} alt={image.user.name} className="w-16 h-16 rounded-full border-2 border-purple-500" />
              <div>
                <h3 className="text-lg font-semibold">{image.user.name}</h3>
                <p className="text-gray-600">@{image.user.username}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 p-6">
          {["jpg", "png", "webp"].map((format) => (
            <button
              key={format}
              onClick={() => handleDownload(image.urls.full, `image-${image.id}`, format)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
            >
              <FaDownload className="mr-2" /> <span>{format.toUpperCase()} </span>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 px-6 w-full max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">Boshqa rasmlar</h2>
        <Masonry className="w-full flex gap-3 mb-3">
          {images.map((img) => (
            <div key={img.id} className="w-full mb-3">
              <ImageCard
                image={img}
                isLiked={false}
                handleToggleLike={() => {}}
                handleDownload={handleDownload}
              />
            </div>
          ))}
        </Masonry>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};
export default Details;
