// src/components/NasaDataModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

// NASA POWER API example for Air Quality / Temperature
const NASA_API =
  "https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,PRECTOTCORR&community=RE&longitude=77.21&latitude=28.61&start=20240901&end=20240930&format=JSON";

interface NasaDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DailyData {
  date: string;
  temperature: number;
  precipitation: number;
}

const NasaDataModal = ({ isOpen, onClose }: NasaDataModalProps) => {
  const [data, setData] = useState<DailyData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch(NASA_API)
        .then((res) => res.json())
        .then((json) => {
          const t2m = json.properties.parameter.T2M;
          const prectot = json.properties.parameter.PRECTOTCORR;

          const dailyData: DailyData[] = Object.keys(t2m).map((date) => ({
            date,
            temperature: t2m[date],
            precipitation: prectot[date],
          }));

          setData(dailyData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("NASA API Error:", err);
          setLoading(false);
        });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-blue-600 text-center">
            🌍 NASA Air Quality & Weather Data
          </DialogTitle>
        </DialogHeader>

        {loading && <p className="text-gray-500 text-center py-4">Fetching data...</p>}

        {!loading && data.length > 0 && (
          <div className="mt-4 max-h-[500px] overflow-y-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto">
              <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Temperature (°C)</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Precipitation (mm)</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {data.map((day) => (
                  <tr key={day.date} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{day.date}</td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{day.temperature}</td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{day.precipitation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && data.length === 0 && (
          <p className="text-gray-500 text-center py-4">No data available</p>
        )}

        <p className="text-sm text-gray-500 mt-4 text-center">
          Source:{" "}
          <a
            href="https://www.earthdata.nasa.gov/topics/atmosphere/air-quality"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            NASA EarthData
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default NasaDataModal;
