// components/WeatherStripAxiosDirect.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Sun, Cloud, CloudSun, CloudRain, CloudDrizzle, Snowflake } from "lucide-react";

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
    case "Sunny": return <Sun className="size-6" />;
    case "Mostly cloudy": return <CloudSun className="size-6" />;
    case "Cloudy": return <Cloud className="size-6" />;
    case "Rain": return <CloudRain className="size-6" />;
    case "Drizzle": return <CloudDrizzle className="size-6" />;
    case "Snow": return <Snowflake className="size-6" />;
  }
}
const cn = (...s: (string | undefined)[]) => s.filter(Boolean).join(" ");

// adapt your API → UI (adjust field names if needed)
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
    country: api?.countryName ?? api?.country ?? api?.location?.country ?? "—",
    emoji: api?.emoji ?? "🌍",
    now: {
      tempC: Number(api?.current?.tempC ?? api?.now?.tempC ?? 0) || 0,
      condition: normCond(api?.current?.condition ?? api?.now?.condition ?? "Sunny"),
    },
    days: daysSrc.slice(0, 7).map((d: any) => ({
      dow: d?.dow ?? d?.label ?? d?.dateLabel ?? "—",
      highC: Number(d?.highC ?? d?.maxC ?? d?.high ?? 0) || 0,
      lowC: Number(d?.lowC ?? d?.minC ?? d?.low ?? 0) || 0,
      condition: normCond(d?.condition ?? d?.summary ?? ""),
    })),
  };
}

export default function WeatherStripAxiosDirect({
  countryCode = "IN",
  className,
}: { countryCode?: string; className?: string }) {
  const [data, setData] = useState<Normalized | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = useMemo(() => {
    return `${base?.replace(/\/$/, "")}/common/get-wather-forecast`;
  }, [base]);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await axios.get(url, {
          params: { countryCode }, // <-- IN by default
          signal: ctrl.signal as any, // axios v1+ supports AbortController
        });
        setData(adapt(res.data));
      } catch (e: any) {
        if (!axios.isCancel(e)) setErr(e?.message ?? "Failed to load weather");
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, [url, countryCode]);

  return (
    <Card
      className={cn(
        "w-full overflow-hidden border-none shadow-md",
        "bg-gradient-to-b from-blue-200/70 to-blue-300/70 dark:from-blue-300/20 dark:to-blue-400/10",
        "rounded-2xl",
        className
      )}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* left header */}
          <div className="flex items-center gap-3">
            <div className="grid place-items-center size-8 rounded-full bg-white/80 shadow-sm">
              <span className="text-base">{data?.emoji ?? "🌍"}</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-blue-900/70 dark:text-blue-100/80">
                {loading ? "Loading…" : data?.country ?? "—"}
              </p>
              <p className="text-[10px] -mt-0.5 text-muted-foreground">Weather Forecast</p>
            </div>

            {/* now (desktop) */}
            <div className="hidden sm:flex items-center gap-3 pl-2 min-w-[140px]">
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
                  <div className="grid place-items-center size-9 rounded-full bg-white shadow-sm">
                    {iconFor(data!.now.condition)}
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-semibold leading-none">
                      {data!.now.tempC}
                    </span>
                    <span className="-mb-0.5 text-sm">°C</span>
                  </div>
                  <span className="text-sm font-medium">{data!.now.condition}</span>
                </>
              )}
            </div>
          </div>

          {/* days scroller */}
          <div className="ml-auto w-full">
            <div className="flex gap-3 overflow-x-auto pr-1">
              {loading
                ? Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="w-[88px] sm:w-[104px] shrink-0">
                      <Skeleton className="h-[108px] w-full rounded-xl" />
                    </div>
                  ))
                : err
                ? <div className="text-sm text-red-600">Failed to load forecast.</div>
                : data!.days.map((d, i) => (
                    <motion.div
                      key={d.dow + i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="shrink-0"
                    >
                      <div className="w-[88px] sm:w-[104px] rounded-xl bg-white/90 dark:bg-white/10 border border-white/60 dark:border-white/15 shadow-sm p-3 text-center">
                        <p className="text-[11px] font-medium text-gray-600 dark:text-gray-200">
                          {d.dow}
                        </p>
                        <div className="grid place-items-center my-2">
                          {iconFor(d.condition)}
                        </div>
                        <p className="text-[11px] text-gray-500">
                          {d.highC}°/<span className="opacity-80">{d.lowC}°</span>
                        </p>
                        <p className="text-[11px] mt-1 line-clamp-1 text-gray-700 dark:text-gray-100">
                          {d.condition}
                        </p>
                      </div>
                    </motion.div>
                  ))}
            </div>
          </div>
        </div>

        {/* now (mobile) */}
        {!loading && !err && (
          <div className="sm:hidden mt-3 flex items-center gap-2">
            <div className="grid place-items-center size-7 rounded-full bg-white shadow-sm">
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
