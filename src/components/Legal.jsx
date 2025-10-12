import React from "react";

const lastUpdated = "12.10.2025.";

const Legal = () => {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-6">
            <article
                className="max-w-3xl bg-white rounded-2xl shadow-md p-8"
                data-aos="fade-up"
            >
                <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
                    Legal & Disclaimer
                </h1>

                <p className="text-gray-700 mb-4">
                    Dobrodošli u <strong>Timetable</strong> — projekat napravljen od strane studenata koji jednostavno prikazuje univerzitetske rasporede. Šta se dešava nakon što ga otvorite, potpuno je na vama.
                </p>

                <p className="text-gray-700 mb-4">
                    <em>Ne snosimo odgovornost</em> ako zakasnite na predavanje, zaboravite zadaću ili završite u pogrešnoj sali. Život je nepredvidiv — isto važi ponekad i za vas.
                </p>

                <p className="text-gray-700 mb-4">
                    Ako imate “sjajne ideje” za poboljšanje — super! Ali molimo vas, nemojte nas zamarat'. Ako nam se ćefne, dodaćemo.
                </p>

                <p className="text-gray-700 mb-4">
                    Ako padnete predmet... ne brinite. Uvijek postoji naredna godina :&#41;
                </p>

                <p className="text-gray-700 mb-4">
                    Ne preuzimamo <strong>nikakvu odgovornost</strong> za bilo šta što se desi dok koristite ovu aplikaciju. Ako nešto pukne, nestane ili vas zbuni — to je u potpunosti na vama.
                </p>

                <p className="text-gray-700 mb-4">
                    Sve informacije o rasporedu se preuzimaju sa <strong>c2</strong> (jer je to mjesto gdje obično završe službeni rasporedi). Međutim, ažuriranja se dodaju samo kada se sjetimo provjeriti da li je fakultet postavio nešto novo.
                </p>

                <p className="text-gray-700 mb-4">
                    Dakle, ako je raspored zastario — vjerovatno smo bili zauzeti, lijeni ili jednostavno nismo primijetili promjenu. Život se dešava.
                </p>

                <p className="text-gray-700 mb-4 font-bold">
                    Ovaj projekt nije službeno povezan s Elektrotehničkim fakultetom u Sarajevu i služi isključivo kao neformalni alat za pomoć studentima.
                </p>

                <p className="text-gray-700 mb-4">
                    Ovaj projekat je licenciran pod <strong>WTFPL</strong>. Puni tekst licence možete pogledati{" "}
                    <a
                        href="https://github.com/MuxBH28/timetable/blob/main/LICENSE"
                        target="_blank"
                        className="text-blue-600 hover:underline"
                        rel="noopener noreferrer"
                    >
                        ovdje
                    </a>.
                </p>

                <p className="text-gray-700 mb-6">
                    Ako primijetite grešku, netačan raspored ili jednostavno želite podijeliti ideju, slobodno nas kontaktirajte na{" "}
                    <a
                        href="mailto:contact@msehic.com"
                        className="text-blue-600 hover:underline"
                    >
                        contact@msehic.com
                    </a>.
                </p>

                <hr className="my-6" />

                <p className="text-sm text-gray-500 text-center">
                    Posljednje ažuriranje: {lastUpdated}
                </p>
            </article>
        </section>
    );
};

export default Legal;
