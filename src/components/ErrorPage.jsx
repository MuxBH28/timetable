import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6">
            <div
                className="bg-white rounded-2xl shadow-md p-10 max-w-lg"
                data-aos="zoom-in"
            >
                <h1 className="text-6xl font-extrabold mb-3 text-blue-700">404</h1>
                <h2 className="text-2xl font-semibold mb-2">
                    Page not found
                </h2>
                <p className="text-base mb-6 opacity-90">
                    Nije mi ni jasno kako ste uspjeli da tražite nešto drugo, šta će Vam neke druge stranice???
                </p>
                <Link
                    to="/"
                    className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                    Go back
                </Link>
            </div>
        </section>
    );
};

export default ErrorPage;
