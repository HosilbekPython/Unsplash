import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaDownload } from "react-icons/fa";

const ImageCard = ({ image, isLiked, handleToggleLike, handleDownload, handleDetails, handleFilterByCategory }) => {
    if (!image) return null;

    

    const categories = image?.topic_submissions ? Object.keys(image.topic_submissions) : [];

    return (
        <div
            key={image?.id}
            onClick={() => handleDetails(image)}
            className="relative rounded-lg overflow-hidden shadow-lg group"
        >
            <img src={image?.urls?.small} alt={image?.alt_description || "Image"} className="w-full rounded-lg" />

            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-3 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-between items-start">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggleLike(image);
                        }}
                        className="text-red-500 z-50 p-2 rounded-full shadow-md bg-white/20 hover:bg-white/30 transition"
                    >
                        {isLiked ? <AiFillHeart className="text-red-500 text-2xl" /> : <AiOutlineHeart className="text-red-500 text-2xl" />}
                    </button>

                    <div className="relative group">
                        <div className="flex items-center gap-2 px-1 py-1 rounded-full shadow-md cursor-pointer bg-white/20">
                            <img
                                src={image?.user?.profile_image?.small}
                                alt={image?.user?.name || "User"}
                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                            />
                            <p className="text-[10px] sm:text-sm text-white font-bold">{image?.user?.name || "Noma’lum"}</p>
                        </div>
                    </div>
                </div>

                {categories.length > 0 && (
                    <ul className="absolute bottom-14 left-3 bg-white/20 text-white text-xs px-2 py-1 rounded shadow-md">
                        <strong>Kategoriya:</strong>
                        {categories.map((category, index) => (
                            <li
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleFilterByCategory(category);
                                }}
                                className="cursor-pointer hover:text-gray-300 transition"
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                )}

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(image?.urls?.full, `${image?.id}.jpg`);
                    }}
                    className="text-white px-3 py-1 rounded shadow-md text-sm self-end flex items-center gap-2"
                >
                    <FaDownload className="text-lg" />
                </button>
            </div>
        </div>
    );
};

export default ImageCard;
