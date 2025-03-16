
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import Matches from "./pages/Matches";
import SkillGaps from "./pages/SkillGaps";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./contexts/UserContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/skill-gaps" element={<SkillGaps />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
