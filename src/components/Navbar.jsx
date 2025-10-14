import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const navLinks = [
    { name: "Početna", path: "/", icon: "bi-house" },
    { name: "Raspored", path: "/timetable", icon: "bi-calendar" },
    { name: "Linkovi", path: "/links", icon: "bi-link-45deg" },
    { name: "Rokovi", path: "/exams", icon: "bi-file-earmark-text" },
    { name: "Legal", path: "/legal", icon: "bi-briefcase" },
    { name: "About", path: "/about", icon: "bi-info-circle" },
    { name: "GitHub", path: "https://github.com/MuxBH28/timetable", external: true, icon: "bi-github" }
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
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
        await deferredPrompt.userChoice;
        setDeferredPrompt(null);
        setShowInstall(false);
        setIsOpen(false);
    };

    const renderLink = (link) =>
        link.external ? (
            <a
                key={link.name}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="my-4 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0 flex items-center gap-1"
            >
                <i className={`bi ${link.icon}`} /> {link.name}
            </a>
        ) : (
            <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="my-4 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0 flex items-center gap-1"
            >
                <i className={`bi ${link.icon}`} /> {link.name}
            </Link>
        );

    return (
        <nav className="relative bg-white shadow dark:bg-gray-800">
            <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-blue-500">
                        Timetable <span className="text-xs">BETA</span>
                    </Link>

                    <div className="flex lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none"
                            aria-label="toggle menu"
                        >
                            {!isOpen ? (
                                <i className="bi bi-list text-2xl"></i>
                            ) : (
                                <i className="bi bi-x-lg text-2xl"></i>

                            )}
                        </button>
                    </div>
                </div>

                <div className="hidden md:flex md:items-center md:space-x-4">
                    {navLinks.map(renderLink)}
                    {showInstall && (
                        <button
                            onClick={handleInstall}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center gap-1"
                        >
                            <i className="bi bi-phone"></i> Instaliraj App
                        </button>
                    )}
                </div>

                {isOpen && (
                    <div className="absolute inset-x-0 z-20 w-full px-6 py-4 bg-white dark:bg-gray-800 flex flex-col md:hidden">
                        {navLinks.map(renderLink)}
                        {showInstall && (
                            <button
                                onClick={handleInstall}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center gap-1 mt-2"
                            >
                                <i className="bi bi-phone"></i> Instaliraj App
                            </button>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
