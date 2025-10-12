import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import scheduleData from "../assets/schedule.json";

const Main = () => {
    const [currentHour, setCurrentHour] = useState(new Date().getHours());
    const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes());
    const [today, setToday] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentHour(now.getHours());
            setCurrentMinute(now.getMinutes());
            const days = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
            setToday(days[now.getDay() - 1]);
        }, 60000);

        const now = new Date();
        setCurrentHour(now.getHours());
        setCurrentMinute(now.getMinutes());
        const days = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
        setToday(days[now.getDay() - 1]);

        return () => clearInterval(timer);
    }, []);

    const getStatus = (time) => {
        const [hour, minute] = time.split(":").map(Number);
        if (hour < currentHour || (hour === currentHour && minute < currentMinute)) return "zavrseno";
        if (hour === currentHour && minute <= currentMinute + 30) return "trenutno";
        return "sljedece";
    };

    const getBgColor = (status) => {
        switch (status) {
            case "zavrseno":
                return "bg-gray-300 dark:bg-gray-700";
            case "trenutno":
                return "bg-yellow-300 dark:bg-yellow-700";
            case "sljedece":
                return "bg-blue-100 dark:bg-blue-800";
            default:
                return "bg-white dark:bg-gray-900";
        }
    };

    const extractRoom = (subject) => {
        const match = subject.match(/\(([^)]+)\)/);
        return match ? match[1] : "";
    };

    const todaySchedule = scheduleData.schedule
        .map(slot => ({
            time: slot.time,
            subject: slot[today] || "",
            status: slot[today] ? getStatus(slot.time) : null,
            room: slot[today] ? extractRoom(slot[today]) : ""
        }))
        .filter(slot => slot.subject);

    return (
        <section
            className="min-h-screen container mx-auto px-4 py-6 flex flex-col items-center justify-center"
            data-aos="fade-in"
        >
            <h1 className="text-2xl font-bold mb-6 text-center" data-aos="fade-in">
                {todaySchedule.length > 0
                    ? `Dnevni raspored - ${today}`
                    : "Dnevni raspored"}
            </h1>

            {todaySchedule.length > 0 ? (
                <div className="flex flex-col gap-4 w-full max-w-xl" data-aos="fade-in">
                    {todaySchedule.map((slot, idx) => (
                        <div
                            key={idx}
                            className={`p-4 rounded shadow ${getBgColor(slot.status)}`}
                            data-aos="fade-in"
                        >
                            <div className="flex justify-between items-center mb-2" data-aos="fade-in">
                                <span className="font-semibold">{slot.time}</span>
                                <span className="text-sm font-medium uppercase">
                                    {slot.subject.startsWith("P") ? "Predavanje" : "Laboratorija"}
                                </span>
                            </div>
                            <p className="font-semibold" data-aos="fade-in">
                                {slot.subject.replace(/\([^)]+\)/, "").replace(/^[PL]\s*/, "")}
                            </p>
                            {slot.room && (
                                <span
                                    className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 rounded"
                                    data-aos="fade-in"
                                >
                                    {slot.room}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4 mt-10" data-aos="fade-in">
                    <img src="resources/logo.png" alt="Logo" className="w-1/5" data-aos="fade-in" />
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-300" data-aos="fade-in">
                        Nema predmeta danas, odmori
                    </p>
                    <Link
                        to="/timetable"
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        data-aos="fade-in"
                    >
                        Pogledaj cijeli raspored
                    </Link>
                </div>
            )}
        </section>
    );
};

export default Main;
