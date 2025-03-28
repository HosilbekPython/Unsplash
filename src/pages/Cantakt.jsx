import React from "react";
import { useSelector } from "react-redux";
import { AiFillInstagram, AiOutlineMail, AiFillPhone, AiOutlineSend } from "react-icons/ai";

export default function About() {
  const darkMode = useSelector((state) => state.theme.darkMode); 

  return (
    <div className={`max-w-2xl mx-auto p-6 rounded-lg shadow-md mt-10 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <h1 className="text-2xl font-bold mb-4 text-center">Men haqimda</h1>
      <p className="text-center mb-4">
        Salom! Men <strong>Habibullo Abdumutallibov</strong>. Frontend dasturchiman va ReactJS, Redux Toolkit, Firebase bilan ishlashni yaxshi ko‘raman.
      </p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Bog‘lanish</h2>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <AiFillInstagram className="text-pink-600 text-2xl" />
            <a href="https://www.instagram.com/habibullox0311" target="_blank" rel="noopener noreferrer" className="hover:underline">
              @habibullox0311
            </a>
          </li>
          <li className="flex items-center gap-3">
            <AiOutlineSend className="text-blue-500 text-2xl" />
            <a href="https://t.me/habibullox000" target="_blank" rel="noopener noreferrer" className="hover:underline">
              @habibullox000
            </a>
          </li>
          <li className="flex items-center gap-3">
            <AiFillPhone className="text-green-500 text-2xl" />
            <a href="tel:+998951683608" className="hover:underline">
              +998 95 168 36 08
            </a>
          </li>
          <li className="flex items-center gap-3">
            <AiOutlineMail className="text-red-500 text-2xl" />
            <a href="mailto:shohakbar0@gmail.com" className="hover:underline">
              shohakbar0@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
