import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  FaDownload,
  FaHeart,
  FaCalendarAlt,
  FaUser,
  FaLink,
  FaExternalLinkAlt,
  FaInstagram,
  FaTwitter,
  FaGlobe,
  FaRuler,
  FaPalette,
  FaClock,
  FaImage,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Details = () => {
  const location = useLocation();
  const image = location.state?.image;

  if (!image) {
    return <p className="text-center text-red-500 text-lg">Rasm topilmadi!</p>;
  }

  // Rasmni yuklab olish funksiyasi
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
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Rasm qismi */}
        <img
          src={image.urls.full}
          alt={image.alt_description}
          className="w-full h-96 object-cover"
        />

        {/* Ma'lumotlar qismi */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {image.description || "Tavsif mavjud emas"}
          </h1>

          {/* Vaqtga Oid Ma'lumotlar */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              <FaClock className="inline-block text-purple-500 mr-2" />
              Vaqtga Oid Ma'lumotlar:
            </h2>
            <ul className="space-y-2">
              <li>
                <strong>Yaratilgan sana:</strong> {new Date(image.created_at).toLocaleDateString()}
              </li>
              <li>
                <strong>Yangilangan sana:</strong> {new Date(image.updated_at).toLocaleDateString()}
              </li>
              <li>
                <strong>Targ'ib qilingan sana:</strong>{" "}
                {image.promoted_at ? new Date(image.promoted_at).toLocaleDateString() : "Mavjud emas"}
              </li>
            </ul>
          </div>

          {/* Rasm Haqida Texnik Ma'lumotlar */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              <FaRuler className="inline-block text-purple-500 mr-2" />
              Rasm Haqida Texnik Ma'lumotlar:
            </h2>
            <ul className="space-y-2">
              <li>
                <strong>Rasm hajmi:</strong> {image.width} x {image.height}
              </li>
              <li>
                <strong>Asosiy rang:</strong>{" "}
                <span
                  style={{ backgroundColor: image.color }}
                  className="inline-block w-4 h-4 rounded-full mr-2"
                ></span>
                {image.color}
              </li>
              <li>
                <strong>Blur hash:</strong> {image.blur_hash}
              </li>
            </ul>
          </div>

          {/* Rasm Manzillari */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              <FaImage className="inline-block text-purple-500 mr-2" />
              Rasm Manzillari:
            </h2>
            <div className="space-y-4">
              {/* Raw */}
              <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center">
                  <FaExternalLinkAlt className="text-purple-500 mr-2" />
                  <span className="text-gray-700">Raw</span>
                </div>
                <a
                  href={image.urls.raw}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300"
                >
                  Ko'rish
                </a>
              </div>

              {/* Full */}
              <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center">
                  <FaExternalLinkAlt className="text-purple-500 mr-2" />
                  <span className="text-gray-700">Full</span>
                </div>
                <a
                  href={image.urls.full}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300"
                >
                  Ko'rish
                </a>
              </div>

              {/* Regular */}
              <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center">
                  <FaExternalLinkAlt className="text-purple-500 mr-2" />
                  <span className="text-gray-700">Regular</span>
                </div>
                <a
                  href={image.urls.regular}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300"
                >
                  Ko'rish
                </a>
              </div>

              {/* Small */}
              <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center">
                  <FaExternalLinkAlt className="text-purple-500 mr-2" />
                  <span className="text-gray-700">Small</span>
                </div>
                <a
                  href={image.urls.small}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300"
                >
                  Ko'rish
                </a>
              </div>

              {/* Thumb */}
              <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center">
                  <FaExternalLinkAlt className="text-purple-500 mr-2" />
                  <span className="text-gray-700">Thumb</span>
                </div>
                <a
                  href={image.urls.thumb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300"
                >
                  Ko'rish
                </a>
              </div>
            </div>
          </div>

          {/* Havolalar */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg mb-6">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">
    <FaLink className="inline-block text-purple-500 mr-2" />
    Havolalar:
  </h2>
  <div className="space-y-4">
    {/* Self havolasi */}
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center">
        <FaExternalLinkAlt className="text-purple-500 mr-2" />
        <span className="text-gray-700">Self</span>
      </div>
      <a
        href={image.links.self}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300"
      >
        Ko'rish
      </a>
    </div>

    {/* HTML havolasi */}
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center">
        <FaExternalLinkAlt className="text-purple-500 mr-2" />
        <span className="text-gray-700">HTML</span>
      </div>
      <a
        href={image.links.html}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300"
      >
        Ko'rish
      </a>
    </div>

    {/* Download havolasi */}
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center">
        <FaDownload className="text-purple-500 mr-2" />
        <span className="text-gray-700">Download</span>
      </div>
      <a
        href={image.links.download}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300"
      >
        Yuklab olish
      </a>
    </div>

    {/* Download Location havolasi */}
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center">
        <FaDownload className="text-purple-500 mr-2" />
        <span className="text-gray-700">Download Location</span>
      </div>
      <a
        href={image.links.download_location}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300"
      >
        Yuklab olish
      </a>
    </div>
  </div>
</div>
          {/* Muallif Haqida To'liq Ma'lumotlar */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              <FaUser className="inline-block text-purple-500 mr-2" />
              Muallif Haqida To'liq Ma'lumotlar:
            </h2>
            <div className="space-y-4">
              {/* Muallifning rasmi va ismi */}
              <div className="flex items-center space-x-4">
                <img
                  src={image.user.profile_image.large}
                  alt={image.user.name}
                  className="w-16 h-16 rounded-full border-2 border-purple-500"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{image.user.name}</h3>
                  <p className="text-gray-600">@{image.user.username}</p>
                </div>
              </div>

              {/* Muallifning bio ma'lumoti */}
              <div>
                <p className="text-gray-700">
                  <strong>Bio:</strong> {image.user.bio || "Mavjud emas"}
                </p>
              </div>

              {/* Muallifning joylashuvi */}
              <div>
                <p className="text-gray-700">
                  <strong>Joylashuv:</strong> {image.user.location || "Mavjud emas"}
                </p>
              </div>

              {/* Muallifning ijtimoiy tarmoqdagi ma'lumotlari */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Ijtimoiy Tarmoqlar:</h4>
                <ul className="space-y-2">
                  {image.user.social?.instagram_username && (
                    <li>
                      <a
                        href={`https://instagram.com/${image.user.social.instagram_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        <FaInstagram className="inline-block mr-2" />
                        Instagram: @{image.user.social.instagram_username}
                      </a>
                    </li>
                  )}
                  {image.user.social?.twitter_username && (
                    <li>
                      <a
                        href={`https://twitter.com/${image.user.social.twitter_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        <FaTwitter className="inline-block mr-2" />
                        Twitter: @{image.user.social.twitter_username}
                      </a>
                    </li>
                  )}
                  {image.user.social?.portfolio_url && (
                    <li>
                      <a
                        href={image.user.social.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        <FaGlobe className="inline-block mr-2" />
                        Shaxsiy Veb-sahifa
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {/* Muallifning statistik ma'lumotlari */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Statistika:</h4>
                <ul className="space-y-2">
                  <li>
                    <strong>Kolleksiyalar:</strong> {image.user.total_collections}
                  </li>
                  <li>
                    <strong>Rasmlar:</strong> {image.user.total_photos}
                  </li>
                  <li>
                    <strong>Layklar:</strong> {image.user.total_likes}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Rasmga Oid Statistik Ma'lumotlar */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              <FaHeart className="inline-block text-red-500 mr-2" />
              Rasmga Oid Statistik Ma'lumotlar:
            </h2>
            <ul className="space-y-2">
              <li>
                <strong>Layklar soni:</strong> {image.likes}
              </li>
              <li>
                <strong>Liked by user:</strong> {image.liked_by_user ? "Ha" : "Yo'q"}
              </li>
              <li>
                <strong>Current user collections:</strong> {image.current_user_collections.length}
              </li>
              <li>
                <strong>Sponsorship:</strong> {image.sponsorship ? "Mavjud" : "Mavjud emas"}
              </li>
              <li>
                <strong>Asset type:</strong> {image.asset_type}
              </li>
            </ul>
          </div>

          {/* Yuklab olish tugmasi */}
          <button
            onClick={() => handleDownload(image.urls.full, `image-${image.id}.jpg`)}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
          >
            <FaDownload className="mr-2" />
            Yuklab olish
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Details;