import React, { useEffect, useState } from "react";
import examsData from "../assets/exams.json";

const Exams = () => {
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const today = new Date();

        const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return `${day}.${month}.${year}.`;
        };

        const upcoming = examsData
            .map((exam) => {
                const dateObj = new Date(`${exam.date} ${exam.time}`);
                return {
                    ...exam,
                    dateObj,
                    formattedDate: formatDate(exam.date),
                };
            })
            .filter((exam) => exam.dateObj >= today)
            .sort((a, b) => a.dateObj - b.dateObj);

        setExams(upcoming);
    }, []);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-6 text-center">
            <article
                className="max-w-3xl bg-white rounded-2xl shadow-md p-8"
                data-aos="fade-up"
            >
                <h1 className="text-3xl font-bold mb-6 text-blue-700 flex items-center justify-center gap-2">
                    <i className="bi bi-mortarboard" /> Nadolazeći ispiti
                </h1>

                {exams.length === 0 ? (
                    <p className="text-gray-600 text-lg">
                        Trenutno nema nadolazećih ispita.
                    </p>
                ) : (
                    <ul className="space-y-4">
                        {exams.map((exam, index) => (
                            <li
                                key={index}
                                className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                            >
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                    {exam.name}
                                </h2>
                                <p className="text-gray-600">
                                    <i className="bi bi-calendar-event" /> {exam.formattedDate} –{" "}
                                    <i className="bi bi-clock" /> {exam.time}
                                </p>
                                <p className="text-gray-600 mt-1">
                                    <i className="bi bi-geo-alt" /> Sala: {exam.room}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </article>
        </section>
    );
};

export default Exams;
