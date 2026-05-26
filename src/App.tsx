import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { MemoriesPage } from "./pages/MemoriesPage";
import { MoodCardsPage } from "./pages/MoodCardsPage";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";
import LoveTimelinePage from "./pages/LoveTimelinePage";

const App = () => {
  const location = useLocation();
  const isMemoriesRoute = location.pathname === "/memories";

  return isMemoriesRoute ? (
    <Routes location={location} key={location.pathname}>
      <Route path="/memories" element={<MemoriesPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  ) : (
    <Layout>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/moods" element={<MoodCardsPage />} />
        <Route path="/timeline" element={<LoveTimelinePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
