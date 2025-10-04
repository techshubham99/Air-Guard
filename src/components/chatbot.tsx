import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Rocket, Globe, Satellite, Sparkles } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text:
        "🚀 Hello! I'm your NASA Environmental Assistant. I share insights about space exploration, Earth observation, North America’s environment, and pollution. Ask anything!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // NASA-focused response generator with richer coverage
  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // NASA and space
    if (input.includes("nasa") || input.includes("space") || input.includes("satellite")) {
      const responses = [
        "🚀 NASA (National Aeronautics and Space Administration) leads missions from Earth orbit to deep space while monitoring our planet’s health.",
        "🛰️ NASA satellites like Terra, Aqua, and Suomi NPP track aerosols, NO2, CO2, and land use to study pollution and climate trends.",
        "🔭 Missions like JWST and Hubble explore the universe, while Earth-observing satellites deliver critical climate intelligence.",
        "🌍 NASA’s Earth Science missions support disaster response, agriculture planning, air-quality alerts, and climate research.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Pollution / Environment / Climate
    if (
      input.includes("pollution") ||
      input.includes("environment") ||
      input.includes("climate") ||
      input.includes("air quality") ||
      input.includes("co2") ||
      input.includes("ghg")
    ) {
      const responses = [
        "🌱 NASA uses instruments like OCO-2 and TROPOMI data (via partners) to map CO2, methane, and trace gases influencing climate.",
        "🏭 Satellite measurements help identify urban NO2 hotspots, track wildfire smoke plumes, and support clean-air policy evaluation.",
        "💧 Earth observation helps monitor ocean health, algal blooms, glacial melt, and water cycles impacted by climate change.",
        "📊 Long-term datasets reveal trends in greenhouse gases, aerosol optical depth, and surface temperatures across regions.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // North America context
    if (
      input.includes("north america") ||
      input.includes("usa") ||
      input.includes("canada") ||
      input.includes("mexico")
    ) {
      const responses = [
        "🇺🇸 In North America, satellite data supports wildfire smoke tracking, hurricane forecasting, drought monitoring, and air-quality alerts.",
        "🍁 From the Canadian boreal forests to U.S. cities, satellite observations track forest health, urban heat islands, and NO2 levels.",
        "🌀 NASA partners with NOAA and other agencies for severe weather monitoring, early warnings, and climate resilience planning.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Website/technology
    if (
      input.includes("website") ||
      input.includes("data") ||
      input.includes("visualization") ||
      input.includes("map") ||
      input.includes("dashboard")
    ) {
      return "💻 This website can integrate NASA Earth observation feeds to render interactive maps, time-series charts, and near-real-time air-quality layers.";
    }

    // Missions and exploration
    if (input.includes("mission") || input.includes("moon") || input.includes("mars") || input.includes("artemis")) {
      const responses = [
        "🛰️ Artemis aims to return humans to the Moon and build a sustainable presence—paving the way for Mars exploration.",
        "🤖 Rovers like Perseverance explore Mars, while lunar missions test technologies crucial for deep-space survival.",
        "🧪 The ISS hosts experiments in microgravity that inform Earth science, medicine, and future space missions.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Default
    const defaults = [
      "🌟 Ask about NASA missions, Earth observation, pollution tracking, or North America’s climate insights.",
      "🔭 NASA connects deep-space exploration with Earth science—curious about satellites, data, or climate trends?",
      "🛰️ From air-quality monitoring to hurricane forecasting, NASA’s data powers environmental intelligence. What interests you?",
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    const current = input;
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        sender: "bot",
        text: generateBotResponse(current),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 850 + Math.random() * 450);
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* 3D floating toggle button with particles */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-16 h-16 rounded-full text-white flex items-center justify-center transition-all duration-500
        hover:scale-110 hover:rotate-6 chatbot-3d-button`}
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, #1e3a8a, #3b82f6, #7c3aed, #9333ea, #1e3a8a)",
          boxShadow:
            "0 18px 35px rgba(30,58,138,0.45), inset 0 2px 4px rgba(255,255,255,0.15)",
        }}
        aria-label="Open NASA Assistant"
      >
        <div className="absolute inset-0 rounded-full opacity-30"
             style={{
               background:
                 "radial-gradient(closest-side, rgba(255,255,255,0.8), rgba(255,255,255,0) 70%)",
               filter: "blur(8px)",
             }}
        />
        <MessageCircle className="w-7 h-7 drop-shadow-[0_0_8px_rgba(124,58,237,0.75)]" />
        {/* Particles */}
        <span className="particle absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full" />
        <span className="particle absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full" />
        <span className="particle absolute -top-2 left-1 w-1.5 h-1.5 bg-indigo-400 rounded-full" />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          className="mt-4 w-96 h-[520px] rounded-2xl flex flex-col overflow-hidden animate-slideUp"
          style={{
            background:
              "linear-gradient(145deg, rgba(17,24,39,0.9) 0%, rgba(31,41,55,0.88) 70%)",
            border: "1px solid rgba(99,102,241,0.35)",
            boxShadow:
              "0 32px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.03)",
            backdropFilter: "blur(14px)",
          }}
        >
          {/* Header */}
          <div
            className="flex justify-between items-center p-4 text-white"
            style={{
              background:
                "linear-gradient(120deg, #1e3a8a 0%, #3730a3 40%, #6d28d9 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
            }}
          >
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Rocket className="w-6 h-6 text-blue-200 animate-bounce" />
                <Sparkles className="w-3 h-3 text-purple-200 absolute -top-1 -right-1" />
              </div>
              <div className="leading-tight">
                <div className="font-bold tracking-wide">NASA Assistant</div>
                <div className="text-[11px] opacity-90 flex items-center">
                  <Globe className="w-3 h-3 mr-1" /> Earth Observation • Environment
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 p-4 overflow-y-auto space-y-3"
            style={{
              background:
                "radial-gradient(1200px 400px at 20% 0%, rgba(99,102,241,0.20), transparent 50%), radial-gradient(1000px 380px at 100% 40%, rgba(139,92,246,0.18), transparent 60%)",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl message-hover transform transition-all duration-200 ${
                    msg.sender === "user"
                      ? "text-white rounded-br-md"
                      : "text-gray-100 rounded-bl-md"
                  }`}
                  style={{
                    background:
                      msg.sender === "user"
                        ? "linear-gradient(135deg, #3b82f6 0%, #7c3aed 60%, #9333ea 100%)"
                        : "linear-gradient(135deg, rgba(31,41,55,0.85) 0%, rgba(55,65,81,0.85) 100%)",
                    border:
                      msg.sender === "user"
                        ? "1px solid rgba(139,92,246,0.35)"
                        : "1px solid rgba(148,163,184,0.25)",
                    boxShadow:
                      msg.sender === "user"
                        ? "0 10px 25px rgba(124,58,237,0.35)"
                        : "0 10px 24px rgba(0,0,0,0.25)",
                  }}
                >
                  <div className="text-sm leading-relaxed">{msg.text}</div>
                  <div
                    className={`text-[11px] mt-1 ${
                      msg.sender === "user" ? "text-blue-100" : "text-slate-300"
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="p-3 rounded-2xl rounded-bl-md border flex items-center space-x-1"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(31,41,55,0.9) 0%, rgba(55,65,81,0.95) 100%)",
                    border: "1px solid rgba(148,163,184,0.25)",
                  }}
                >
                  <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-purple-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick tips row */}
          <div
            className="px-4 py-2 text-[11px] text-slate-200 border-t"
            style={{ borderColor: "rgba(99,102,241,0.25)" }}
          >
            Try: “NASA pollution satellites”, “North America air quality”, “Artemis missions”, “CO2 monitoring map”
          </div>

          {/* Input */}
          <div
            className="p-4 flex gap-3"
            style={{
              background:
                "linear-gradient(135deg, rgba(17,24,39,0.85) 0%, rgba(31,41,55,0.88) 100%)",
              borderTop: "1px solid rgba(99,102,241,0.25)",
            }}
          >
            <div className="flex-1 relative">
              <Satellite className="w-4 h-4 text-indigo-300 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about NASA, satellites, climate, or North America…"
                className="w-full pl-9 pr-12 py-3 rounded-xl bg-[rgba(17,24,39,0.75)] text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-700"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isTyping}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="px-4 py-3 rounded-xl text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              style={{
                background:
                  "linear-gradient(135deg, #2563eb 0%, #7c3aed 70%, #9333ea 100%)",
                boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
              }}
              aria-label="Send"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Component-scoped styles for 3D, particles, and intro animation */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.35s ease-out forwards;
        }

        .chatbot-3d-button {
          transform-style: preserve-3d;
        }
        .chatbot-3d-button:hover {
          transform: translateZ(6px) rotateX(6deg) rotateY(-6deg);
        }
        .chatbot-3d-button::after {
          content: "";
          position: absolute;
          inset: -6px;
          border-radius: 9999px;
          background: radial-gradient(closest-side, rgba(124, 58, 237, 0.18), transparent 70%);
          filter: blur(10px);
          z-index: -1;
        }

        @keyframes particleFloat {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(6px, -14px);
            opacity: 0;
          }
        }
        .particle {
          animation: particleFloat 1.8s ease-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
