import React, { useState, useEffect } from "react";
import scheduleData from "../assets/schedule.json";

const Timetable = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [currentHour, setCurrentHour] = useState(new Date().getHours());
    const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes());

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentHour(now.getHours());
            setCurrentMinute(now.getMinutes());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const getCardStatus = (time) => {
        const [hour, minute] = time.split(":").map(Number);
        if (hour < currentHour || (hour === currentHour && minute < currentMinute))
            return "completed";
        if (hour === currentHour && minute <= currentMinute + 30) return "current";
        return "next";
    };

    const flattenedSchedule = [];
    scheduleData.schedule.forEach((slot) => {
        scheduleData.days.forEach((day) => {
            if (slot[day]) {
                const subject = slot[day];
                const type = subject.startsWith("P") ? "P" : "L";
                const titleWithoutType = subject.replace(/^[PL]\s*/, "").replace(/\(.*?\)$/, "").trim();
                const roomMatch = subject.match(/\((.*?)\)$/);
                const room = roomMatch ? roomMatch[1] : "";

                flattenedSchedule.push({
                    day,
                    time: slot.time,
                    type,
                    title: titleWithoutType,
                    room,
                    status: getCardStatus(slot.time)
                });
            }
        });
    });

    const filteredSchedule = flattenedSchedule.filter(
        (item) =>
            (filter === "all" || item.type === filter) &&
            item.title.toLowerCase().includes(search.toLowerCase())
    );

    const daysWithClasses = scheduleData.days.filter((day) =>
        filteredSchedule.some((item) => item.day === day)
    );

    const getBgColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-gray-300 dark:bg-gray-700";
            case "current":
                return "bg-yellow-300 dark:bg-yellow-700";
            case "next":
                return "bg-blue-100 dark:bg-blue-800";
            default:
                return "bg-white dark:bg-gray-900";
        }
    };

    return (
        <section className="container mx-auto px-4 py-6">
            <h1
                className="text-xl font-bold mb-4"
                data-aos="fade-down"
                data-aos-duration="1000"
            >
                Raspored za {scheduleData.year}. godinu - {scheduleData.program}
            </h1>

            <div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
                data-aos="fade-up"
            >
                <input
                    type="text"
                    placeholder="Pretraži predmet..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border rounded w-full sm:w-64"
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2 border rounded w-full sm:w-48"
                >
                    <option value="all">Svi tipovi</option>
                    <option value="P">Predavanje</option>
                    <option value="L">Laboratorija</option>
                </select>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {daysWithClasses.map((day) => (
                    <div key={day} data-aos="fade-up">
                        <h2 className="text-xl font-semibold mb-2 text-center">{day}</h2>
                        <div className="flex flex-col gap-2">
                            {filteredSchedule
                                .filter((item) => item.day === day)
                                .map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-4 rounded shadow flex flex-col gap-1 ${getBgColor(item.status)}`}
                                        data-aos="fade-right"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">{item.time}</span>
                                            <span className="text-sm font-medium uppercase">
                                                {item.type === "P" ? "Predavanje" : "Laboratorija"}
                                            </span>
                                        </div>
                                        <p className="font-medium">{item.title}</p>
                                        {item.room && (
                                            <span className="text-xs bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded inline-block w-fit">
                                                Sala: {item.room}
                                            </span>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </section>

            <div className="mt-8 flex flex-col items-center gap-4" data-aos="fade-in">
                <p className="text-lg text-gray-600 dark:text-gray-300 text-center" data-aos="fade-in">
                    Trenutni raspored je preuzet sa ovog <strong>c2</strong> linka:
                </p>
                <a
                    href="https://people.etf.unsa.ba/~sribic/raspored20252026/rasporedzimski2025-26_cijelegodineV2.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                    data-aos="fade-in"
                >
                    Otvori PDF <i className="bi bi-box-arrow-up-right"></i>
                </a>
            </div>
        </section>
    );

};

export default Timetable;
