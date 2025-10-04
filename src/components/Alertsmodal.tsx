// src/components/AlertsModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertTriangle,
  Wind,
  CloudRain,
  Sun,
  Factory,
  ShieldAlert,
  Skull,
  Activity,
  Flame,
  Snowflake,
  Waves,
  Building2,
  CloudFog,
} from "lucide-react";

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlertsModal = ({ isOpen, onClose }: AlertsModalProps) => {
  const alerts = [
    // 🌍 India & Asia Alerts
    {
      type: "🚨 High Pollution Alert – New Delhi",
      description:
        "AQI levels exceed 250 in New Delhi. Avoid outdoor activities, especially for sensitive groups.",
      icon: <AlertTriangle className="w-7 h-7 text-red-500" />,
      color: "from-red-500/10 to-red-100 border-red-300",
    },
    {
      type: "💨 Strong Winds – Mumbai",
      description:
        "Winds up to 45 km/h expected this evening. Dust levels may rise temporarily.",
      icon: <Wind className="w-7 h-7 text-blue-400" />,
      color: "from-blue-500/10 to-blue-100 border-blue-300",
    },
    {
      type: "🌧 Heavy Rainfall – Chennai",
      description:
        "Chennai is likely to receive heavy rainfall in the next 24 hours, improving air quality temporarily.",
      icon: <CloudRain className="w-7 h-7 text-indigo-400" />,
      color: "from-indigo-500/10 to-indigo-100 border-indigo-300",
    },
    {
      type: "☠️ Hazardous Air Quality – Lahore",
      description:
        "AQI exceeds 400! Extremely dangerous for all groups. Stay indoors with air filtration if possible.",
      icon: <Skull className="w-7 h-7 text-purple-600" />,
      color: "from-purple-600/10 to-purple-200 border-purple-400",
    },

    // 🌎 North America Alerts
    {
      type: "🏙️ Smog – Los Angeles",
      description:
        "High ozone & smog levels due to traffic and heatwave. AQI at 180 — unhealthy for sensitive groups.",
      icon: <Factory className="w-7 h-7 text-orange-500" />,
      color: "from-orange-500/10 to-orange-100 border-orange-300",
    },
    {
      type: "🌫 Poor Air – Mexico City",
      description:
        "PM2.5 levels rising due to industrial activity. AQI at 200 — limit outdoor exertion.",
      icon: <ShieldAlert className="w-7 h-7 text-yellow-600" />,
      color: "from-yellow-600/10 to-yellow-100 border-yellow-400",
    },
    {
      type: "❄️ Cold Wave – Toronto",
      description:
        "Freezing temperatures expected. Cold weather may trap pollutants close to the ground.",
      icon: <Snowflake className="w-7 h-7 text-cyan-500" />,
      color: "from-cyan-500/10 to-cyan-100 border-cyan-300",
    },
    {
      type: "🔥 Wildfire Smoke – California",
      description:
        "Smoke from wildfires has worsened air quality across California. AQI > 300 in some areas.",
      icon: <Flame className="w-7 h-7 text-red-600" />,
      color: "from-red-600/10 to-red-200 border-red-400",
    },
    {
      type: "🌊 Hurricane Impact – Florida",
      description:
        "Hurricane winds carrying dust & pollutants. Coastal regions may experience poor visibility.",
      icon: <Waves className="w-7 h-7 text-blue-600" />,
      color: "from-blue-600/10 to-blue-200 border-blue-400",
    },
    {
      type: "🌞 Good Air Quality – New York",
      description:
        "AQI is below 50 today. Clear skies and fresh air make it a great day for outdoor activities.",
      icon: <Sun className="w-7 h-7 text-green-500" />,
      color: "from-green-500/10 to-green-100 border-green-300",
    },
    {
      type: "🧪 Ozone Alert – Dallas",
      description:
        "Elevated ground-level ozone detected. Limit outdoor activities during afternoon hours.",
      icon: <Activity className="w-7 h-7 text-pink-500" />,
      color: "from-pink-500/10 to-pink-100 border-pink-300",
    },
    {
      type: "🏢 Pollution Spike – Chicago",
      description:
        "AQI has climbed to 160 due to traffic congestion and industrial activity.",
      icon: <Building2 className="w-7 h-7 text-gray-600" />,
      color: "from-gray-600/10 to-gray-200 border-gray-400",
    },
    {
      type: "🌫 Fog & Poor AQ – San Francisco",
      description:
        "Marine fog mixed with pollution is reducing visibility. AQI ~120 (Moderate).",
      icon: <CloudFog className="w-7 h-7 text-slate-500" />,
      color: "from-slate-500/10 to-slate-200 border-slate-400",
    },
    {
      type: "⚠️ Air Quality Advisory – Washington DC",
      description:
        "Moderate air pollution reported. Sensitive groups should reduce prolonged outdoor exertion.",
      icon: <ShieldAlert className="w-7 h-7 text-amber-500" />,
      color: "from-amber-500/10 to-amber-100 border-amber-400",
    },
    {
      type: "🔥 Heat + Pollution – Houston",
      description:
        "High ozone levels worsened by extreme heat. AQI ~170 (Unhealthy for sensitive groups).",
      icon: <Flame className="w-7 h-7 text-orange-600" />,
      color: "from-orange-600/10 to-orange-200 border-orange-400",
    },
    {
      type: "🌲 Forest Fire Smoke – Vancouver",
      description:
        "Wildfire smoke drifting into city, reducing visibility and air quality. AQI > 200.",
      icon: <Flame className="w-7 h-7 text-rose-600" />,
      color: "from-rose-600/10 to-rose-200 border-rose-400",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[80vh] bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-950 backdrop-blur-xl shadow-2xl rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent text-center">
            🌍 Active Environmental Alerts
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Alerts List */}
        <div className="mt-6 max-h-[65vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
          <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-4 p-5 rounded-xl shadow-lg border bg-gradient-to-br ${alert.color} hover:scale-[1.03] transition-all duration-200`}
              >
                {alert.icon}
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                    {alert.type}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {alert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertsModal;
