import Hero from "./components/Hero.jsx";

const launchDate =
  import.meta.env.VITE_LAUNCH_DATE || "2026-08-01T00:00:00+05:30";

export default function App() {
  return <Hero launchDate={launchDate} />;
}
