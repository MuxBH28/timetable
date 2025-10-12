import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstall, setShowInstall] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstall(true);
        };
        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log("PWA install outcome:", outcome);
        setDeferredPrompt(null);
        setShowInstall(false);
    };

    return (
        <footer className="bg-gray-900 text-white py-8 px-6">
            <section className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="font-semibold flex items-center gap-2">
                        <i className="bi bi-person-circle" /> Author
                    </span>
                    <a
                        href="https://msehic.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-400 flex items-center gap-1"
                    >
                        <i className="bi bi-person" /> msehic.com
                    </a>
                    <a
                        href="mailto:contact@msehic.com"
                        className="hover:underline text-blue-400 flex items-center gap-1"
                    >
                        <i className="bi bi-envelope" /> contact@msehic.com
                    </a>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <a
                        href="https://github.com/MuxBH28/timetable/issues"
                        className="hover:underline text-red-400 flex items-center gap-1"
                    >
                        <i className="bi bi-bug" /> Report a Bug
                    </a>
                    <a
                        href="mailto:contact@msehic.com?subject=Bug%20Report"
                        className="hover:underline text-red-400 flex items-center gap-1"
                    >
                        <i className="bi bi-exclamation-triangle" /> Send an email
                    </a>
                    <Link
                        to="/legal"
                        className="hover:underline text-yellow-400 flex items-center gap-1"
                    >
                        <i className="bi bi-briefcase" /> Legal
                    </Link>
                </div>

            </section>

            {showInstall && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleInstall}
                        className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition flex items-center gap-2"
                    >
                        <i className="bi bi-phone"></i> Instaliraj Timetable App
                    </button>
                </div>
            )}

            <hr className="my-6 border-gray-700" />

            <section className="text-center text-gray-500 text-sm">
                2025 Timetable —{" "}
                <a
                    href="https://github.com/MuxBH28/timetable/blob/main/LICENSE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    &copy; Copyright WTFPL
                </a>
            </section>
        </footer>
    );
};

export default Footer;
