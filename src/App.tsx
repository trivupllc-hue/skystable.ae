import { Navigate, Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Layout from "./components/Layout";
import {
  AboutPage,
  ContactPage,
  ExperiencesPage,
  Home,
  NotFound,
  ServicePage,
  StablePage,
} from "./pages";
import { TransportPage } from "./components/Transport";
import { BookingPage } from "./components/Booking";
import { GalleryPage } from "./components/Gallery";
import { TradingPage } from "./components/Trading";
import { PrivacyPage, PhotographyPage } from "./components/Legal";
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="experiences" element={<ExperiencesPage />} />
          <Route path="horse-transport-sharjah" element={<TransportPage />} />
          <Route
            path="private-riding-lessons-sharjah"
            element={<Navigate to="/horse-riding-classes-sharjah" replace />}
          />
          <Route path="stable-services" element={<StablePage />} />
          <Route path="horse-trading" element={<TradingPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="book" element={<BookingPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="photography" element={<PhotographyPage />} />
          <Route path=":slug" element={<ServicePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MotionConfig>
  );
}
