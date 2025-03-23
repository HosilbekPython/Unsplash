import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { toast } from "react-toastify";
import { AiOutlineSearch } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "../redux/likeSlice";
import { useNavigate } from "react-router-dom";
import ImageCard from "../components/ImageCard"; 

function Home() {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const observerRef = useRef(null);
    const token = "xSwCEf7p426wBDFjSPefDKSVoe5gI0p5NyGfeKmNs78";

    const dispatch = useDispatch();
    const likedImages = useSelector((state) => state.likes.likedImages);
    const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const query = searchQuery.trim() || "random";
            const response = await axios.get(
                `https://api.unsplash.com/search/photos?client_id=${token}&query=${query}&page=${page}&per_page=10`
            );
            setImages((prev) => (page === 1 ? response.data.results : [...prev, ...response.data.results]));
        } catch (error) {
            console.error("API xatosi:", error);
            toast.error("Rasmlarni yuklashda xatolik yuz berdi!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, [page, searchQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        setImages([]);
        setPage(1);
    };

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
            toast("Muofaqiyatli yuklandi! ")
        } catch (error) {
            console.error("Yuklab olishda xatolik:", error);
            toast.error("Rasmni yuklab olishda muammo yuz berdi!");
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [loading]);

    const handleDetails = (image) => {
        navigate(`/details/${image.id}`, { state: { image } });
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center gap-5">
                <h1 className="text-3xl font-bold mb-4 text-center">Rasmlar</h1>

                <form onSubmit={handleSearch} className="mb-6 flex items-center bg-white shadow-md rounded-full overflow-hidden w-full max-w-lg mx-auto border border-gray-300">
                    <div className="px-4 text-gray-500">
                        <AiOutlineSearch className="text-2xl" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Qidiruv..."
                        className="w-full py-3 text-gray-700 focus:outline-none"
                    />
                    <button type="submit" className="bg-gray-500 text-white px-4 py-3 rounded-r-lg hover:bg-gray-700">
                        Qidirish
                    </button>
                </form>
            </div>

            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 768: 2, 1024: 3, 1280: 4 }}>
                <Masonry gutter="10px">
                    {images.map((image) => (
                        <ImageCard
                            key={image.id}
                            image={image}
                            isLiked={likedImages.some((img) => img.id === image.id)}
                            handleToggleLike={handleToggleLike}
                            handleDownload={handleDownload}
                            handleDetails={handleDetails}
                        />
                    ))}
                </Masonry>
            </ResponsiveMasonry>

            <div ref={observerRef} className="h-10"></div>
        </div>
    );
}

export default Home;
