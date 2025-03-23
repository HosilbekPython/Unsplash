import { useSelector } from "react-redux";

export default function About() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex justify-start items-center w-full h-full bg-gray-100 p-4">
      <div className="rounded-lg p-6 w-full  bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Foydalanuvchi Ma’lumotlari</h1>

        {user ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full border-2 border-gray-300 shadow"
                />
              )}

              <div>
                <p className="text-lg font-semibold text-gray-700">
                  {user.displayName || "Ism mavjud emas"}
                </p>
                <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
                <p className="text-gray-600"><strong>Telefon:</strong> {user.phoneNumber || "Mavjud emas"}</p>
                <p className="text-gray-600">
                  <strong>Email tasdiqlangan:</strong>{" "}
                  {user.emailVerified ? "Ha" : "Yo‘q"}
                </p>
              </div>
            </div>

            {user.metadata && (
              <div className="text-gray-500 text-sm space-y-2">
                <p><strong>Hisob yaratilgan:</strong> {new Date(user.metadata.createdAt).toLocaleString()}</p>
                <p><strong>Oxirgi login:</strong> {new Date(user.metadata.lastLoginAt).toLocaleString()}</p>
              </div>
            )}

            {user.providerData && (
              <div className="border-t pt-4">
                <h2 className="text-lg font-semibold text-gray-700">Auth Provider Ma'lumotlari:</h2>
                <ul className="list-disc pl-5 text-gray-600">
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
          <p className="text-gray-600">Foydalanuvchi ma’lumoti yo‘q</p>
        )}
      </div>
    </div>
  );
}
