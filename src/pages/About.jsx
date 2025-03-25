import { useSelector } from "react-redux";

export default function About() {
  const user = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.theme.darkMode); 

  return (
    <div className={`flex justify-start items-start w-full h-full p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className={`rounded-lg p-6 w-full shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
        <h1 className="text-2xl font-bold mb-4">Foydalanuvchi Ma’lumotlari</h1>

        {user ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full border-2 shadow"
                />
              )}

              <div>
                <p className="text-lg font-semibold">{user.displayName || "Ism mavjud emas"}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Telefon:</strong> {user.phoneNumber || "Mavjud emas"}</p>
                <p>
                  <strong>Email tasdiqlangan:</strong> {user.emailVerified ? "Ha" : "Yo‘q"}
                </p>
              </div>
            </div>

            {user.metadata && (
              <div className="text-sm space-y-2">
                <p><strong>Hisob yaratilgan:</strong> {new Date(user.metadata.createdAt).toLocaleString()}</p>
                <p><strong>Oxirgi login:</strong> {new Date(user.metadata.lastLoginAt).toLocaleString()}</p>
              </div>
            )}

            {user.providerData && (
              <div className="border-t pt-4">
                <h2 className="text-lg font-semibold">Auth Provider Ma'lumotlari:</h2>
                <ul className="list-disc pl-5">
                  {user.providerData.map((provider, index) => (
                    <li key={index}>
                      <strong>Provider:</strong> {provider.providerId} <br />
                      <strong>Email:</strong> {provider.email || "Noma’lum"} <br />
                      <strong>UID:</strong> {provider.uid}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p>Foydalanuvchi ma’lumoti yo‘q</p>
        )}
      </div>
    </div>
  );
}
