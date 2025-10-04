import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Rocket, Globe } from "lucide-react";

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
      return "🛰️ NASA satellites track air quality, CO₂, and climate trends to help us understand Earth better.";
    }

    if (
      input.includes("pollution") ||
      input.includes("environment") ||
      input.includes("climate") ||
      input.includes("air quality")
    ) {
      return "🌍 NASA uses data to monitor pollution, greenhouse gases, and their impact on climate change.";
    }

    if (input.includes("north america") || input.includes("usa") || input.includes("canada")) {
      return "🇺🇸 In North America, satellites track hurricanes, droughts, wildfires, and urban pollution.";
    }

    return "🌟 Ask about NASA missions, Earth observation, pollution tracking, or North America’s climate insights.";
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
    }, 1000);
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Open NASA Assistant"
      >
        <MessageCircle className="w-7 h-7 drop-shadow" />
      </button>

      {isOpen && (
        <div className="mt-4 w-96 h-[520px] rounded-2xl flex flex-col overflow-hidden transition-all duration-300 bg-gray-900/95 border border-indigo-400 shadow-2xl backdrop-blur-md">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-800 via-indigo-600 to-purple-700 text-white">
            <div className="flex items-center space-x-2">
              <Rocket className="w-6 h-6 text-blue-200" />
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
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  <div className="text-sm">{msg.text}</div>
                  <div className="text-[11px] mt-1 opacity-70">{formatTime(msg.timestamp)}</div>
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
              className="flex-1 px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
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
