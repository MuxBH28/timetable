import { useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

import Timetable from "./components/Timetable";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import CookiesNotice from './components/CookiesNotice';
import ErrorPage from "./components/ErrorPage";
import Legal from "./components/Legal";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import About from "./components/About";
import Links from "./components/Links";
import Exams from "./components/Exams";

function App() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <BackToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/about" element={<About />} />
        <Route path="/links" element={<Links />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Footer />
      <CookiesNotice />
    </Router>
  );
}

export default App;
