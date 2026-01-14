import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS, PLAN_FAQS } from '../data/mockData';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQPage: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'general' | 'plans'>('general');

  // Combine general FAQs with plan FAQs for comprehensive FAQ page
  const allFAQs = [
    ...FAQS.map(faq => ({ ...faq, category: 'general' as const })),
    ...PLAN_FAQS.map(faq => ({ ...faq, category: 'plans' as const }))
  ];

  const generalFAQs = FAQS;
  const planFAQs = PLAN_FAQS;

  return (
    <div className="min-h-screen bg-premium-black pb-16">
      <section className="py-24 bg-premium-dark relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <HelpCircle className="text-gold" size={40} />
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white">
                Frequently Asked <span className="text-gold">Questions</span>
              </h1>
            </motion.div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Find answers to common questions about our services, plans, and fitness programs
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveCategory('general')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeCategory === 'general'
                  ? 'bg-gold text-black border-2 border-gold'
                  : 'bg-black/40 text-gray-400 border-2 border-white/10 hover:border-gold/50'
              }`}
            >
              General Questions
            </button>
            <button
              onClick={() => setActiveCategory('plans')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeCategory === 'plans'
                  ? 'bg-gold text-black border-2 border-gold'
                  : 'bg-black/40 text-gray-400 border-2 border-white/10 hover:border-gold/50'
              }`}
            >
              Plan Questions
            </button>
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {(activeCategory === 'general' ? generalFAQs : planFAQs).map((faq) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className={`border transition-colors duration-300 ${
                      openId === faq.id
                        ? 'bg-premium-dark border-gold/50'
                        : 'bg-black/40 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <button
                      onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                      className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                    >
                      <span
                        className={`font-semibold pr-4 text-lg ${
                          openId === faq.id ? 'text-gold' : 'text-gray-200'
                        }`}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={`text-gold transform transition-transform flex-shrink-0 ${
                          openId === faq.id ? 'rotate-180' : ''
                        }`}
                      >
                        {openId === faq.id ? <Minus size={20} /> : <Plus size={20} />}
                      </span>
                    </button>
                    <AnimatePresence>
                      {openId === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Additional Help Section */}
          <div className="mt-16 text-center">
            <div className="bg-black/40 border border-gold/20 p-8 rounded-xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-heading font-bold text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-400 mb-6">
                Can't find the answer you're looking for? Please reach out to our friendly support team.
              </p>
              <a
                href="/#/contact"
                className="inline-block bg-gold text-black px-8 py-3 font-semibold rounded-lg hover:bg-gold-light transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;




