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

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes("nasa") || input.includes("space") || input.includes("satellite")) {
      const responses = [
        "🚀 NASA (National Aeronautics and Space Administration) leads missions from Earth orbit to deep space while monitoring our planet’s health.",
        "🛰️ NASA satellites like Terra, Aqua, and Suomi NPP track aerosols, NO2, CO2, and land use to study pollution and climate trends.",
        "🔭 Missions like JWST and Hubble explore the universe, while Earth-observing satellites deliver critical climate intelligence.",
        "🌍 NASA’s Earth Science missions support disaster response, agriculture planning, air-quality alerts, and climate research.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

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

    if (
      input.includes("website") ||
      input.includes("data") ||
      input.includes("visualization") ||
      input.includes("map") ||
      input.includes("dashboard")
    ) {
      return "💻 This website can integrate NASA Earth observation feeds to render interactive maps, time-series charts, and near-real-time air-quality layers.";
    }

    if (input.includes("mission") || input.includes("moon") || input.includes("mars") || input.includes("artemis")) {
      const responses = [
        "🛰️ Artemis aims to return humans to the Moon and build a sustainable presence—paving the way for Mars exploration.",
        "🤖 Rovers like Perseverance explore Mars, while lunar missions test technologies crucial for deep-space survival.",
        "🧪 The ISS hosts experiments in microgravity that inform Earth science, medicine, and future space missions.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

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
      {/* Floating button */}
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
      </button>

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
            }}
          >
            <div className="flex items-center space-x-2">
              <Rocket className="w-6 h-6 text-blue-200 animate-bounce" />
              <div>
                <div className="font-bold">NASA Assistant</div>
                <div className="text-[11px] opacity-90 flex items-center">
                  <Globe className="w-3 h-3 mr-1" /> Earth Observation • Environment
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === "user" ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : "bg-gray-700 text-white"
                  }`}
                >
                  <div className="text-sm">{msg.text}</div>
                  <div className="text-[11px] mt-1 opacity-70">
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-3 rounded-2xl bg-gray-700 text-white text-sm">...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 flex gap-3 bg-gray-800">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask something..."
              className="flex-1 px-3 py-2 rounded bg-gray-700 text-white"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
