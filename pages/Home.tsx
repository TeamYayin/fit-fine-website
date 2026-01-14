import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Brain,
  Clock,
  HeartPulse,
  MoonStar,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  LineChart,
  BarChart3,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Button from '../components/Button';

const SectionHeader: React.FC<{
  eyebrow: string;
  title: string;
  description: string;
}> = ({ eyebrow, title, description }) => (
  <div className="text-center max-w-3xl mx-auto mb-14">
    <p className="text-gold uppercase tracking-[0.24em] text-xs font-semibold mb-4">
      {eyebrow}
    </p>
    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
      {title}
    </h2>
    <p className="text-gray-400 text-base md:text-lg leading-relaxed">
      {description}
    </p>
  </div>
);

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      const percent = scrollableHeight
        ? Math.min(100, Math.max(0, (scrolled / scrollableHeight) * 100))
        : 0;
      setProgress(percent);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5 },
    }),
  };

  const journeySteps = [
    {
      title: 'Grounded Beginner',
      headline: 'Stabilize and learn your rhythm.',
      detail:
        'We audit sleep, stress, and movement to set a calm, confident baseline.',
      emphasis: 'Ritual: 10-minute daily prime to anchor consistency.',
    },
    {
      title: 'Disciplined Operator',
      headline: 'Precision habits replace motivation.',
      detail:
        'Small weekly calibrations—form, breath, tempo—keep you improving without burnout.',
      emphasis: 'Ritual: Micro-recoveries woven between calls and commutes.',
    },
    {
      title: 'Transformed Performer',
      headline: 'Strength shows up in posture, energy, and presence.',
      detail:
        'Programming adapts to workload; nutrition supports focus; recovery locks in adaptation.',
      emphasis: 'Ritual: Evening decompression to sleep deeper and repair faster.',
    },
    {
      title: 'Sustainable Lifestyle',
      headline: 'Fitness becomes identity, not a phase.',
      detail:
        'We rotate phases to keep you excited, resilient, and ready for what’s next.',
      emphasis: 'Ritual: Quarterly resets to celebrate progress and raise standards.',
    },
  ];

  const lifestyleFits = [
    {
      icon: <Clock size={22} />,
      title: 'Workday Flow',
      copy: 'Desk-friendly mobility, posture resets, and focused sessions that fit into real calendars.',
    },
    {
      icon: <Users size={22} />,
      title: 'Family Rhythm',
      copy: 'Energy to show up fully—without sacrificing dinners, school runs, or weekends away.',
    },
    {
      icon: <MoonStar size={22} />,
      title: 'Travel Proof',
      copy: 'Hotel, home, or on the move—portable protocols keep you aligned anywhere.',
    },
  ];

  const transformationWins = [
    'Unshakable morning energy',
    'Deeper, restorative sleep',
    'Confident posture & presence',
    'Quicker recovery between efforts',
    'Calm focus under pressure',
    'Stronger immunity & resilience',
  ];

  const motivationBursts = [
    'Move like you respect your future self.',
    'Strength is silent luxury.',
    'Recovery is the new hustle.',
    'Precision beats intensity—every time.',
    'Discipline is the most elegant flex.',
  ];

  const systemPhases = [
    {
      title: 'The Awakening',
      summary: 'Clarity over chaos.',
      detail:
        'We map your real life—sleep, stress, schedule—to expose the hidden energy leaks and set a confident baseline.',
    },
    {
      title: 'The Blueprint',
      summary: 'Precision without overwhelm.',
      detail:
        'A bespoke training and recovery architecture calibrated to your week: what to do, when to rest, and how to fuel.',
    },
    {
      title: 'The Execution',
      summary: 'Guided reps, calm coaching.',
      detail:
        'Micro-form cues, pace control, and proactive check-ins keep you moving forward without burnout or guesswork.',
    },
    {
      title: 'The Elevation',
      summary: 'Identity-level change.',
      detail:
        'We rotate phases, celebrate micro-wins, and lock in rituals so strength, composure, and confidence become default.',
    },
  ];

  const proofStats = [
    { label: 'Years of Mastery', value: '15+', note: 'Refining elite protocols' },
    { label: 'Lives Transformed', value: '12k+', note: 'Across leaders & creators' },
    { label: 'Science Backed', value: '100%', note: 'Built on research & data' },
    { label: 'Elite Support', value: '24/7', note: 'Guidance when you need it' },
  ];

  return (
    <div className="space-y-0">
      {/* Landing-only scroll progress (below header) */}
      <div className="fixed top-20 left-0 right-0 z-30 pointer-events-none">
        <div className="h-1 bg-white/5">
          <div
            className="h-1 bg-gradient-to-r from-gold via-gold-light to-gold transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Hero />

      {/* Brand Philosophy */}
      <section
        id="brand-philosophy"
        className="py-24 bg-premium-dark border-t border-white/5"
      >
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Brand Philosophy"
            title="Luxury fitness that respects your ambition and your time."
            description="We design discipline that feels effortless—marrying science, service, and style so you can lead with confidence on and off the floor."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Brain size={24} />,
                title: 'Mindset over hype',
                copy: 'We build repeatable rituals that outlast motivation—small, consistent wins layered into your day.',
              },
              {
                icon: <Sparkles size={24} />,
                title: 'Discipline with elegance',
                copy: 'Every touchpoint is intentional: clean programming, calm coaching, and zero noise.',
              },
              {
                icon: <ShieldCheck size={24} />,
                title: 'Lifestyle first',
                copy: 'Your work, family, and travel shape the plan. We adapt so progress stays sustainable.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="bg-black/60 border border-white/10 rounded-2xl p-8 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 text-gold mb-4">
                  {item.icon}
                  <span className="text-sm uppercase tracking-[0.2em]">
                    {item.title}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">{item.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fitness Journey Timeline */}
      <section className="py-24 bg-premium-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,#D4AF37_0%,transparent_35%),radial-gradient(circle_at_bottom,#1C1C1E_0%,transparent_40%)]" />
        <div className="container mx-auto px-4 relative">
          <SectionHeader
            eyebrow="Fitness Journey"
            title="Your evolution—mapped with intention."
            description="From your first deliberate rep to a life where strength is second nature, we guide each phase with clarity."
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="relative bg-premium-dark/70 border border-white/10 rounded-2xl p-7 lg:p-8 backdrop-blur-sm hover:border-gold/60 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-gold">
                    {step.title}
                  </span>
                  <span className="text-gray-500 text-sm">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-heading text-white mb-3">
                  {step.headline}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {step.detail}
                </p>
                <p className="text-gold/90 text-sm font-medium">
                  {step.emphasis}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Our System Works (Vertical Roadmap) */}
      <section className="py-24 bg-premium-dark border-t border-white/5">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="The System"
            title="How our method moves you forward."
            description="Four deliberate stages—anchored in clarity, engineered with data, delivered with calm precision."
          />

          <div className="relative max-w-5xl mx-auto">
            {/* Vertical center line */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-gold/30 via-gold/60 to-gold/30" />
            
            <div className="space-y-12 md:space-y-16">
              {systemPhases.map((phase, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={phase.title}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={cardVariants}
                    className={`relative flex items-center ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content card */}
                    <div
                      className={`w-full md:w-[45%] bg-black/50 border border-white/10 rounded-2xl p-7 md:p-8 hover:border-gold/60 hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.25)] ${
                        isLeft ? 'md:mr-auto' : 'md:ml-auto'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs uppercase tracking-[0.2em] text-gold">
                          {phase.title}
                        </span>
                        <span className="text-gray-500 text-sm">0{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-heading text-white mb-2">
                        {phase.summary}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {phase.detail}
                      </p>
                    </div>

                    {/* Center connector dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold shadow-[0_0_0_8px_rgba(212,175,55,0.15)] z-10" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Science-Backed Approach */}
      <section className="py-24 bg-premium-dark border-t border-white/5">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Science-Backed"
            title="Training, nutrition, and recovery in perfect sync."
            description="We blend data, coaching intuition, and real-time feedback to keep you progressing without extremes."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Activity size={24} />,
                title: 'Training intelligence',
                copy: 'Structured phases, impeccable form, and tempo control to build strength that lasts.',
              },
              {
                icon: <HeartPulse size={24} />,
                title: 'Nutrition strategy',
                copy: 'Balanced fueling that supports cognition, performance, and hormonal health—no crash diets.',
              },
              {
                icon: <MoonStar size={24} />,
                title: 'Recovery as a skill',
                copy: 'Sleep, breathwork, and mobility cues that make adaptation faster and injuries rarer.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="bg-black/60 border border-white/10 rounded-2xl p-8 hover:border-gold/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 text-gold mb-4">
                  {item.icon}
                  <span className="text-sm uppercase tracking-[0.2em]">
                    {item.title}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">{item.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Integration */}
      <section className="py-24 bg-premium-black">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Lifestyle Integration"
            title="Fitness that bends with your schedule, not against it."
            description="Your routines, obligations, and ambitions inform every adjustment—so health becomes effortless."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {lifestyleFits.map((item, index) => (
              <motion.div
                key={item.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="bg-premium-dark/70 border border-white/10 rounded-2xl p-7 hover:border-gold/60 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 text-gold mb-3">
                  {item.icon}
                  <span className="text-sm uppercase tracking-[0.18em]">
                    {item.title}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">{item.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community & Accountability */}
      <section className="py-24 bg-premium-dark border-t border-white/5">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Community & Accountability"
            title="You’re never training alone."
            description="Private check-ins, proactive nudges, and a community that celebrates consistency over intensity."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Users size={24} />,
                title: 'Human guidance',
                copy: 'Coach-led reviews keep form, focus, and mindset aligned every week.',
              },
              {
                icon: <LineChart size={24} />,
                title: 'Proactive check-ins',
                copy: 'Concise updates—habit scores, sleep quality, and readiness—so you always know what to adjust.',
              },
              {
                icon: <ShieldCheck size={24} />,
                title: 'Belonging built in',
                copy: 'A trusted circle of high-performers who share wins, setbacks, and solutions.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="bg-black/60 border border-white/10 rounded-2xl p-8 hover:border-gold/60 hover:shadow-[0_0_28px_rgba(212,175,55,0.08)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 text-gold mb-4">
                  {item.icon}
                  <span className="text-sm uppercase tracking-[0.2em]">
                    {item.title}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">{item.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mastery Proof Points */}
      <section className="py-24 bg-premium-black border-t border-white/5">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Proof Points"
            title="Signals of substance, not slogans."
            description="Pedigree that underwrites every session and every adjustment you receive."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {proofStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="bg-gradient-to-b from-premium-dark/80 to-black/60 border border-white/10 rounded-xl p-6 text-center hover:border-gold/60 transition-all duration-300"
              >
                <p className="text-gold text-3xl font-heading mb-1">
                  {stat.value}
                </p>
                <p className="text-white font-semibold uppercase text-xs mb-1 tracking-[0.1em]">
                  {stat.label}
                </p>
                <p className="text-gray-400 text-sm">{stat.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Beyond Numbers */}
      <section className="py-24 bg-premium-black">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Beyond Numbers"
            title="Results you can feel—even before the mirror shows it."
            description="Strength that shows up as sharper focus, steadier mood, and unapologetic confidence."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {transformationWins.map((win, index) => (
              <motion.div
                key={win}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="bg-premium-dark/70 border border-white/10 rounded-2xl p-7 flex items-center gap-4 hover:border-gold/60 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center text-gold">
                  <Sparkles size={18} />
                </div>
                <p className="text-white font-medium">{win}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Motivation */}
      <section className="py-24 bg-premium-dark border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-premium-black via-transparent to-premium-black/70 opacity-80" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <p className="text-gold uppercase tracking-[0.22em] text-xs font-semibold mb-3">
              Visual Motivation
            </p>
            <h3 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
              Words that keep you moving when no one is watching.
            </h3>
          </div>

          <div className="space-y-4">
            {motivationBursts.map((line, index) => (
              <motion.div
                key={line}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-black via-premium-dark to-black p-6 md:p-8"
              >
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.25),transparent_40%)]" />
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.5 }}
                  className="relative text-2xl md:text-3xl font-heading text-white tracking-tight"
                >
                  {line}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Credibility */}
      <section className="py-24 bg-premium-black">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Trust Signals"
            title="Pedigree you can feel from day one."
            description="Seasoned coaching, proven frameworks, and quality control in every session."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <BarChart3 size={24} />,
                title: '15+ years refining the method',
                copy: 'Built from thousands of sessions, stress-tested with executives and creators.',
              },
              {
                icon: <ShieldCheck size={24} />,
                title: 'Certified & evidence-led',
                copy: 'Coaches certified across strength, nutrition, and recovery disciplines.',
              },
              {
                icon: <Target size={24} />,
                title: 'Proven, not templated',
                copy: 'Every protocol is audited weekly to ensure it stays personal and effective.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="bg-premium-dark/70 border border-white/10 rounded-2xl p-8 hover:border-gold/60 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 text-gold mb-4">
                  {item.icon}
                  <span className="text-sm uppercase tracking-[0.2em]">
                    {item.title}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">{item.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Call-to-Action */}
      <section className="py-24 bg-premium-dark border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-premium-black via-black/60 to-premium-black" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto text-center space-y-5">
            <p className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">
              Your Legacy Starts Below
            </p>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight">
              Decide how you’ll be remembered—strong, composed, and unapologetically prepared.
            </h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Explore the path that fits you, meet the team, and step into a system built for people who demand more from themselves.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button size="lg" onClick={() => navigate('/plans')} className="w-full sm:w-auto">
                View Plans
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto"
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;