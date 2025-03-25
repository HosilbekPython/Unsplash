import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const location = useLocation();
  const user = location.state?.user;
  const darkMode = useSelector((state) => state.theme.darkMode);

  if (!user) {
    return <p className="text-center text-red-500 text-lg">Foydalanuvchi ma'lumotlari topilmadi!</p>;
  }

  return (
    <div className={`max-w-3xl mx-auto p-6 shadow-lg rounded-lg transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <h1 className="text-2xl font-bold mb-4 text-center">Foydalanuvchi profili</h1>
      
      {/* Profil rasmi va asosiy ma'lumotlar */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={user.profile_image.large}
          alt={user.name}
          className="w-32 h-32 rounded-full border-4 border-purple-500"
        />
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">@{user.username}</p>
          <p className="text-gray-400">{user.location || "Manzil mavjud emas"}</p>
          {user.for_hire && (
            <span className="text-green-500 font-semibold">Ishga tayyor</span>
          )}
        </div>
      </div>

      {/* Qo‘shimcha ma’lumotlar */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
          <h3 className="text-lg font-semibold">Asosiy ma'lumotlar</h3>
          <p><strong>Bio:</strong> {user.bio || "Ma'lumot yo'q"}</p>
          <p><strong>Instagram:</strong> {user.instagram_username ? (
            <a href={`https://instagram.com/${user.instagram_username}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              @{user.instagram_username}
            </a>
          ) : "Mavjud emas"}</p>
          <p><strong>Twitter:</strong> {user.twitter_username ? (
            <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              @{user.twitter_username}
            </a>
          ) : "Mavjud emas"}</p>
          <p><strong>Portfolio:</strong> {user.portfolio_url ? (
            <a href={user.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Portfolio ko'rish
            </a>
          ) : "Mavjud emas"}</p>
        </div>

        <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
          <h3 className="text-lg font-semibold">Statistika</h3>
          <p><strong>Jami suratlar:</strong> {user.total_photos}</p>
          <p><strong>Jami yoqtirishlar:</strong> {user.total_likes}</p>
          <p><strong>Jami kolleksiyalar:</strong> {user.total_collections}</p>
          <p><strong>Jami targ'ib qilingan suratlar:</strong> {user.total_promoted_photos}</p>
          <p><strong>Jami targ'ib qilingan illyustratsiyalar:</strong> {user.total_promoted_illustrations}</p>
        </div>
      </div>

      {/* Unsplash profili havolasi */}
      <p className="mt-6 text-center">
        <a href={user.links.html} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-semibold">
          Unsplash profilini ko'rish
        </a>
      </p>
    </div>
  );
};

export default UserProfile;
