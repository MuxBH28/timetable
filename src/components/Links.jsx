import React, { useEffect, useState } from "react";

const Links = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        import("../assets/links.json")
            .then((data) => setLinks(data.default))
            .catch((err) => console.error("Greška pri učitavanju linkova:", err));
    }, []);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-6 text-center">
            <article
                className="max-w-3xl bg-white rounded-2xl shadow-md p-8"
                data-aos="fade-up"
            >
                <h1 className="text-3xl font-bold mb-6 text-blue-700 flex items-center justify-center gap-2">
                    <i className="bi bi-link-45deg" /> Korisni linkovi
                </h1>

                {links.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <i className={`bi ${link.icon} text-3xl text-blue-600 mb-2`} />
                                <span className="font-semibold text-gray-800">{link.name}</span>
                            </a>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Učitavanje linkova...</p>
                )}
            </article>
        </section>
    );
};

export default Links;
