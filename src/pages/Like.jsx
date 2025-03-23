import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "../redux/likeSlice"; 
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaDownload } from "react-icons/fa";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import axios from "axios";

const LikedImages = () => {
    const likedImages = useSelector((state) => state.likes.likedImages); 
    const dispatch = useDispatch(); 

    const handleToggleLike = (image) => {
        dispatch(toggleLike(image)); 
    };

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
        } catch (error) {
            console.error("Yuklab olishda xatolik:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Sevimli rasmlar</h1>
            {likedImages.length === 0 ? (
                <p className="text-center text-gray-500">Siz hali hech qanday rasmni yoqtirmagansiz.</p>
            ) : (
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 768: 2, 1024: 3, 1280: 4 }}>
                    <Masonry gutter="10px">
                        {likedImages.map((image) => (
                            <div key={image.id} className="relative rounded-lg overflow-hidden shadow-lg group">
                                <img src={image.urls.small} alt={image.alt_description} className="w-full rounded-lg" />
                                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-3 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex justify-between items-start">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleToggleLike(image);
                                            }}
                                            className="text-red-500 z-50 p-2 rounded-full shadow-md bg-white/20 hover:bg-white/30 transition"
                                        >
                                            <AiFillHeart className="text-red-500 text-2xl" />
                                        </button>
                                        <div className="relative group">
                                            <div className="flex items-center gap-2 px-3 py-1 rounded-full shadow-md cursor-pointer bg-white/20">
                                                <img
                                                    src={image.user.profile_image.small}
                                                    alt={image.user.name}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <p className="text-sm text-white font-bold">{image.user.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDownload(image.urls.full, `${image.id}.jpg`);
                                        }}
                                        className="text-white px-3 py-1 rounded shadow-md text-sm self-end flex items-center gap-2"
                                    >
                                        <FaDownload className="text-lg" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            )}
        </div>
    );
};

export default LikedImages;
