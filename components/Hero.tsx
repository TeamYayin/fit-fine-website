import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Sparkles, Activity } from 'lucide-react';
import Button from './Button';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const scrollToPhilosophy = () => {
    document
      .getElementById('brand-philosophy')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-24"
    >
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-35"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1950&q=80")',
        }}
      />

      {/* Gradient Overlay for Fade Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-premium-black via-premium-black/70 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-premium-black via-transparent to-premium-black/40 z-10" />

      <div className="container mx-auto px-4 z-20 flex flex-col items-center">
        <div className="max-w-5xl mx-auto text-center space-y-10 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold tracking-[0.28em] text-sm uppercase font-bold mb-4 block">
              The Fit & Fine Method
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-tight text-white"
          >
            Discipline, designed for humans who never settle.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-2xl text-gray-300 font-light max-w-3xl mx-auto"
          >
            A concierge-level fitness experience where precision programming,
            restorative recovery, and daily rituals converge to build confident,
            capable bodies that stay strong for life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-4"
          >
            <Button size="lg" onClick={scrollToPhilosophy}>
              Explore the Experience
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/contact')}
            >
              Speak with a Coach
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 pt-10"
          >
            {[
              {
                icon: <ShieldCheck size={22} />,
                title: 'Confidential & judgment-free guidance.',
              },
              {
                icon: <Sparkles size={22} />,
                title: 'Luxury details—white-glove check-ins & clarity.',
              },
              {
                icon: <Activity size={22} />,
                title: 'Progress engineered through data, sleep, and recovery.',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="bg-white/5 backdrop-blur-md p-5 md:p-6 border border-white/10 rounded-xl text-left flex items-start gap-3 hover:border-gold/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-gold mt-1">{item.icon}</div>
                <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                  {item.title}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;