import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const CookiesNotice = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookieAccepted = Cookies.get("cookieAccepted");
        if (cookieAccepted !== "true") {
            setIsVisible(true);
        }
    }, []);

    const handleClose = () => {
        Cookies.set("cookieAccepted", "true", {
            expires: 365,
            sameSite: "Lax",
        });
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <section
            className="fixed bottom-4 right-4 z-[999]"
            role="dialog"
            aria-label="Obavijest o kolačićima"
        >
            <div className="bg-white px-6 py-4 rounded-xl shadow-2xl w-full border border-gray-300 dark:border-[#ffffff22]">
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    🍪 Kolačići
                </h2>
                <p className="text-sm mb-4">
                    Koristimo kolačiće kako bismo mogli sačuvati Vaše zadane postavke na ovom uređaju.
                </p>
                <div className="flex justify-between items-center gap-2">
                    <Link
                        to="/legal"
                        className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-600 text-sm text-gray-800 dark:text-white font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
                    >
                        <i className="bi bi-book" /> Saznaj više
                    </Link>
                    <button
                        onClick={handleClose}
                        className="flex items-center gap-1 px-3 py-1 bg-[#ef4444] text-white text-sm font-medium rounded-lg hover:bg-[#b91c1c] transition-all"
                    >
                        <i className="bi bi-x-lg" /> Zatvori
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CookiesNotice;
