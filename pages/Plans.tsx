import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PLANS, SUCCESS_STORIES, PLAN_FAQS } from '../data/mockData';
import Button from '../components/Button';
import { Check, X, Plus, Minus } from 'lucide-react';

const Plans: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const handleCheckout = (planName: string) => {
    alert(`Redirecting to Stripe Checkout for ${planName} plan... (Test Mode)`);
  };

  // Filter success stories by plan
  const getStoriesByPlan = (planName: string) => {
    return SUCCESS_STORIES.filter(story => story.plan === planName);
  };

  // Comparison features for all plans - condensed to key differentiators
  const comparisonFeatures = [
    { feature: 'Basic Diet Templates', silver: true, gold: true, platinum: true },
    { feature: 'Personalized Macro Breakdown', silver: false, gold: true, platinum: true },
    { feature: 'Weekly Workout Plan', silver: true, gold: true, platinum: true },
    { feature: 'Community Access', silver: true, gold: true, platinum: true },
    { feature: 'Bi-Weekly Coach Check-in', silver: false, gold: true, platinum: false },
    { feature: 'Progress Tracking App', silver: false, gold: true, platinum: true },
    { feature: 'Fully Custom Meal Plans', silver: false, gold: false, platinum: true },
    { feature: '1-on-1 Weekly Coaching', silver: false, gold: false, platinum: true },
    { feature: '24/7 WhatsApp Support', silver: false, gold: false, platinum: true },
  ];

  return (
    <div className="min-h-screen bg-premium-black pb-16">
      <section className="py-24 bg-premium-dark relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Plans Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Invest in Yourself</h2>
            <p className="text-gray-400">Choose the tier that matches your ambition.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mb-24">
            {PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col p-8 md:p-10 transition-all duration-300 group
                  bg-black/40 border border-white/5 h-full
                  hover:bg-premium-black hover:border-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:z-10 hover:scale-105
                `}
              >
                {plan.recommended && (
                  <div className="absolute top-0 right-0 bg-gold text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-20">
                    Most Popular
                  </div>
                )}

                <div className="mb-8 text-center md:text-left">
                  <h3 className="text-xl font-bold font-heading mb-2 uppercase tracking-wider transition-colors text-white group-hover:text-gold">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center md:justify-start">
                    <span className="text-4xl md:text-5xl font-bold text-white">₹{plan.price}</span>
                    <span className="ml-2 text-sm text-gray-500 uppercase">/month</span>
                  </div>
                </div>

                <div className="w-full h-px bg-white/10 mb-8" />

                <ul className="flex-1 space-y-5 mb-10">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full transition-colors bg-white/10 text-gray-400 group-hover:bg-gold group-hover:text-black">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-sm text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => handleCheckout(plan.name)}
                  variant="outline"
                  fullWidth
                  className="border-white/10 text-gray-400 group-hover:border-gold group-hover:text-gold hover:!bg-gold hover:!text-black hover:!border-gold"
                >
                  Select {plan.name}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Success Stories by Plan */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">
                Success <span className="text-gold">Stories</span>
              </h3>
              <p className="text-gray-400">Real results from our members</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PLANS.map((plan) => {
                const planStories = getStoriesByPlan(plan.name);
                if (planStories.length === 0) return null;

                return (
                  <div key={plan.id} className="space-y-4">
                    <h4 className="text-lg font-heading font-bold text-gold uppercase tracking-wider mb-4">
                      {plan.name} Plan
                    </h4>
                    {planStories.map((story) => (
                      <motion.div
                        key={story.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-black/40 border border-white/5 p-6 hover:border-gold/50 transition-colors"
                      >
                        <div className="flex items-start gap-4 mb-3">
                          <img
                            src={story.imageUrl}
                            alt={story.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-gold/30"
                          />
                          <div className="flex-1">
                            <h5 className="font-bold text-white mb-1">{story.name}</h5>
                            <p className="text-xs text-gray-400 mb-2">Lost {(story.beforeWeight - story.afterWeight).toFixed(1)}kg in {story.durationWeeks} weeks</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 italic">"{story.quote}"</p>
                      </motion.div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Comparison Chart */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">
                Plan <span className="text-gold">Comparison</span>
              </h3>
              <p className="text-gray-400">See what's included in each plan</p>
            </div>

            <div className="flex justify-center">
              <div className="overflow-x-auto w-full max-w-3xl">
                <div className="bg-black/40 border border-white/5">
                  <div className="grid grid-cols-4 gap-3 p-4 border-b border-white/10 bg-premium-dark">
                    <div className="font-heading font-bold text-white uppercase tracking-wider text-sm">Feature</div>
                    <div className="text-center font-heading font-bold text-gray-400 uppercase tracking-wider text-sm">Silver</div>
                    <div className="text-center font-heading font-bold text-gold uppercase tracking-wider text-sm">Gold</div>
                    <div className="text-center font-heading font-bold text-gray-300 uppercase tracking-wider text-sm">Platinum</div>
                  </div>
                  {comparisonFeatures.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-4 gap-3 p-4 border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <div className="text-gray-300 text-sm">{item.feature}</div>
                      <div className="flex justify-center">
                        {item.silver ? (
                          <Check className="text-gold" size={18} />
                        ) : (
                          <X className="text-gray-600" size={18} />
                        )}
                      </div>
                      <div className="flex justify-center">
                        {item.gold ? (
                          <Check className="text-gold" size={18} />
                        ) : (
                          <X className="text-gray-600" size={18} />
                        )}
                      </div>
                      <div className="flex justify-center">
                        {item.platinum ? (
                          <Check className="text-gold" size={18} />
                        ) : (
                          <X className="text-gray-600" size={18} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Who is X for? Sections */}
          <div className="mb-24 space-y-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">
                Find Your <span className="text-gold">Perfect Plan</span>
              </h3>
              <p className="text-gray-400">Choose the plan that fits your goals and lifestyle</p>
            </div>

            {PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/40 border border-white/5 p-8 md:p-10 hover:border-gold/50 transition-colors"
              >
                <h4 className="text-2xl md:text-3xl font-heading font-bold text-white mb-6">
                  Who is <span className="text-gold">{plan.name}</span> for?
                </h4>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  {plan.name === 'Silver' && (
                    <>
                      <p className="flex items-start">
                        <Check className="text-gold mr-3 mt-1 flex-shrink-0" size={20} />
                        <span>Beginners who want structured guidance without breaking the bank</span>
                      </p>
                      <p className="flex items-start">
                        <Check className="text-gold mr-3 mt-1 flex-shrink-0" size={20} />
                        <span>Those who prefer self-paced learning with community support</span>
                      </p>
                      <p className="flex items-start">
                        <Check className="text-gold mr-3 mt-1 flex-shrink-0" size={20} />
                        <span>People looking for basic diet templates and workout plans</span>
                      </p>
                      <p className="flex items-start">
                        <Check className="text-gold mr-3 mt-1 flex-shrink-0" size={20} />
                        <span>Individuals who want to start their fitness journey affordably</span>
                      </p>
                    </>
                  )}
                  {plan.name === 'Gold' && (
                    <>
                      <p className="flex items-start">
                        <Check className="text-gold mr-3 mt-1 flex-shrink-0" size={20} />
                        <span>Intermediate users who want personalized nutrition guidance</span>
                      </p>
                      <p className="flex items-start">
                        <Check className="text-gold mr-3 mt-1 flex-shrink-0" size={20} />
                        <span>Those who need regular check-ins and progress tracking</span>
                      </p>
                      <p className="flex items-start">
                        <Check className="text-gold mr-3 mt-1 flex-shrink-0" size={20} />
                        <span>People serious about achieving specific body composition goals</span>
                      </p>
                      <p className="flex items-start">
                        <Check className="text-gold mr-3 mt-1 flex-shrink-0" size={20} />
                        <span>Individuals who want advanced diet templates and macro tracking</span>
                      </p>
                    </>
                  )}
                  {plan.name === 'Platinum' && (
                    <>
                      <p className="flex items-start">
                        <Check className="text-gold mr-3 mt-1 flex-shrink-0" size={20} />
                        <span>Serious athletes and fitness enthusiasts who need expert coaching</span>
                      </p>
                      <p className="flex items-start">
                        <Check className="text-gold mr-3 mt-1 flex-shrink-0" size={20} />
                        <span>Those with complex goals requiring 1-on-1 attention</span>
                      </p>
                      <p className="flex items-start">
                        <Check className="text-gold mr-3 mt-1 flex-shrink-0" size={20} />
                        <span>People who want fully customized meal and training plans</span>
                      </p>
                      <p className="flex items-start">
                        <Check className="text-gold mr-3 mt-1 flex-shrink-0" size={20} />
                        <span>Individuals who need 24/7 support and daily adjustments</span>
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Plan FAQs */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">
                Plan <span className="text-gold">FAQs</span>
              </h3>
              <p className="text-gray-400">Common questions about our plans</p>
            </div>

            <div className="space-y-4">
              {PLAN_FAQS.map((faq) => (
                <motion.div 
                  key={faq.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className={`border transition-colors duration-300 ${openFaqId === faq.id ? 'bg-premium-dark border-gold/50' : 'bg-black/40 border-white/10 hover:border-white/30'}`}
                >
                  <button
                    onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  >
                    <span className={`font-semibold pr-4 text-lg ${openFaqId === faq.id ? 'text-gold' : 'text-gray-200'}`}>{faq.question}</span>
                    <span className={`text-gold transform transition-transform ${openFaqId === faq.id ? 'rotate-180' : ''}`}>
                      {openFaqId === faq.id ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaqId === faq.id && (
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plans;

