import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageCard from "../components/ImageCard"; 

const Details = () => {
  const location = useLocation();
  const image = location.state?.image;



  if (!image) {
    return <p className="text-center text-red-500 text-lg">Rasm topilmadi!</p>;
  }

  const handleDownload = async (url, filename) => {
    try {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Rasm muvaffaqiyatli yuklandi!");
    } catch (error) {
      console.error("Yuklab olishda xatolik:", error);
      toast.error("Rasmni yuklab olishda muammo yuz berdi!");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <ToastContainer position="top-center flex" autoClose={3000} />

      <div className="relative max-w-2xl w-full">
        <img src={image.urls.regular} alt={image.alt_description} className="w-full rounded-lg shadow-lg" />
        <button
          onClick={() => handleDownload(image.urls.full, `${image.id}.jpg`)}
          className="absolute bottom-3 right-3 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition"
        >
          <FaDownload className="text-xl" />
        </button>
      </div>
      <div className="mt-6 w-full max-w-2xl md:w-2/3 flex flex-col md:flex-row justify-between    p-4  rounded-lg">

        <div>
          <h1 className="text-2xl font-bold mb-2">{image.alt_description || "Rasm tafsilotlari"}</h1>
          {image.description && <p className="text-gray-600 mb-2">{image.description}</p>}

          <div className="mt-4 flex flex-col gap-2">
            <p><strong>Rang:</strong> <span style={{ backgroundColor: image.color }} className="inline-block w-6 h-6 rounded-full border"></span></p>
            <p><strong>Izohlar:</strong> {image.likes} ta yoqtirish</p>
            <p><strong>O'lcham:</strong> {image.width} x {image.height}px</p>
          </div>
         
        </div>
        <div>
        <div className="mt-6 w-full max-w-2xl p-4  rounded-lg flex items-center gap-4">
            <img src={image.user.profile_image.medium} alt={image.user.name} className="w-16 h-16 rounded-full border shadow-md" />
          </div> 
            <p className="text-lg font-semibold">{image.user.name}</p>
            {image.user.location && <p className="text-gray-500">{image.user.location}</p>}
            <a href={image.user.links.html} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Unsplash profilini ko‘rish
            </a>
          </div>
      </div>

      <ImageCard></ImageCard>
    </div>
  );
};

export default Details;
