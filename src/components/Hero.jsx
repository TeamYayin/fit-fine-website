import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import BackgroundEffect from "./BackgroundEffect.jsx";
import Countdown from "./Countdown.jsx";

export default function Hero({ launchDate }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 80, damping: 24, mass: 0.45 });
  const y = useSpring(pointerY, { stiffness: 80, damping: 24, mass: 0.45 });
  const textX = useTransform(x, [-1, 1], [-12, 12]);
  const textY = useTransform(y, [-1, 1], [-8, 8]);
  const shadowX = useTransform(x, [-1, 1], [14, -14]);
  const shadowY = useTransform(y, [-1, 1], [10, -10]);
  const textShadow = useTransform(
    [shadowX, shadowY],
    ([sx, sy]) => `${sx}px ${sy}px 32px rgba(212, 175, 55, 0.18)`
  );

  useEffect(() => {
    let frame = 0;

    const handlePointerMove = (event) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const nextX = event.clientX / window.innerWidth - 0.5;
        const nextY = event.clientY / window.innerHeight - 0.5;
        pointerX.set(nextX * 2);
        pointerY.set(nextY * 2);
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [pointerX, pointerY]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-night text-white">
      <BackgroundEffect x={x} y={y} />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-12 sm:px-8">
        <motion.div
          style={{
            x: textX,
            y: textY,
            textShadow,
          }}
          initial={{ opacity: 0, y: 28, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex w-full max-w-5xl flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
            className="mb-8 inline-flex items-center gap-4"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <p className="text-sm font-black uppercase tracking-[0.42em] text-gold-soft">
              Eugen FnF
            </p>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </motion.div>

          <h1 className="max-w-5xl font-sans text-5xl font-black uppercase leading-[0.92] tracking-normal text-white sm:text-7xl lg:text-8xl">
            We Are Launching Soon
          </h1>
          <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-white/72 sm:text-xl">
            Elite fitness experience is coming
          </p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.75, ease: "easeOut" }}
            className="mt-10 w-full"
          >
            <Countdown target={launchDate} />
          </motion.div>

          <motion.a
            href="mailto:hello@eugenfnf.com?subject=Early%20Access%20Request"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 inline-flex min-h-14 items-center justify-center rounded-md border border-gold/70 bg-gold px-8 text-sm font-black uppercase tracking-[0.18em] text-black shadow-gold transition duration-300 hover:bg-gold-soft hover:shadow-[0_0_48px_rgba(212,175,55,0.58)] focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-night"
          >
            Join Early Access
          </motion.a>
        </motion.div>
      </section>
    </main>
  );
}
