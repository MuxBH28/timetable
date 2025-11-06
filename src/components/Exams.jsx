import React, { useEffect, useState } from "react";
import examsData from "../assets/exams.json";

const Exams = () => {
    const [showExams, setShowExams] = useState(true);
    const [showHomeworks, setShowHomeworks] = useState(true);
    const [exams, setExams] = useState([]);
    const [homeworks, setHomeworks] = useState([]);

    useEffect(() => {
        const today = new Date();

        // Obrada ispita
        const processedExams = examsData.exams
            .map((exam) => ({
                ...exam,
                dateObj: new Date(`${exam.date}T${exam.time}`),
            }))
            .filter((exam) => exam.dateObj >= today);

        // Obrada zadaća
        const processedHomeworks = examsData.homeworks.map((hw) => ({
            ...hw,
            dateObj: new Date(hw.due),
        }));

        // Sortiraj unutar svake kategorije
        processedExams.sort((a, b) => a.dateObj - b.dateObj);
        processedHomeworks.sort((a, b) => a.dateObj - b.dateObj);

        setExams(processedExams);
        setHomeworks(processedHomeworks);
    }, []);

    // Izračunavanje preostalog vremena
    const getTimeRemaining = (dueDate) => {
        const now = new Date();
        const diff = new Date(dueDate) - now;

        if (diff <= 0) return "Isteklo";

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);

        return `${days}d ${hours}h ${minutes}m preostalo`;
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-6 text-center">
            <article
                className="max-w-3xl bg-white rounded-2xl shadow-md p-8 w-full"
                data-aos="fade-up"
            >
                <h1 className="text-3xl font-bold mb-6 text-blue-700 flex items-center justify-center gap-2">
                    <i className="bi bi-mortarboard" /> Rokovi
                </h1>

                <div className="flex items-center justify-center gap-6 mb-8">
                    <label className="flex items-center gap-2 text-gray-700">
                        <input
                            type="checkbox"
                            checked={showExams}
                            onChange={() => setShowExams(!showExams)}
                        />
                        Ispiti
                    </label>
                    <label className="flex items-center gap-2 text-gray-700">
                        <input
                            type="checkbox"
                            checked={showHomeworks}
                            onChange={() => setShowHomeworks(!showHomeworks)}
                        />
                        Zadaće
                    </label>
                </div>

                {!showExams && !showHomeworks ? (
                    <p className="text-gray-600 text-lg">
                        Odaberite da prikažete ispite i/ili zadaće.
                    </p>
                ) : (
                    <>
                        {showExams && (
                            <>
                                <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center justify-center gap-2">
                                    <i className="bi bi-mortarboard" /> Ispiti
                                </h2>

                                {exams.length === 0 ? (
                                    <p className="text-gray-600 mb-6">
                                        Trenutno nema nadolazećih ispita.
                                    </p>
                                ) : (
                                    <ul className="space-y-4 mb-10">
                                        {exams.map((exam, index) => {
                                            const formattedDate = exam.dateObj.toLocaleDateString(
                                                "bs-BA",
                                                {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            );

                                            return (
                                                <li
                                                    key={`exam-${index}`}
                                                    className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                                                >
                                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                        {exam.name}
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        <i className="bi bi-calendar-event" /> {formattedDate} –{" "}
                                                        <i className="bi bi-clock" /> {exam.time}
                                                    </p>
                                                    <p className="text-gray-600 mt-1">
                                                        <i className="bi bi-geo-alt" /> Sala: {exam.room}
                                                    </p>
                                                    <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                                                        {exam.type}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </>
                        )}

                        {showHomeworks && (
                            <>
                                <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center justify-center gap-2">
                                    <i className="bi bi-journal-check" /> Zadaće
                                </h2>

                                {homeworks.length === 0 ? (
                                    <p className="text-gray-600">
                                        Trenutno nema aktivnih zadaća.
                                    </p>
                                ) : (
                                    <ul className="space-y-4">
                                        {homeworks.map((hw, index) => {
                                            const formattedDate = hw.dateObj.toLocaleDateString(
                                                "bs-BA",
                                                {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            );

                                            const remaining = getTimeRemaining(hw.due);
                                            const isExpired = remaining === "Isteklo";

                                            return (
                                                <li
                                                    key={`hw-${index}`}
                                                    className={`border rounded-xl p-4 shadow-sm hover:shadow-md transition ${isExpired
                                                        ? "bg-red-50 border-red-200"
                                                        : "bg-blue-50 border-blue-200"
                                                        }`}
                                                >
                                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                        {hw.name}
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        <i className="bi bi-calendar-event" /> Rok:{" "}
                                                        {formattedDate}
                                                    </p>
                                                    <p
                                                        className={`mt-1 ${isExpired
                                                            ? "text-red-600 font-medium"
                                                            : "text-gray-700"
                                                            }`}
                                                    >
                                                        {remaining}
                                                    </p>
                                                    <a
                                                        href={hw.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 underline mt-2 inline-block"
                                                    >
                                                        Otvori zadatak
                                                    </a>
                                                    <span className="inline-block mt-2 ml-3 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                                                        {hw.type}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </>
                        )}
                    </>
                )}
            </article>
        </section>
    );
};

export default Exams;
