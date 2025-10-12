import { useEffect, useState } from "react";

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            title="Nazad na vrh"
            className="fixed bottom-5 right-5 z-[999] bg-blue-400 text-black hover:scale-110 transition-all p-3 rounded-full shadow-xl"
        >
            <i className="bi bi-arrow-up-short text-2xl"></i>
        </button>
    );
};

export default BackToTop;
