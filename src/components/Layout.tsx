import { AnimatePresence } from "framer-motion";
import Header from "./Header";
import { Footer } from "./Footer";
import ScrollToTop from "./ScrollToTop";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />

      <main className="flex-grow w-full px-6">
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};
