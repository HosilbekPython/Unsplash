import { useSelector } from "react-redux";

export default function About() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex justify-start items-center h-full bg-gray-100 p-4">
      <div className="rounded-lg p-6 w-full max-w-md ">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Foydalanuvchi Ma’lumotlari</h1>

        {user ? (
          <div className="space-y-4">
            <div className="flex">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300 shadow"
                />

              )}

           <div>
           <p className="text-lg font-semibold text-gray-700">
                {user.displayName || "Ism mavjud emas"}
              </p>
              <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>

              {user.metadata && (
                <div className="text-gray-500 text-sm">
                  <p><strong>Hisob yaratilgan:</strong> {new Date(user.metadata.createdAt).toLocaleString()}</p>
                  <p><strong>Oxirgi login:</strong> {new Date(user.metadata.lastLoginAt).toLocaleString()}</p>
                </div>
              )}
           </div>
            </div>

          </div>
        ) : (
          <p className="text-gray-600">Foydalanuvchi ma’lumoti yo‘q</p>
        )}
      </div>
    </div>
  );
}
