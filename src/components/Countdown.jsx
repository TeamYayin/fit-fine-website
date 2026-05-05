import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const getRemainingTime = (targetDate) => {
  const distance = Math.max(0, targetDate.getTime() - Date.now());

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
};

const labels = {
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
};

export default function Countdown({ target }) {
  const targetDate = useMemo(() => new Date(target), [target]);
  const [time, setTime] = useState(() => getRemainingTime(targetDate));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(getRemainingTime(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid w-full max-w-3xl mx-auto grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {Object.entries(time).map(([unit, value]) => (
        <div
          key={unit}
          className="relative overflow-hidden rounded-md border border-white/10 bg-black/35 px-4 py-4 text-center shadow-2xl shadow-black/30 backdrop-blur-xl"
        >
          <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
          <motion.div
            key={`${unit}-${value}`}
            initial={{ y: 16, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="font-sans text-4xl font-black tabular-nums tracking-normal text-white sm:text-5xl"
          >
            {String(value).padStart(2, "0")}
          </motion.div>
          <div className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-gold-soft/80">
            {labels[unit]}
          </div>
        </div>
      ))}
    </div>
  );
}
