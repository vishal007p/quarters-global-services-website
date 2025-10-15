// components/WeatherStripAxiosDirect.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudDrizzle,
  Snowflake,
} from "lucide-react";

type Condition = "Sunny" | "Mostly cloudy" | "Cloudy" | "Rain" | "Drizzle" | "Snow";
type DayForecast = { dow: string; highC: number; lowC: number; condition: Condition };
type Normalized = {
  country: string;
  emoji?: string;
  now: { tempC: number; condition: Condition };
  days: DayForecast[];
};

function iconFor(c: Condition) {
  switch (c) {
    case "Sunny":
      return <Sun className="size-6 text-yellow-400" />;
    case "Mostly cloudy":
      return <CloudSun className="size-6 text-blue-400" />;
    case "Cloudy":
      return <Cloud className="size-6 text-gray-400" />;
    case "Rain":
      return <CloudRain className="size-6 text-blue-500" />;
    case "Drizzle":
      return <CloudDrizzle className="size-6 text-blue-400" />;
    case "Snow":
      return <Snowflake className="size-6 text-sky-300" />;
  }
}

const cn = (...s: (string | undefined)[]) => s.filter(Boolean).join(" ");

// Adapt API → UI (adjust field names if needed)
function adapt(api: any): Normalized {
  const normCond = (t: string): Condition => {
    const x = (t || "").toLowerCase();
    if (x.includes("snow")) return "Snow";
    if (x.includes("drizzle")) return "Drizzle";
    if (x.includes("rain")) return "Rain";
    if (x.includes("mostly") && x.includes("cloud")) return "Mostly cloudy";
    if (x.includes("cloud")) return "Cloudy";
    return "Sunny";
  };

  const daysSrc: any[] = api?.forecast?.days ?? api?.days ?? [];
  return {
    country: api?.countryName ?? api?.country ?? "—",
    emoji: api?.emoji ?? "🌎",
    now: {
      tempC: Number(api?.current?.tempC ?? api?.now?.tempC ?? 0) || 0,
      condition: normCond(api?.current?.condition ?? api?.now?.condition ?? "Sunny"),
    },
    days: daysSrc.slice(0, 7).map((d: any) => ({
      dow: d?.dow ?? d?.label ?? "—",
      highC: Number(d?.highC ?? d?.maxC ?? 0) || 0,
      lowC: Number(d?.lowC ?? d?.minC ?? 0) || 0,
      condition: normCond(d?.condition ?? d?.summary ?? ""),
    })),
  };
}

// Dummy data for offline/demo mode
const dummyWeather: Normalized = {
  country: "India",
  emoji: "🇮🇳",
  now: { tempC: 31, condition: "Sunny" },
  days: [
    { dow: "Mon", highC: 33, lowC: 24, condition: "Sunny" },
    { dow: "Tue", highC: 30, lowC: 23, condition: "Mostly cloudy" },
    { dow: "Wed", highC: 29, lowC: 22, condition: "Rain" },
    { dow: "Thu", highC: 28, lowC: 21, condition: "Cloudy" },
    { dow: "Fri", highC: 32, lowC: 24, condition: "Sunny" },
    { dow: "Sat", highC: 31, lowC: 25, condition: "Drizzle" },
    { dow: "Sun", highC: 34, lowC: 26, condition: "Sunny" },
  ],
};

export default function WeatherStripAxiosDirect({
  countryCode = "IN",
  className,
  dummy = false,
}: {
  countryCode?: string;
  className?: string;
  dummy?: boolean;
}) {
  const [data, setData] = useState<Normalized | null>(dummy ? dummyWeather : null);
  const [loading, setLoading] = useState(!dummy);
  const [err, setErr] = useState<string | null>(null);

  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = useMemo(() => `${base?.replace(/\/$/, "")}/common/get-wather-forecast`, [base]);

  useEffect(() => {
    if (dummy) return; // use dummy data directly
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await axios.get(url, {
          params: { countryCode },
          signal: ctrl.signal as any,
        });
        setData(adapt(res.data));
      } catch (e: any) {
        if (!axios.isCancel(e)) setErr(e?.message ?? "Failed to load weather");
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, [url, countryCode, dummy]);

  return (
    <Card
      className={cn(
        "w-full overflow-hidden border shadow-lg rounded-2xl",
        "bg-white/95 dark:bg-gray-900",
        className
      )}
    >
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Header + Country */}
          <div className="flex items-center gap-3">
            <div className="grid place-items-center size-9 rounded-full bg-blue-100 shadow-sm">
              <span className="text-lg">{data?.emoji ?? "🌍"}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {loading ? "Loading…" : data?.country ?? "—"}
              </p>
              <p className="text-xs text-muted-foreground">7-Day Weather Forecast</p>
            </div>
          </div>

          {/* Current Weather (desktop) */}
          <div className="hidden sm:flex items-center gap-3 ml-auto">
            {loading ? (
              <>
                <Skeleton className="size-9 rounded-full" />
                <Skeleton className="h-6 w-10" />
                <Skeleton className="h-4 w-20" />
              </>
            ) : err ? (
              <span className="text-sm text-red-600">Error</span>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="grid place-items-center size-9 rounded-full bg-blue-50 shadow-inner"
                >
                  {iconFor(data!.now.condition)}
                </motion.div>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-semibold">{data!.now.tempC}</span>
                  <span className="text-sm">°C</span>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {data!.now.condition}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Days scroller */}
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {loading
            ? Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-[110px] w-[90px] rounded-xl" />
              ))
            : err
            ? <div className="text-sm text-red-600">Failed to load forecast.</div>
            : data!.days.map((d, i) => (
                <motion.div
                  key={d.dow + i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="shrink-0 w-[90px]"
                >
                  <div className="rounded-xl bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 p-3 text-center hover:shadow-md transition-all">
                    <p className="text-[12px] font-medium text-gray-600 dark:text-gray-300">
                      {d.dow}
                    </p>
                    <div className="grid place-items-center my-2">{iconFor(d.condition)}</div>
                    <p className="text-[11px] text-gray-500">
                      {d.highC}°/<span className="opacity-70">{d.lowC}°</span>
                    </p>
                    <p className="text-[11px] mt-1 line-clamp-1 text-gray-700 dark:text-gray-100">
                      {d.condition}
                    </p>
                  </div>
                </motion.div>
              ))}
        </div>

        {/* Mobile current weather */}
        {!loading && !err && (
          <div className="sm:hidden mt-3 flex items-center gap-2">
            <div className="grid place-items-center size-7 rounded-full bg-blue-50 shadow-inner">
              {iconFor(data!.now.condition)}
            </div>
            <span className="text-base font-semibold">{data!.now.tempC}°C</span>
            <span className="text-sm text-muted-foreground">{data!.now.condition}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
