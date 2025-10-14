import React from "react";

const About = () => {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-6 text-center">
            <article
                className="max-w-3xl bg-white rounded-2xl shadow-md p-8"
                data-aos="fade-up"
            >
                <h1 className="text-3xl font-bold mb-4 text-blue-700 flex items-center justify-center gap-2">
                    <i className="bi bi-info-circle" /> O Projektu
                </h1>

                <p className="text-gray-700 mb-4">
                    <strong>Timetable</strong> je open-source projekat dizajniran da univerzitetske rasporede učini jednostavnim, dostupnim i malo zabavnijim. Napravljen je koristeći <i className="bi bi-lightning-charge" /> Vite, <i className="bi bi-react" /> React i <i className="bi bi-brush" /> TailwindCSS.
                </p>

                <p className="text-gray-700 mb-4">
                    Glavni cilj je studentima omogućiti interaktivan način pregledavanja sedmičnog rasporeda bez potrebe za pretraživanjem beskrajnih PDF-ova ili zastarjelih univerzitetskih portala. Sve je čisto, brzo i optimizirano za moderne pretraživače.
                </p>

                <p className="text-gray-700 mb-4">
                    Podaci se preuzimaju sa <strong>c2</strong>, standardnog mjesta za zvanične rasporede — ali ažuriranja dodajemo samo kad se sjetimo da provjerimo. Dakle, ako je nešto zastarjelo, vjerovatno nam bilo mrsko provjeriti.
                </p>

                <p className="text-gray-700 mb-4"> Korisnici imaju mogućnost instalacije Rasporeda kao PWA (Progressive Web App) za brži i offline pristup. </p>

                <p className="text-gray-700 mb-4">
                    Projekat i njegov izvorni kod možete istražiti na GitHub-u:
                    <br />
                    <a
                        href="https://github.com/MuxBH28/timetable"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        <i className="bi bi-github" /> github.com/MuxBH28/timetable
                    </a>
                </p>

                <hr />

                <p className="text-gray-700 my-4 text-left">
                    Napravili studenti, za studente — bez ikakvih garancija da sve funkcioniše savršeno.
                </p>

                <div className="mb-4 text-gray-700 text-left">
                    <p className="font-semibold mb-2">Studenti koji su zaslužni za ovo remek-djelo stranice:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Harun Hodžić - Dizajn i savjeti</li>
                        <li>Ilhan Čukojević - Dizajn i pronalaženje bugova</li>
                        <li>Bilal Ozdić - Drive linkovi</li>
                        <li>Amel Divović - Testing</li>
                        <li>Muhammed Šehić</li>
                    </ul>
                </div>
            </article>
        </section>
    );
};

export default About;
