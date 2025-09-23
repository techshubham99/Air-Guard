import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RealTimeData from "./pages/RealTimeData";
import Forecasts from "./pages/Forecasts";
import Alerts from "./pages/Alerts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

const App = () => {
  const [location, setLocation] = useState('San Francisco, CA');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header onLocationSelect={setLocation} />
            <main>
              <Routes>
                <Route path="/" element={<Home location={location} setLocation={setLocation} />} />
                <Route path="/real-time" element={<RealTimeData location={location} />} />
                <Route path="/forecasts" element={<Forecasts />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
