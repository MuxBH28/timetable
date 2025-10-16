import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import scheduleData from "../assets/schedule.json";

const Main = () => {
    const days = ["Ponedeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
    const now = new Date();
    const [currentHour, setCurrentHour] = useState(now.getHours());
    const [currentMinute, setCurrentMinute] = useState(now.getMinutes());
    const [today, setToday] = useState(days[now.getDay() - 1] || "Ponedeljak");
    const [aosDirection, setAosDirection] = useState("fade-in");

    const [touchStartX, setTouchStartX] = useState(null);
    const [touchEndX, setTouchEndX] = useState(null);
    const [notificationsData, setNotificationsData] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentHour(now.getHours());
            setCurrentMinute(now.getMinutes());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const minSwipeDistance = 100;
    const onTouchStart = (e) => setTouchStartX(e.targetTouches[0].clientX);
    const onTouchMove = (e) => setTouchEndX(e.targetTouches[0].clientX);
    const onTouchEnd = () => {
        if (!touchStartX || !touchEndX) return;
        const distance = touchStartX - touchEndX;
        if (distance > minSwipeDistance) nextDay();
        else if (distance < -minSwipeDistance) prevDay();
        setTouchStartX(null);
        setTouchEndX(null);
    };

    const currentIndex = days.indexOf(today);

    const prevDay = () => {
        setAosDirection("fade-left");
        const newDay = days[(currentIndex - 1 + days.length) % days.length];
        setToday(newDay);
    };

    const nextDay = () => {
        setAosDirection("fade-right");
        const newDay = days[(currentIndex + 1) % days.length];
        setToday(newDay);
    };

    const getStatus = (startTime, endTime) => {
        const [sh, sm] = startTime.split(":").map(Number);
        const [eh, em] = endTime.split(":").map(Number);

        const startTotal = sh * 60 + sm;
        const endTotal = eh * 60 + em;
        const nowTotal = currentHour * 60 + currentMinute;

        if (nowTotal < startTotal) return "sljedece";
        if (nowTotal >= startTotal && nowTotal < endTotal) return "trenutno";
        return "zavrseno";
    };

    const getBgColor = (status) => {
        switch (status) {
            case "zavrseno":
                return "bg-gray-300 dark:bg-gray-700";
            case "trenutno":
                return "bg-blue-300 dark:bg-blue-700";
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

    const getType = (subject) => {
        if (subject.startsWith("P")) return "P";
        if (subject.startsWith("L")) return "L";
        return "";
    };

    const addMinutes = (time, minsToAdd) => {
        const [h, m] = time.split(":").map(Number);
        const total = h * 60 + m + minsToAdd;
        const newH = String(Math.floor(total / 60)).padStart(2, "0");
        const newM = String(total % 60).padStart(2, "0");
        return `${newH}:${newM}`;
    };

    const todayScheduleRaw = scheduleData.schedule
        .map((slot) => ({
            time: slot.time,
            subject: slot[today] || "",
            room: slot[today] ? extractRoom(slot[today]) : "",
            type: slot[today] ? getType(slot[today]) : "",
        }))
        .filter((slot) => slot.subject);

    const mergedSchedule = [];
    for (let i = 0; i < todayScheduleRaw.length; i++) {
        const current = todayScheduleRaw[i];
        const baseSubject = current.subject.replace(/\([^)]+\)/, "").trim();

        if (
            mergedSchedule.length > 0 &&
            mergedSchedule[mergedSchedule.length - 1].subject
                .replace(/\([^)]+\)/, "")
                .trim() === baseSubject
        ) {
            mergedSchedule[mergedSchedule.length - 1].endTime = current.time;
        } else {
            mergedSchedule.push({
                subject: current.subject,
                startTime: current.time,
                endTime: current.time,
                room: current.room,
                type: current.type,
            });
        }
    }

    const todaySchedule = mergedSchedule.map((item) => ({
        ...item,
        status: getStatus(item.startTime, addMinutes(item.endTime, 45)),
    }));

    useEffect(() => {
        async function fetchNotificationsData() {
            try {
                const response = await fetch("https://api.npoint.io/63cfd6ed029a3c733430");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setNotificationsData(data);
            } catch (error) {
                console.error("Error fetching notifications data:", error);
            }
        }

        fetchNotificationsData();
    }, []);


    return (
        <section
            className="min-h-screen container mx-auto px-4 py-6 flex flex-col items-center justify-center select-none bg-gray-100"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            data-aos={aosDirection}
        >
            <div className="mb-4 text-center text-gray-600">
                {`${new Date().toLocaleDateString("bs-BA", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })} - ${String(currentHour).padStart(2, "0")}:${String(
                    currentMinute
                ).padStart(2, "0")}`}
            </div>

            <div className="mb-6 w-full max-w-xl bg-white border border-blue-300 rounded-2xl shadow-md overflow-hidden">
                <div className="bg-blue-100 border-b border-blue-300 px-4 py-2">
                    <h2 className="text-blue-800 font-semibold text-lg flex items-center gap-2">
                        <i className="bi bi-megaphone-fill text-blue-700"></i>
                        Obavještenja
                    </h2>
                </div>

                <div className="p-4 space-y-4">
                    {notificationsData && notificationsData.length > 0 ? (
                        notificationsData.map((note, idx) => (
                            <div
                                key={idx}
                                className="relative bg-blue-50 border border-blue-200 rounded-lg p-3 hover:shadow transition-all duration-200"
                            >
                                <p className="absolute top-2 right-3 text-xs text-gray-500 italic">
                                    Objavljeno: {note.date}
                                </p>

                                <h3 className="font-bold text-blue-800 mb-1 pr-16">{note.title}</h3>
                                <p className="text-sm text-gray-700 leading-snug">{note.message}</p>

                                {note.link && (
                                    <div className="text-right mt-2">
                                        <a
                                            href={note.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition"
                                        >
                                            <i className="bi bi-box-arrow-up-right"></i>
                                            Otvori link
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 italic">Nema novih obavještenja.</p>
                    )}
                </div>
            </div>


            <div className="flex items-center justify-center gap-4 mb-6">
                <button onClick={prevDay} className="text-2xl hover:text-blue-600">
                    <i className="bi bi-chevron-left" />
                </button>
                <h1 className="text-2xl font-bold text-center">
                    {`Dnevni raspored - ${today}`}
                </h1>
                <button onClick={nextDay} className="text-2xl hover:text-blue-600">
                    <i className="bi bi-chevron-right" />
                </button>
            </div>

            {todaySchedule.length > 0 ? (
                <div
                    className="flex flex-col gap-4 w-full max-w-xl"
                    data-aos={aosDirection}
                >
                    {todaySchedule.map((slot, idx) => (
                        <article
                            key={idx}
                            className={`p-4 rounded shadow flex flex-col gap-2 ${getBgColor(
                                slot.status
                            )}`}
                            data-aos={aosDirection}
                        >
                            <span className="font-bold uppercase text-center">
                                {slot.type === "P" ? "Predavanje" : "Laboratorija"}
                            </span>
                            <p className="font-semibold text-center">
                                {slot.subject
                                    .replace(/\([^)]+\)/, "")
                                    .replace(/^[PL]\s*/, "")
                                    .trim()}
                            </p>
                            <div className="flex justify-between items-center text-sm">
                                <span className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded">
                                    {slot.room ? `Sala: ${slot.room}` : ""}
                                </span>
                                <span className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded">
                                    {slot.startTime} - {
                                        idx < todaySchedule.length - 1
                                            ? todaySchedule[idx + 1].startTime
                                            : addMinutes(slot.endTime, 45)
                                    }
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div
                    className="flex flex-col items-center gap-4 mt-10"
                    data-aos={aosDirection}
                >
                    <img
                        src="/resources/logo.png"
                        alt="Logo"
                        className="w-1/5"
                        data-aos={aosDirection}
                    />
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
                        Nema predmeta danas, odmori
                    </p>
                    <Link
                        to="/timetable"
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Pogledaj cijeli raspored
                    </Link>
                </div>
            )}
        </section>
    );
};

export default Main;
