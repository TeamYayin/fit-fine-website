import { motion, useTransform } from "framer-motion";

const particles = [
  { left: "8%", top: "18%", size: 3, opacity: 0.5 },
  { left: "16%", top: "78%", size: 2, opacity: 0.35 },
  { left: "27%", top: "32%", size: 4, opacity: 0.25 },
  { left: "68%", top: "14%", size: 2, opacity: 0.45 },
  { left: "76%", top: "66%", size: 3, opacity: 0.4 },
  { left: "91%", top: "38%", size: 2, opacity: 0.3 },
];

export default function BackgroundEffect({ x, y }) {
  const bgX = useTransform(x, [-1, 1], ["-2.5%", "2.5%"]);
  const bgY = useTransform(y, [-1, 1], ["-2%", "2%"]);
  const ringX = useTransform(x, [-1, 1], [-28, 28]);
  const ringY = useTransform(y, [-1, 1], [-18, 18]);
  const ringTwoX = useTransform(ringX, (value) => value * -0.75);
  const ringTwoY = useTransform(ringY, (value) => value * -0.9);
  const particleX = useTransform(x, [-1, 1], [18, -18]);
  const particleY = useTransform(y, [-1, 1], [12, -12]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-night">
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute -inset-8 bg-[url('/assets/eugen-fnf-hero.png')] bg-cover bg-center opacity-70 blur-[2px] scale-105"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(212,175,55,0.18),transparent_30%),linear-gradient(90deg,rgba(10,10,10,0.94),rgba(10,10,10,0.58)_48%,rgba(10,10,10,0.94))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.58),rgba(10,10,10,0.18)_42%,rgba(10,10,10,0.92))]" />

      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute left-[8%] top-[12%] h-64 w-64 rounded-full border border-gold/15 shadow-[inset_0_0_48px_rgba(212,175,55,0.08)] sm:h-96 sm:w-96"
      />
      <motion.div
        style={{ x: ringTwoX, y: ringTwoY }}
        className="absolute bottom-[8%] right-[6%] h-56 w-56 rounded-full border border-white/10 shadow-[inset_0_0_42px_rgba(255,255,255,0.05)] sm:h-80 sm:w-80"
      />

      <motion.div style={{ x: particleX, y: particleY }} className="absolute inset-0">
        {particles.map((particle) => (
          <span
            key={`${particle.left}-${particle.top}`}
            className="absolute rounded-full bg-gold shadow-[0_0_16px_rgba(212,175,55,0.75)]"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
